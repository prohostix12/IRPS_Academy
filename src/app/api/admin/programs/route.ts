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
      title, universityId, universityName, degreeLevel, category, duration,
      credits, tuitionPerYear, applicationDeadline, format, description,
      curriculumHighlights, careerOutcomes, eligibility, featured
    } = body;

    if (!title || !universityId || !universityName || !degreeLevel || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = `prog-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

    await db.collection<any>('programs').insertOne({
      _id: id,
      id,
      title,
      university_id: universityId,
      university_name: universityName,
      degree_level: degreeLevel,
      category,
      duration: duration || '',
      credits: Number(credits) || 0,
      tuition_per_year: Number(tuitionPerYear) || 0,
      application_deadline: applicationDeadline || '',
      format,
      description: description || '',
      curriculum_highlights: curriculumHighlights || [],
      career_outcomes: careerOutcomes || [],
      eligibility: eligibility || '',
      featured: featured || false,
      created_at: new Date()
    });

    return NextResponse.json({ success: true, id, message: 'Program created successfully.' });
  } catch (error: any) {
    console.error('API Error in POST /api/admin/programs:', error);
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
      id, title, universityId, universityName, degreeLevel, category, duration,
      credits, tuitionPerYear, applicationDeadline, format, description,
      curriculumHighlights, careerOutcomes, eligibility, featured
    } = body;

    if (!id || !title || !universityId || !universityName || !degreeLevel || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection<any>('programs').updateOne(
      { _id: id },
      {
        $set: {
          title,
          university_id: universityId,
          university_name: universityName,
          degree_level: degreeLevel,
          category,
          duration: duration || '',
          credits: Number(credits) || 0,
          tuition_per_year: Number(tuitionPerYear) || 0,
          application_deadline: applicationDeadline || '',
          format,
          description: description || '',
          curriculum_highlights: curriculumHighlights || [],
          career_outcomes: careerOutcomes || [],
          eligibility: eligibility || '',
          featured: featured || false
        }
      }
    );

    return NextResponse.json({ success: true, message: 'Program updated successfully.' });
  } catch (error: any) {
    console.error('API Error in PUT /api/admin/programs:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
