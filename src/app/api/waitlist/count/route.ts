import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const coll = adminDb.collection('emails');
    const snapshot = await coll.count().get();
    const count = snapshot.data().count;

    return NextResponse.json({ count });
  } catch (error) {
    console.error('API Error fetching waitlist count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
