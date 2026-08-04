import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    
    const dbUnis = await db.collection('universities')
      .find()
      .sort({ name: 1 })
      .toArray();
    
    const universities = dbUnis.map(u => ({
      id: u.id,
      name: u.name,
      code: u.code,
      tagline: u.tagline,
      location: u.location,
      established: u.established,
      type: u.type,
      ranking: u.ranking,
      acceptanceRate: u.acceptance_rate,
      totalStudents: u.total_students,
      campusSize: u.campus_size,
      image: u.image,
      logo: u.logo || '',
      logoBg: u.logo_bg || '#ffffff',
      gallery: u.gallery,
      description: u.description,
      topPrograms: u.top_programs,
      tuitionRange: u.tuition_range,
      features: u.features,
      contactEmail: u.contact_email
    }));
    
    return NextResponse.json(universities);
  } catch (error: any) {
    console.error('API Error in GET /api/universities:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
