import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('fromApp', '', { path: '/', maxAge: 0 }); // Clear the cookie
  return response;
}
