import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    
    const dbTestimonials = await db.collection('testimonials')
      .find()
      .sort({ created_at: -1 })
      .toArray();
    
    const testimonials = dbTestimonials.map(t => ({
      id: t.id,
      name: t.name,
      quote: t.quote,
      avatar: t.avatar,
      rating: t.rating || 5
    }));
    
    return NextResponse.json(testimonials);
  } catch (error: any) {
    console.error('API Error in GET /api/testimonials:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
