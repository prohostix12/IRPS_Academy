import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const db = await getDb();
    
    const body = await req.json();
    const { name, email, phone, inquiryType, campus, program, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required fields.' }, { status: 400 });
    }
    
    await db.collection('contact_inquiries').insertOne({
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      inquiry_type: inquiryType || 'General Inquiry',
      campus: campus || 'General',
      program: program || '',
      message,
      status: 'unread',
      created_at: new Date()
    });
    
    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' });
  } catch (error: any) {
    console.error('API Error in POST /api/contact:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
