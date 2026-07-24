import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';
import { getAdminSession } from '../../../../../lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const sql = getDb();

    await sql`
      DELETE FROM universities WHERE id = ${id}
    `;

    return NextResponse.json({ success: true, message: 'University deleted successfully.' });
  } catch (error: any) {
    console.error('API Error in DELETE /api/admin/universities/[id]:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
