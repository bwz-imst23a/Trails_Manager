import { Trail } from "@/types/trails";

export const trailService = {
    /**
     * Adds a new trail by sending the provided trail data to the server.
     *
     * @param trailData - The trail data to be added.
     * @returns A promise that resolves to an object containing the ID of the newly added trail and the trail data.
     * @throws An error if the server response is not OK or if an error message is returned.
     */
    async addTrail(trailData: Trail): Promise<{ id: string; data: Trail }> {
        throw new Error('Not implemented');
        const response = await fetch('/api/trails', {
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