import generateShortUrl from '@/lib/urlShortner';
import { getUrl, setUrl } from '../../lib/store';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const shortUrl = searchParams.get('shortUrl') || '';
    const longUrl = getUrl(shortUrl);

    
    if (!longUrl || !shortUrl) {
      return NextResponse.json(
        { body: 'An error occured. Please send a valid URL' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        body: {
          shortUrl,
          longUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { body: 'An error occured. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const longUrl = body.url || '';

    if (longUrl?.trim() === '') {
      return NextResponse.json(
        { body: 'An error occured. Please send a valid URL' },
        { status: 400 }
      );
    }

    let shortUrl = getUrl(longUrl);
    if (!shortUrl) {
      shortUrl = generateShortUrl(longUrl);
      setUrl(shortUrl, longUrl);
    }

    return NextResponse.json(
      {
        body: {
          shortUrl,
          longUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { body: 'An error occured. Please try again later.' + err },
      { status: 500 }
    );
  }
}
