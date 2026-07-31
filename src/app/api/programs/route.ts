import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { ensureDbInitialized } from '../../../lib/dbInit';

export async function GET() {
  try {
    await ensureDbInitialized();
    const sql = getDb();
    
    const dbProgs = await sql`
      SELECT * FROM programs 
      ORDER BY title ASC
    `;
    
    const programs = dbProgs.map(p => ({
      id: p.id,
      title: p.title,
      universityId: p.university_id,
      universityName: p.university_name,
      degreeLevel: p.degree_level,
      category: p.category,
      duration: p.duration,
      credits: p.credits,
      tuitionPerYear: Number(p.tuition_per_year),
      applicationDeadline: p.application_deadline,
      format: p.format,
      description: p.description,
      curriculumHighlights: p.curriculum_highlights,
      careerOutcomes: p.career_outcomes,
      eligibility: p.eligibility,
      featured: p.featured
    }));
    
    return NextResponse.json(programs);
  } catch (error: any) {
    console.error('API Error in GET /api/programs:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
