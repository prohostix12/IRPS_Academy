import { getDb } from '../lib/db';
import { UNIVERSITIES, PROGRAMS } from '../data/universityData';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function runInit() {
  console.log('Connecting to database...');
  const db = await getDb();

  try {
    console.log('Running database seeding and indexing...');

    // Ensure unique index on admins username
    try {
      await db.collection('admins').createIndex({ username: 1 }, { unique: true });
      console.log('✓ Admins unique index check passed.');
    } catch (e) {
      console.log('Admins unique index check info:', e);
    }

    // Migrate 'prerequisites' to 'eligibility' in programs if exists
    try {
      await db.collection('programs').updateMany(
        { prerequisites: { $exists: true } },
        { $rename: { prerequisites: 'eligibility' } }
      );
      console.log('✓ Programs eligibility migration check passed.');
    } catch (e) {
      console.error('Failed to rename prerequisites to eligibility:', e);
    }

    // Migrate 'Private Ivy' to 'Private University'
    try {
      await db.collection('universities').updateMany(
        { type: 'Private Ivy' },
        { $set: { type: 'Private University' } }
      );
      console.log('✓ Universities Private Ivy migration check passed.');
    } catch (e) {
      console.error('Failed to migrate type "Private Ivy":', e);
    }

    // Seed default admin if empty
    const adminCount = await db.collection('admins').countDocuments();
    if (adminCount === 0) {
      const defaultUsername = 'admin';
      const defaultPassword = 'adminpassword';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      try {
        await db.collection('admins').insertOne({
          id: 1,
          username: defaultUsername,
          password: hashedPassword,
          created_at: new Date()
        });
        console.log('✓ Created default admin user.');
      } catch (error: any) {
        if (error.code !== 11000) throw error;
      }
    } else {
      console.log('✓ Admins collection already seeded.');
    }

    // Check if we need to migrate/re-seed due to degree updates
    const hasOldData = await db.collection('programs').countDocuments({ degree_level: 'Undergraduate' });
    if (hasOldData > 0) {
      console.log('Detected old degree levels (Undergraduate). Truncating collections to force re-seeding.');
      await db.collection('programs').deleteMany({});
      await db.collection('universities').deleteMany({});
    }

    // Seed universities if empty
    const uniCount = await db.collection('universities').countDocuments();
    if (uniCount === 0) {
      const uniDocs = UNIVERSITIES.map(uni => ({
        _id: uni.id,
        id: uni.id,
        name: uni.name,
        code: uni.code,
        tagline: uni.tagline,
        location: uni.location,
        established: uni.established,
        type: uni.type,
        ranking: uni.ranking,
        acceptance_rate: uni.acceptanceRate,
        total_students: uni.totalStudents,
        campus_size: uni.campusSize,
        image: uni.image,
        gallery: uni.gallery,
        description: uni.description,
        top_programs: uni.topPrograms,
        tuition_range: uni.tuitionRange,
        features: uni.features,
        contact_email: uni.contactEmail,
        logo: uni.logo || '',
        logo_bg: uni.logoBg || '#ffffff',
        created_at: new Date()
      }));

      await db.collection<any>('universities').insertMany(uniDocs, { ordered: false });
      console.log(`✓ Seeded ${UNIVERSITIES.length} universities.`);
    } else {
      console.log('✓ Universities collection already seeded.');
    }

    // Seed programs if empty
    const progCount = await db.collection('programs').countDocuments();
    if (progCount === 0) {
      const progDocs = PROGRAMS.map(prog => ({
        _id: prog.id,
        id: prog.id,
        title: prog.title,
        university_id: prog.universityId,
        university_name: prog.universityName,
        degree_level: prog.degreeLevel,
        category: prog.category,
        duration: prog.duration,
        credits: prog.credits,
        tuition_per_year: prog.tuitionPerYear,
        application_deadline: prog.applicationDeadline,
        format: prog.format,
        description: prog.description,
        curriculum_highlights: prog.curriculumHighlights,
        career_outcomes: prog.careerOutcomes,
        eligibility: prog.eligibility,
        featured: prog.featured,
        created_at: new Date()
      }));

      await db.collection<any>('programs').insertMany(progDocs, { ordered: false });
      console.log(`✓ Seeded ${PROGRAMS.length} programs.`);
    } else {
      console.log('✓ Programs collection already seeded.');
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database collections/seeding:', error);
    process.exit(1);
  }
}

runInit();
