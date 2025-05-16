import { Trail } from "@/types/trails";
import AddTrailButton from "@/components/AddTrailButton";

export default function Home() {
  const sampleTrail: Trail = {
    name: "Mountain Adventure",
    description: "A scenic trail through the mountains with breathtaking views.",
    distanceKm: 15, // in kilometers
    durationMinutes: 240, // 4 hours
    elevationGainMeters: 800, // in meters
    difficulty: "T3",
    imageUrl: "https://picsum.photos/id/1/1200/800",
  };

  return (
    <main className="p-6">
      <header className="flex justify-between">
        <h1>Rappi Trails</h1>
        <AddTrailButton trailData={sampleTrail} />
      </header>
    </main>
  );
}
