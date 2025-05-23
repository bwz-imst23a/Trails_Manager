import { NextResponse, NextRequest } from 'next/server';
import { deleteTrail, getTrail, updateTrail } from '@/lib/persistencyService';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;


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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        const trailData = await request.json();

        // Validate the incoming data
        if (!trailData.name || !trailData.description || !trailData.distanceKm || !trailData.durationMinutes || !trailData.elevationGainMeters || !trailData.difficulty || !trailData.imageUrl || !trailData.date) {
            return NextResponse.json({ error: 'Invalid trail data' }, { status: 400 });
        }

        updateTrail(id, trailData);

        return NextResponse.json({ message: 'Trail updated successfully' });
    } catch (error) {
        console.error('API error updating trail:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        deleteTrail(id);

        return NextResponse.json({ message: 'Trail deleted successfully' });
    } catch (error) {
        console.error('API error deleting trail:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}