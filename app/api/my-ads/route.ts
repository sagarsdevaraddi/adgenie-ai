import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const ads = await prisma.ad.findMany({
    where: { userEmail: session.user.email },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(ads);
}
