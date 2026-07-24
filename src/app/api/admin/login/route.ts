import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { ensureDbInitialized } from '../../../../lib/dbInit';
import { signToken, COOKIE_NAME } from '../../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const sql = getDb();
    
    const body = await req.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }
    
    const admins = await sql`
      SELECT * FROM admins WHERE username = ${username}
    `;
    
    if (admins.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }
    
    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }
    
    const token = signToken({ id: admin.id, username: admin.username });
    
    const response = NextResponse.json({ success: true, message: 'Logged in successfully.' });
    
    // Set HTTP-only session cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });
    
    return response;
  } catch (error: any) {
    console.error('API Error in POST /api/admin/login:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
