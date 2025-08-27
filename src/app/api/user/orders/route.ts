import { NextResponse } from 'next/server';

// Mock order data
const orders = [
  { id: 'ORD123', date: '2025-08-01', status: 'Completed', total: 150 },
  { id: 'ORD124', date: '2025-08-05', status: 'Pending', total: 200 },
];

export async function GET() {
  return NextResponse.json({ orders });
}
