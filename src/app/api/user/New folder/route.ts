import { NextResponse } from 'next/server';

// Mock address data
const addresses = [
  {
    id: 'addr1',
    line1: '123 MG Road',
    line2: 'Near Central Park',
    city: 'Bangalore',
    state: 'Karnataka',
    zip: '560001',
    country: 'India',
  },
];

export async function GET() {
  return NextResponse.json({ addresses });
}
