import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { ensureDbInitialized } from '../../../lib/dbInit';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const sql = getDb();
    
    const body = await req.json();
    const { name, email, phone, inquiryType, campus, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required fields.' }, { status: 400 });
    }
    
    await sql`
      INSERT INTO contact_inquiries (name, email, phone, inquiry_type, campus, message)
      VALUES (${name}, ${email}, ${phone || ''}, ${inquiryType || 'General Inquiry'}, ${campus || 'General'}, ${message})
    `;
    
    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' });
  } catch (error: any) {
    console.error('API Error in POST /api/contact:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
