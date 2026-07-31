import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/auth';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getDb();
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

    await sql`
      INSERT INTO programs (
        id, title, university_id, university_name, degree_level, category, duration,
        credits, tuition_per_year, application_deadline, format, description,
        curriculum_highlights, career_outcomes, eligibility, featured
      ) VALUES (
        ${id}, ${title}, ${universityId}, ${universityName}, ${degreeLevel}, ${category}, ${duration || ''}, 
        ${Number(credits) || 0}, ${Number(tuitionPerYear) || 0}, ${applicationDeadline || ''}, ${format}, ${description || ''}, 
        ${curriculumHighlights || []}, ${careerOutcomes || []}, ${eligibility || ''}, ${featured || false}
      )
    `;

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
    const sql = getDb();
    const body = await req.json();
    const {
      id, title, universityId, universityName, degreeLevel, category, duration,
      credits, tuitionPerYear, applicationDeadline, format, description,
      curriculumHighlights, careerOutcomes, eligibility, featured
    } = body;

    if (!id || !title || !universityId || !universityName || !degreeLevel || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      UPDATE programs SET 
        title = ${title},
        university_id = ${universityId},
        university_name = ${universityName},
        degree_level = ${degreeLevel},
        category = ${category},
        duration = ${duration || ''},
        credits = ${Number(credits) || 0},
        tuition_per_year = ${Number(tuitionPerYear) || 0},
        application_deadline = ${applicationDeadline || ''},
        format = ${format},
        description = ${description || ''},
        curriculum_highlights = ${curriculumHighlights || []},
        career_outcomes = ${careerOutcomes || []},
        eligibility = ${eligibility || ''},
        featured = ${featured || false}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'Program updated successfully.' });
  } catch (error: any) {
    console.error('API Error in PUT /api/admin/programs:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
