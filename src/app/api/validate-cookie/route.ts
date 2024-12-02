import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie'); // Get the cookie header

  if (cookie && cookie.includes('fromApp=true')) {
    return NextResponse.json({ valid: true }); // Return valid if the cookie is correct
  }

  return NextResponse.json({ valid: false }, { status: 401 }); // Return error if validation fails
}
