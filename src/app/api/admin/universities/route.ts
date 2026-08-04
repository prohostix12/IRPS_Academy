import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const body = await req.json();
    const {
      name, code, tagline, location, established, type, ranking,
      acceptanceRate, totalStudents, campusSize, image, logo, logoBg, gallery,
      description, topPrograms, tuitionRange, features, contactEmail
    } = body;

    if (!name || !code || !location || !type || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = `uni-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    await db.collection<any>('universities').insertOne({
      _id: id,
      id,
      name,
      code,
      tagline: tagline || '',
      location,
      established: Number(established) || 2026,
      type,
      ranking: ranking || '',
      acceptance_rate: acceptanceRate || '',
      total_students: totalStudents || '',
      campus_size: campusSize || '',
      image: image || '',
      logo: logo || '',
      logo_bg: logoBg || '#ffffff',
      gallery: gallery || [],
      description: description || '',
      top_programs: topPrograms || [],
      tuition_range: tuitionRange || '',
      features: features || [],
      contact_email: contactEmail,
      created_at: new Date()
    });

    return NextResponse.json({ success: true, id, message: 'University created successfully.' });
  } catch (error: any) {
    console.error('API Error in POST /api/admin/universities:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const body = await req.json();
    const {
      id, name, code, tagline, location, established, type, ranking,
      acceptanceRate, totalStudents, campusSize, image, logo, logoBg, gallery,
      description, topPrograms, tuitionRange, features, contactEmail
    } = body;

    if (!id || !name || !code || !location || !type || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection<any>('universities').updateOne(
      { _id: id },
      {
        $set: {
          name,
          code,
          tagline: tagline || '',
          location,
          established: Number(established) || 2026,
          type,
          ranking: ranking || '',
          acceptance_rate: acceptanceRate || '',
          total_students: totalStudents || '',
          campus_size: campusSize || '',
          image: image || '',
          logo: logo || '',
          logo_bg: logoBg || '#ffffff',
          gallery: gallery || [],
          description: description || '',
          top_programs: topPrograms || [],
          tuition_range: tuitionRange || '',
          features: features || [],
          contact_email: contactEmail
        }
      }
    );

    return NextResponse.json({ success: true, message: 'University updated successfully.' });
  } catch (error: any) {
    console.error('API Error in PUT /api/admin/universities:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
