import { getDb } from './db';
import { UNIVERSITIES, PROGRAMS } from '../data/universityData';
import bcrypt from 'bcryptjs';

let isInitialized = false;

export async function ensureDbInitialized() {
  if (isInitialized) return;

  const sql = getDb();

  try {
    // 1. Create admins table
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 2. Create universities table
    await sql`
      CREATE TABLE IF NOT EXISTS universities (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        established INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        ranking VARCHAR(255) NOT NULL,
        acceptance_rate VARCHAR(255) NOT NULL,
        total_students VARCHAR(255) NOT NULL,
        campus_size VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        gallery TEXT[] NOT NULL,
        description TEXT NOT NULL,
        top_programs TEXT[] NOT NULL,
        tuition_range VARCHAR(255) NOT NULL,
        features TEXT[] NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        logo TEXT DEFAULT '',
        logo_bg VARCHAR(50) DEFAULT '#ffffff',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. Create programs table
    await sql`
      CREATE TABLE IF NOT EXISTS programs (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        university_id VARCHAR(255) NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
        university_name VARCHAR(255) NOT NULL,
        degree_level VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        duration VARCHAR(255) NOT NULL,
        credits INTEGER NOT NULL,
        tuition_per_year NUMERIC NOT NULL,
        application_deadline VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        curriculum_highlights TEXT[] NOT NULL,
        career_outcomes TEXT[] NOT NULL,
        eligibility TEXT NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 4. Create contact_inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        inquiry_type VARCHAR(255) NOT NULL,
        campus VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ensure status column exists
    await sql`
      ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'unread'
    `;

    // Ensure logo column exists on universities table
    await sql`
      ALTER TABLE universities ADD COLUMN IF NOT EXISTS logo TEXT DEFAULT ''
    `;

    // Ensure logo_bg column exists on universities table
    await sql`
      ALTER TABLE universities ADD COLUMN IF NOT EXISTS logo_bg VARCHAR(50) DEFAULT '#ffffff'
    `;

    // Ensure eligibility column exists on programs table
    try {
      await sql`
        ALTER TABLE programs RENAME COLUMN prerequisites TO eligibility
      `;
      console.log('Renamed programs.prerequisites to programs.eligibility successfully.');
    } catch (e) {
      await sql`
        ALTER TABLE programs ADD COLUMN IF NOT EXISTS eligibility TEXT DEFAULT ''
      `;
    }

    // Migrate 'Private Ivy' to 'Private University'
    await sql`
      UPDATE universities SET type = 'Private University' WHERE type = 'Private Ivy'
    `;

    // 5. Seed default admin if empty
    const adminCountRes = await sql`SELECT count(*) as count FROM admins`;
    const adminCount = parseInt(adminCountRes[0].count, 10);
    if (adminCount === 0) {
      const defaultUsername = 'admin';
      const defaultPassword = 'adminpassword';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await sql`
        INSERT INTO admins (username, password)
        VALUES (${defaultUsername}, ${hashedPassword})
      `;
      console.log('Database initialized: default admin user created.');
    }

    // Check if we need to migrate/re-seed due to degree updates
    const hasOldData = await sql`SELECT count(*) as count FROM programs WHERE degree_level = 'Undergraduate'`;
    if (parseInt(hasOldData[0].count, 10) > 0) {
      console.log('Detected old degree levels (Undergraduate). Truncating tables to force re-seeding with doctoral programs.');
      await sql`TRUNCATE TABLE programs CASCADE`;
      await sql`TRUNCATE TABLE universities CASCADE`;
    }

    // 6. Seed universities if empty
    const uniCountRes = await sql`SELECT count(*) as count FROM universities`;
    const uniCount = parseInt(uniCountRes[0].count, 10);
    if (uniCount === 0) {
      for (const uni of UNIVERSITIES) {
        await sql`
          INSERT INTO universities (
            id, name, code, tagline, location, established, type, ranking, 
            acceptance_rate, total_students, campus_size, image, gallery, 
            description, top_programs, tuition_range, features, contact_email,
            logo, logo_bg
          ) VALUES (
            ${uni.id}, ${uni.name}, ${uni.code}, ${uni.tagline}, ${uni.location}, 
            ${uni.established}, ${uni.type}, ${uni.ranking}, ${uni.acceptanceRate}, 
            ${uni.totalStudents}, ${uni.campusSize}, ${uni.image}, ${uni.gallery}, 
            ${uni.description}, ${uni.topPrograms}, ${uni.tuitionRange}, 
            ${uni.features}, ${uni.contactEmail}, ${uni.logo || ''}, ${uni.logoBg || '#ffffff'}
          )
        `;
      }
      console.log(`Database initialized: Seeded ${UNIVERSITIES.length} universities.`);
    }

    // 7. Seed programs if empty
    const progCountRes = await sql`SELECT count(*) as count FROM programs`;
    const progCount = parseInt(progCountRes[0].count, 10);
    if (progCount === 0) {
      for (const prog of PROGRAMS) {
        await sql`
          INSERT INTO programs (
            id, title, university_id, university_name, degree_level, category, 
            duration, credits, tuition_per_year, application_deadline, format, 
            description, curriculum_highlights, career_outcomes, eligibility, featured
          ) VALUES (
            ${prog.id}, ${prog.title}, ${prog.universityId}, ${prog.universityName}, 
            ${prog.degreeLevel}, ${prog.category}, ${prog.duration}, ${prog.credits}, 
            ${prog.tuitionPerYear}, ${prog.applicationDeadline}, ${prog.format}, 
            ${prog.description}, ${prog.curriculumHighlights}, ${prog.careerOutcomes}, 
            ${prog.eligibility}, ${prog.featured || false}
          )
        `;
      }
      console.log(`Database initialized: Seeded ${PROGRAMS.length} programs.`);
    }

    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize database tables/seeding:', error);
    throw error;
  }
}
