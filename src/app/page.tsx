import { trailService } from "@/lib/clientServices";
import TrailCard from "@/components/ui/trail-cards"
import AddTrailButton from "@/components/AddTrailButton";
import { Trail } from "@/types/trails";

export default async function Home() {
  // Server-side data fetching
  const trails = await trailService.getTrails()

  // Create pairs of trails for the alternating layout
  const createTrailPairs = (trails: Trail[]) => {
    const pairs = []
    for (let i = 0; i < trails.length; i += 2) {
      if (i + 1 < trails.length) {
        // We have a pair
        pairs.push([trails[i], trails[i + 1]])
      } else {
        // We have a single trail left
        pairs.push([trails[i]])
      }
    }
    return pairs
  }

  const trailPairs = createTrailPairs(trails || [])

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">Rappi Trails</h1>
        <AddTrailButton />
      </div>

      <div className="flex flex-col gap-4">
        {trailPairs.length > 0 && trailPairs.map((pair, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* First trail in the pair - full width on mobile, alternating width on desktop */}
            <div className={`col-span-1 ${rowIndex % 2 === 0 ? "md:col-span-8" : "md:col-span-4"}`}>
              <TrailCard trail={pair[0]} imageId={rowIndex * 2 + 1} />
            </div>

            {/* Second trail in the pair (if exists) - full width on mobile, alternating width on desktop */}
            {pair.length > 1 && (
              <div className={`col-span-1 ${rowIndex % 2 === 0 ? "md:col-span-4" : "md:col-span-8"}`}>
                <TrailCard trail={pair[1]} imageId={rowIndex * 2 + 2} />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
