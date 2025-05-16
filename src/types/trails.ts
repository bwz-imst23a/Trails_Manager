export interface Trail {
    name: string;
    description: string;
    distanceKm: number;
    durationMinutes: number;
    elevationGainMeters: number;
    difficulty: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
    imageUrl: string;
    date: string // ISO date string
}