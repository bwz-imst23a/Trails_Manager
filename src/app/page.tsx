import { trailService } from "@/lib/clientServices";
import TrailCard from "@/components/ui/trail-cards"
import TrailFormButton from "@/components/TrailFormButton";

export default async function Home() {
  // Server-side data fetching
  const trails = await trailService.getTrails()

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">Rappi Trails</h1>
        <TrailFormButton />
      </div>

      {/* Responsive Grid für TrailCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trails && trails.map((trail, idx) => (
          <TrailCard key={trail.id} trail={trail} imageId={idx + 1} />
        ))}
      </div>
    </main>
  )
}
