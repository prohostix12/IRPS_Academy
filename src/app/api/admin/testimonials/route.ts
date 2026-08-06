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
      name, quote, avatar, rating
    } = body;

    if (!name || !quote) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = `testi-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

    await db.collection<any>('testimonials').insertOne({
      _id: id,
      id,
      name,
      quote,
      avatar: avatar || '',
      rating: Number(rating) || 5,
      created_at: new Date()
    });

    return NextResponse.json({ success: true, id, message: 'Testimonial created successfully.' });
  } catch (error: any) {
    console.error('API Error in POST /api/admin/testimonials:', error);
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
      id, name, quote, avatar, rating
    } = body;

    if (!id || !name || !quote) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection<any>('testimonials').updateOne(
      { _id: id },
      {
        $set: {
          name,
          quote,
          avatar: avatar || '',
          rating: Number(rating) || 5
        }
      }
    );

    return NextResponse.json({ success: true, message: 'Testimonial updated successfully.' });
  } catch (error: any) {
    console.error('API Error in PUT /api/admin/testimonials:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
