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
    const db = await getDb();

    await db.collection<any>('universities').deleteOne({ _id: id });
    // CASCADE DELETE related programs to replicate PostgreSQL foreign key cascade
    await db.collection('programs').deleteMany({ university_id: id });

    return NextResponse.json({ success: true, message: 'University deleted successfully.' });
  } catch (error: any) {
    console.error('API Error in DELETE /api/admin/universities/[id]:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
