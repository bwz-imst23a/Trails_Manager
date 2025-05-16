import { Trail } from "@/types/trails";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const trailService = {
    async getTrails(): Promise<Trail[]> {
        const response = await fetch(`${API_BASE_URL}/api/trails`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch trails');
        }

        return result;
    },

    /**
     * Adds a new trail by sending the provided trail data to the server.
     *
     * @param trailData - The trail data to be added.
     * @returns A promise that resolves to an object containing the ID of the newly added trail and the trail data.
     * @throws An error if the server response is not OK or if an error message is returned.
     */
    async addTrail(trailData: Trail): Promise<{ id: string; data: Trail }> {
        const response = await fetch(`${API_BASE_URL}/api/trails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trailData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to add trail');
        }

        return result;
    }
};