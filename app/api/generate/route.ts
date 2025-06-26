import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName } = body;

    if (!productName) {
      return NextResponse.json({ error: 'Missing product name' }, { status: 400 });
    }

    // 🧠 Prompt for AI
    const prompt = `
Generate an ad in this format:

Headline: <a catchy, engaging ad title>
Caption: <a short, clear caption for the ad>

Product: ${productName}
Only return the Headline and Caption.
`;

    // 🔗 OpenRouter API Request
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'AdGenie AI',
      },
      body: JSON.stringify({
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const resultText = await response.text();

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      console.error('❌ Failed to parse AI response:', resultText);
      return NextResponse.json({ error: 'Invalid AI response' }, { status: 500 });
    }

    const output = result.choices?.[0]?.message?.content?.trim() || '';
    console.log('🧠 AI Output:', output);

    // ✅ Safe parsing
    let headline = '';
    let caption = '';

    if (output.includes('Headline:') && output.includes('Caption:')) {
      const parts = output.split('Caption:');
      headline = parts[0].replace('Headline:', '').trim();
      caption = parts[1].trim();
    } else {
      caption = output;
      console.warn('⚠️ Unexpected AI format. Used full output as caption.');
    }
    // ✅ Get logged-in user's email
    const session = await getServerSession(authOptions);
const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // 💾 Save to MongoDB (placeholder user until login is added)
    const savedAd = await prisma.ad.create({
      data: {
        userEmail:userEmail,
        product: productName,
        headline,
        caption,
      },
    });

    return NextResponse.json({
      result: {
        headline,
        caption,
        savedId: savedAd.id,
      },
    });
  } catch (error) {
    console.error('🔥 Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

