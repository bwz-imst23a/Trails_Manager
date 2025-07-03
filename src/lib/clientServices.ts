import { Trail } from "@/types/trails";

// For client-side API calls in Next.js, we can use relative URLs when API_BASE_URL is not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const trailService = {
    /**
     * Fetches a list of trails from the API.
     *
     * @returns {Promise<Trail[]>} A promise that resolves to an array of Trail objects.
     * @throws {Error} Throws an error if the API request fails or the response is not ok.
     */
    async getTrails(): Promise<Trail[]> {
        const response = await fetch(`/api/trails`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch trails');
        }

        return result;
    },


    /**
     * Fetches a trail by its unique identifier.
     *
     * @param id - The unique identifier of the trail to fetch.
     * @returns A promise that resolves to a `Trail` object.
     * @throws An error if the fetch operation fails or the response is not OK.
     */
    async getTrail(id: string): Promise<Trail | null> {
        const response = await fetch(`/api/trails/${id}`);
        if (response.status === 404) {
            return null;
        }
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch trail');
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
        const response = await fetch(`/api/trails`, {
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
    },

    async updateTrail(id: string, trailData: Trail): Promise<Trail> {
        const response = await fetch(`/api/trails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trailData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to update trail');
        }

        return result;
    },

    async deleteTrail(id: string): Promise<void> {
        const response = await fetch(`/api/trails/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Failed to delete trail');
        }

        return response.json();
    }
};