import { NextResponse } from 'next/server';
import { addTrail, getTrails } from '@/lib/persistencyService';
import { Trail } from '@/types/trails';

export async function POST(request: Request) {
    try {
        const trailData = await request.json() as Trail;
        const result = await addTrail(trailData);

        if (result) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ error: 'Failed to add trail' }, { status: 500 });
        }
    } catch (error) {
        console.error('API error adding trail:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const trails = await getTrails();

        return NextResponse.json(trails);
    } catch (error) {
        console.error('API error fetching trails:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
