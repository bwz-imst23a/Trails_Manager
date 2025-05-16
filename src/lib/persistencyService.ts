import type { Trail } from "@/types/trails"

// Server-side implementation
export function getTrails(): Trail[] {
  // In a real server-side implementation, this would fetch from a database
  // For demo purposes, returning mock data with more trails to show the repeating pattern
  return [
    {
      id: "1",
      name: "Trail 1",
      description: "A scenic trail",
      distance: 10,
      durationMinute: 120,
      elevationGainMeters: 500,
      difficulty: "T5",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "2",
      name: "Trail 2",
      description: "Another trail",
      distance: 15,
      durationMinute: 150,
      elevationGainMeters: 600,
      difficulty: "T3",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "3",
      name: "Trail 3",
      description: "A past trail",
      distance: 8,
      durationMinute: 90,
      elevationGainMeters: 300,
      difficulty: "T1",
      imageUrl: "",
      date: "2023-08-31",
    },
    {
      id: "4",
      name: "Trail 4",
      description: "A future trail",
      distance: 12,
      durationMinute: 130,
      elevationGainMeters: 450,
      difficulty: "T2",
      imageUrl: "",
      date: "2025-09-18",
    },
    {
      id: "5",
      name: "Trail 5",
      description: "Mountain trail",
      distance: 14,
      durationMinute: 180,
      elevationGainMeters: 800,
      difficulty: "T4",
      imageUrl: "",
      date: "2025-10-15",
    },
    {
      id: "6",
      name: "Trail 6",
      description: "Forest path",
      distance: 7,
      durationMinute: 60,
      elevationGainMeters: 200,
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
