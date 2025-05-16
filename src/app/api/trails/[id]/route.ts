import { NextResponse, NextRequest } from 'next/server';
import { getTrail } from '@/lib/persistencyService';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const trail = await getTrail(id);

        if (!trail) {
            return NextResponse.json({ error: 'Trail not found' }, { status: 404 });
        }

        return NextResponse.json(trail);
    } catch (error) {
        console.error('API error fetching trail:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}