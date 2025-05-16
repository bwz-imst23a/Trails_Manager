import type { Trail } from "@/types/trails"

// Server-side implementation
export function getTrails(): Trail[] {
  // In a real server-side implementation, this would fetch from a database
  // For demo purposes, returning mock data with more trails to show the repeating pattern
  return [
    {
      id: "1",
      name: "Alpine Summit",
      description: "A challenging alpine trail with breathtaking views of the surrounding mountains and valleys.",
      distance: 10.5,
      durationMinute: 180,
      elevationGainMeters: 800,
      difficulty: "T5",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "2",
      name: "Forest Path",
      description: "A peaceful walk through ancient forests with diverse flora and fauna.",
      distance: 8.2,
      durationMinute: 150,
      elevationGainMeters: 300,
      difficulty: "T3",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "3",
      name: "Coastal Route",
      description: "A scenic coastal trail with stunning ocean views and sandy beaches.",
      distance: 6.5,
      durationMinute: 90,
      elevationGainMeters: 200,
      difficulty: "T1",
      imageUrl: "",
      date: "2023-08-31",
    },
    {
      id: "4",
      name: "Mountain Pass",
      description: "A moderate trail crossing a mountain pass with panoramic views.",
      distance: 12.8,
      durationMinute: 240,
      elevationGainMeters: 650,
      difficulty: "T2",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "5",
      name: "Canyon Adventure",
      description: "An exciting trail through dramatic canyon landscapes and river crossings.",
      distance: 14.3,
      durationMinute: 300,
      elevationGainMeters: 500,
      difficulty: "T4",
      imageUrl: "",
      date: "2025-10-15",
    },
    {
      id: "6",
      name: "Valley Circuit",
      description: "A gentle loop through a picturesque valley with meadows and streams.",
      distance: 7.6,
      durationMinute: 120,
      elevationGainMeters: 250,
      difficulty: "T2",
      imageUrl: "",
      date: "2023-07-22",
    },
  ]
}

export function getTrail(trailId: string): Trail | undefined {
  const trails = getTrails()
  return trails.find((trail: Trail) => trail.id === trailId)
}

// These functions would be implemented as server actions in a real app
export async function saveTrails(trails: Trail[]) {
  // Server-side implementation would save to a database
  console.log("Saving trails:", trails)
}

export async function addTrail(trail: Trail) {
  // Server-side implementation would add to a database
  console.log("Adding trail:", trail)
}

export async function updateTrail(updatedTrail: Trail) {
  // Server-side implementation would update in a database
  console.log("Updating trail:", updatedTrail)
}

export async function deleteTrail(trailId: string) {
  // Server-side implementation would delete from a database
  console.log("Deleting trail:", trailId)
}
