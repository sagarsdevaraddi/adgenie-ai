import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, headline, caption } = body;

    if (!product || !headline || !caption) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const ad = await prisma.ad.create({
      data: {
        userEmail: 'test@sagar.com', // Temporary until login is added
        product,
        headline,
        caption,
      },
    });

    return NextResponse.json({ success: true, ad });
  } catch (error) {
    console.error('❌ Save Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
