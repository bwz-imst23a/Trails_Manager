"use client";

import { Button } from "@/components/ui/button";
import { trailService } from "@/lib/clientServices";
import { Trail } from "@/types/trails";
import { useState } from "react";

interface AddTrailButtonProps {
    trailData: Trail;
}

//TODO: Add animation on success or failure
export default function AddTrailButton({ trailData }: AddTrailButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function addSampleTrail() {
        setIsLoading(true);

        try {
            const result = await trailService.addTrail(trailData);
            console.log("Trail added successfully:", result);
        } catch (error) {
            console.error("Error adding trail:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Button onClick={addSampleTrail} disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Sample Trail"}
            </Button>
        </div>
    );
}