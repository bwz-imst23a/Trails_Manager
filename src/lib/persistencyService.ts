import { Trail } from "@/types/trails";

export function getTrails(): Trail[] {
    const trails = localStorage.getItem('trails');
    if (trails) {
        return JSON.parse(trails);
    }
    return [];
}

export function getTrail(trailId: string): Trail | undefined {
    const trails = getTrails();
    return trails.find((trail: Trail) => trail.id === trailId);
}

export function saveTrails(trails: Trail[]) {
    localStorage.setItem('trails', JSON.stringify(trails));
}

export function addTrail(trail: Trail) {
    const trails = getTrails();
    trails.push(trail);
    saveTrails(trails);
}

export function updateTrail(updatedTrail: Trail) {
    const trails = getTrails();
    const trailIndex = trails.findIndex((trail: Trail) => trail.id === updatedTrail.id);
    if (trailIndex !== -1) {
        trails[trailIndex] = updatedTrail;
        saveTrails(trails);
    }
}

export function deleteTrail(trailId: string) {
    const trails = getTrails();
    const updatedTrails = trails.filter((trail: Trail) => trail.id !== trailId);
    saveTrails(updatedTrails);
}