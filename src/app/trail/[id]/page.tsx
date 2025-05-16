import Image from "next/image"
import Link from "next/link"
import { getTrail } from "@/lib/persistencyService"
import { ArrowLeft, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Format minutes to hours and minutes (e.g. 90 -> 1:30 h)
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins.toString().padStart(2, "0")} h`
}

export default async function TrailDetailPage({ params }: { params: { id: string } }) {
  // Properly await the params object before accessing its properties
  const { id } = await params
  const trail = getTrail(id)

  // If trail not found, show 404
  if (!trail) {
    notFound()
  }

  // Format date as DD.MM.YY
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date(trail.date))
    .replace(/\//g, ".")

  // Use trail ID to get a consistent image
  const imageId = Number.parseInt(trail.id) || 1
  const imageUrl = `https://picsum.photos/id/${imageId}/1200/800`

  return (
    <main className="container mx-auto px-4 py-6 bg-[var(--background)]">
      {/* Header with back button, title and action buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[var(--secondary)] cursor-pointer hover:cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">{trail.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[var(--primary)] text-[var(--primary-foreground)] border-none px-6 py-3 text-base">
            Edit
          </Button>
          <Button variant="outline" className="bg-[var(--color-destructive)] text-white border-none px-6 py-3 text-base">
            Delete
          </Button>
        </div>
      </div>

      {/* Trail image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={trail.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Trail description */}
      <p className="text-[var(--secondary)] mb-6 text-center">
        {trail.description ||
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."}
      </p>

      {/* Information cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weather card */}
        <div className="bg-[var(--primary)] rounded-lg p-4 text-[var(--primary-foreground)]">
          <h2 className="text-xl font-bold mb-4 text-center">Weather</h2>
          <div className="flex justify-center mb-4">
            <Cloud className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Temperature:</span>
              <span>18°C</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Speed:</span>
              <span>12 km/h</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity:</span>
              <span>75%</span>
            </div>
          </div>
        </div>

        {/* Trail description card */}
        <div className="bg-[var(--primary)] rounded-lg p-4 text-[var(--primary-foreground)]">
          <h2 className="text-xl font-bold mb-4 text-center">Trail Description</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Difficulty:</span>
              <span className={`difficulty-badge-small difficulty-${trail.difficulty.toLowerCase()}`}>
                {trail.difficulty}
              </span>
            </div>
            {/* Calculate endurance based on distance */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Endurance:</span>
                <span className="text-xs">{Math.min(Math.max(Math.round(trail.distance / 15 * 100), 20), 100)}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2" 
                  style={{ width: `${Math.min(Math.max(Math.round(trail.distance / 15 * 100), 20), 100)}%` }}
                ></div>
              </div>
            </div>
            {/* Calculate experience based on difficulty */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="text-xs">{20 * parseInt(trail.difficulty.substring(1))}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2" 
                  style={{ width: `${20 * parseInt(trail.difficulty.substring(1))}%` }}
                ></div>
              </div>
            </div>
            {/* Calculate strength based on elevation gain */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Strength:</span>
                <span className="text-xs">{Math.min(Math.max(Math.round(trail.elevationGainMeters / 10), 20), 100)}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2" 
                  style={{ width: `${Math.min(Math.max(Math.round(trail.elevationGainMeters / 10), 20), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications card */}
        <div className="bg-[var(--primary)] rounded-lg p-4 text-[var(--primary-foreground)]">
          <h2 className="text-xl font-bold mb-4 text-center">Specifications</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Distance:</span>
              <span>{trail.distance} km</span>
            </div>
            <div className="flex justify-between">
              <span>Height difference:</span>
              <span>{trail.elevationGainMeters} m</span>
            </div>
            <div className="flex justify-between">
              <span>Highest point:</span>
              <span>{Math.round(trail.elevationGainMeters * 1.5)} m</span>
            </div>
            <div className="flex justify-between">
              <span>Total time:</span>
              <span>{formatDuration(trail.durationMinute)}</span>
            </div>
            <div className="flex justify-between">
              <span>Starting time:</span>
              <span>14:00</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}