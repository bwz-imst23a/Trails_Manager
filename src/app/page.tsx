import { addTrail } from "@/lib/persistencyService";
import { Trail } from "@/types/trails";

export default function Home() {
  const sampleTrail: Trail = {
    id: "1",
    name: "Mountain Adventure",
    description: "A scenic trail through the mountains with breathtaking views.",
    distance: 15, // in kilometers
    durationMinute: 240, // 4 hours
    elevationGainMeters: 800, // in meters
    difficulty: "T3",
    imageUrl: "https://placehold.co/600x400"
  };
  async function addSampleTrail() {
    const result = await addTrail(sampleTrail);
    if (result) {
      console.log("Trail added successfully:", result);
    } else {
      console.error("Failed to add trail.");
    }
  }

  addSampleTrail();
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
