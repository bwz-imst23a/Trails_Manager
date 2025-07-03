import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongoConfig';

export async function GET() {
    try {
        // Check database connection
        const db = await getDatabase();
        await db.admin().ping();

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: 'connected'
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: 'Database connection failed'
            },
            { status: 503 }
        );
    }
}