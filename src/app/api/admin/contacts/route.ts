import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { getAdminSession } from '../../../../lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const db = await getDb();
    const contacts = await db.collection('contact_inquiries')
      .find()
      .sort({ created_at: -1 })
      .toArray();
    
    const mappedContacts = contacts.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      inquiryType: c.inquiry_type,
      campus: c.campus,
      program: c.program || '',
      message: c.message,
      createdAt: c.created_at,
      status: c.status || 'unread'
    }));
    
    return NextResponse.json(mappedContacts);
  } catch (error: any) {
    console.error('API Error in GET /api/admin/contacts:', error);
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields: id and status' }, { status: 400 });
    }

    await db.collection('contact_inquiries').updateOne(
      { id: Number(id) },
      { $set: { status } }
    );

    return NextResponse.json({ success: true, message: 'Inquiry status updated successfully.' });
  } catch (error: any) {
    console.error('API Error in PUT /api/admin/contacts:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
