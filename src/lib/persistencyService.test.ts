import { getTrails, getTrail, saveTrails, addTrail, updateTrail, deleteTrail } from './persistencyService';
import { Trail } from "@/types/trails";

describe('persistencyService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('getTrails', () => {
        it('should return an empty array if no trails are stored', () => {
            expect(getTrails()).toEqual([]);
        });

        it('should return the stored trails', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            expect(getTrails()).toEqual(trails);
        });
    });

    describe('getTrail', () => {
        it('should return undefined if the trail does not exist', () => {
            expect(getTrail('1')).toBeUndefined();
        });

        it('should return the trail if it exists', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            expect(getTrail('1')).toEqual(trails[0]);
        });
    });

    describe('saveTrails', () => {
        it('should save the trails to localStorage', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            saveTrails(trails);
            expect(JSON.parse(localStorage.getItem('trails')!)).toEqual(trails);
        });
    });

    describe('addTrail', () => {
        it('should add a new trail to the stored trails', () => {
            const trail: Trail = {
                id: '1',
                name: 'Trail 1',
                description: 'A scenic trail',
                distance: 10,
                durationMinute: 120,
                elevationGainMeters: 500,
                difficulty: 'T1',
                imageUrl: 'https://placehold.co/600x400'
            };
            addTrail(trail);
            expect(getTrails()).toEqual([trail]);
        });
    });

    describe('updateTrail', () => {
        it('should update an existing trail', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            const updatedTrail: Trail = {
                id: '1',
                name: 'Updated Trail 1',
                description: 'An updated scenic trail',
                distance: 12,
                durationMinute: 130,
                elevationGainMeters: 550,
                difficulty: 'T1',
                imageUrl: 'https://placehold.co/600x400'
            };
            updateTrail(updatedTrail);
            expect(getTrail('1')).toEqual(updatedTrail);
        });

        it('should not modify trails if the trail does not exist', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            const updatedTrail: Trail = {
                id: '2',
                name: 'Updated Trail 2',
                description: 'Another updated trail',
                distance: 15,
                durationMinute: 150,
                elevationGainMeters: 600,
                difficulty: 'T1',
                imageUrl: 'https://placehold.co/600x400'
            };
            updateTrail(updatedTrail);
            expect(getTrails()).toEqual(trails);
        });
    });

    describe('deleteTrail', () => {
        it('should delete the trail with the given id', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
                {
                    id: '2',
                    name: 'Trail 2',
                    description: 'Another trail',
                    distance: 15,
                    durationMinute: 150,
                    elevationGainMeters: 600,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            deleteTrail('1');
            expect(getTrails()).toEqual([
                {
                    id: '2',
                    name: 'Trail 2',
                    description: 'Another trail',
                    distance: 15,
                    durationMinute: 150,
                    elevationGainMeters: 600,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ]);
        });

        it('should not modify trails if the trail does not exist', () => {
            const trails: Trail[] = [
                {
                    id: '1',
                    name: 'Trail 1',
                    description: 'A scenic trail',
                    distance: 10,
                    durationMinute: 120,
                    elevationGainMeters: 500,
                    difficulty: 'T1',
                    imageUrl: 'https://placehold.co/600x400'
                },
            ];
            localStorage.setItem('trails', JSON.stringify(trails));
            deleteTrail('2');
            expect(getTrails()).toEqual(trails);
        });
    });
});