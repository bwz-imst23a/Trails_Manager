import { Trail } from "@/types/trails";
import AddTrailButton from "@/components/AddTrailButton";

export default function Home() {
  const sampleTrail: Trail = {
    id: "1",
    name: "Mountain Adventure",
    description: "A scenic trail through the mountains with breathtaking views.",
    distance: 15, // in kilometers
    durationMinute: 240, // 4 hours
    elevationGainMeters: 800, // in meters
    difficulty: "T3",
    imageUrl: "https://picsum.photos/id/1/1200/800",
  };

  return (
    <main>
      <div>
        <h1>Rappi Trails</h1>
        <AddTrailButton trailData={sampleTrail} />
      </div>
    </main>
  );
}
