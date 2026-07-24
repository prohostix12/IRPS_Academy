import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'irps-academy-secret-key-12345';
export const COOKIE_NAME = 'admin_session';

export function signToken(payload: { id: number; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { id: number; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
  } catch (error) {
    return null;
  }
}

export async function getAdminSession(): Promise<{ id: number; username: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    console.error('Error reading admin session cookie:', error);
    return null;
  }
}
