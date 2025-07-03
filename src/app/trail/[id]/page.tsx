import Image from "next/image"
import Link from "next/link"
import DeleteTrailButton from "@/components/DeleteTrailButton"
import { getTrail } from "@/lib/persistencyService"
import { ArrowLeft, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import TrailFormButton from "@/components/TrailFormButton"

// Format minutes to hours and minutes (e.g. 90 -> 1:30 h)
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins.toString().padStart(2, "0")} h`
}

export default async function TrailDetailPage({ params }: { params: { id: string } }) {
  // Properly await the params object before accessing its properties
  const { id } = await params

  const trail = await getTrail(id)

  // If trail not found, show 404
  if (!trail) {
    notFound()
  }

  // Format date as DD.MM.YY
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
    .format(new Date(trail.date))
    .replace(/\//g, ".")

  // Use trail ID to get a consistent image
  const imageUrl = trail.imageUrl

  return (
    <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 xl:py-10 bg-[var(--background)] max-w-[1600px] 2xl:max-w-[1800px]">
      {/* Header with back button, title and action buttons */}
      <div className="flex flex-col gap-3 sm:gap-2 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 lg:mb-8 xl:mb-10">
        {/* Mobile: Back button and title in separate rows for better centering */}
        <div className="flex sm:hidden items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[var(--secondary)] cursor-pointer hover:cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="invisible"> {/* Spacer for centering */}
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile: Centered title */}
        <h1 className="text-xl font-bold text-[var(--secondary)] text-center sm:hidden px-2">
          {trail.name}
        </h1>

        {/* Desktop: Back button and title together */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3 xl:gap-4 flex-1 min-w-0">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[var(--secondary)] cursor-pointer hover:cursor-pointer lg:h-12 lg:w-12 xl:h-14 xl:w-14">
              <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[var(--secondary)] truncate">
            {trail.name}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-2 lg:gap-3 xl:gap-4 sm:justify-end sm:flex-shrink-0">
          <TrailFormButton trail={trail} trailId={id} />
          <DeleteTrailButton trailId={id} />
        </div>
      </div>

      {/* Trail image */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/10] xl:aspect-[5/2] 2xl:aspect-[12/5] rounded-lg overflow-hidden mb-4 sm:mb-6 lg:mb-8 xl:mb-10 min-h-[200px] sm:min-h-[250px] lg:min-h-[350px] xl:min-h-[450px] shadow-lg">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={trail.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 85vw, 80vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Trail description */}
      <div className="mb-4 sm:mb-6 lg:mb-8 xl:mb-10 px-2 sm:px-0 max-w-4xl mx-auto">
        <p className="text-[var(--secondary)] text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed lg:leading-loose">
          {trail.description ||
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."}
        </p>
      </div>

      {/* Information cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 2xl:max-w-none">
        {/* Weather card */}
        <div className="bg-[var(--primary)] rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-[var(--primary-foreground)] order-1 md:order-1 shadow-lg">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-center">Weather</h2>
          <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6 xl:mb-8">
            <Cloud className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
          </div>
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5 text-sm sm:text-base lg:text-lg xl:text-xl">
            <div className="flex justify-between items-center">
              <span>Temperature:</span>
              <span className="font-medium">18°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Wind Speed:</span>
              <span className="font-medium">12 km/h</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Humidity:</span>
              <span className="font-medium">75%</span>
            </div>
          </div>
        </div>

        {/* Trail description card */}
        <div className="bg-[var(--primary)] rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-[var(--primary-foreground)] order-2 md:order-2 shadow-lg">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-center">Trail Description</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6 text-sm sm:text-base lg:text-lg xl:text-xl">
            <div className="flex justify-between items-center">
              <span>Difficulty:</span>
              <span className={`difficulty-badge-small difficulty-${trail.difficulty.toLowerCase()} font-medium lg:text-lg xl:text-xl`}>
                {trail.difficulty}
              </span>
            </div>
            {/* Calculate endurance based on distance */}
            <div className="space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center">
                <span>Endurance:</span>
                <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium">{Math.min(Math.max(Math.round(trail.distanceKm / 15 * 100), 20), 100)}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4">
                <div
                  className="bg-white rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4 transition-all duration-300"
                  style={{ width: `${Math.min(Math.max(Math.round(trail.distanceKm / 15 * 100), 20), 100)}%` }}
                ></div>
              </div>
            </div>
            {/* Calculate experience based on difficulty */}
            <div className="space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center">
                <span>Experience:</span>
                <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium">{20 * parseInt(trail.difficulty.substring(1))}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4">
                <div
                  className="bg-white rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4 transition-all duration-300"
                  style={{ width: `${20 * parseInt(trail.difficulty.substring(1))}%` }}
                ></div>
              </div>
            </div>
            {/* Calculate strength based on elevation gain */}
            <div className="space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center">
                <span>Strength:</span>
                <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium">{Math.min(Math.max(Math.round(trail.elevationGainMeters / 10), 20), 100)}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4">
                <div
                  className="bg-white rounded-full h-2 sm:h-2.5 lg:h-3 xl:h-4 transition-all duration-300"
                  style={{ width: `${Math.min(Math.max(Math.round(trail.elevationGainMeters / 10), 20), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications card */}
        <div className="bg-[var(--primary)] rounded-lg lg:rounded-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-[var(--primary-foreground)] order-3 md:order-3 md:col-span-2 lg:col-span-1 shadow-lg">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-center">Specifications</h2>
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5 text-sm sm:text-base lg:text-lg xl:text-xl">
            <div className="flex justify-between items-center">
              <span>Distance:</span>
              <span className="font-medium">{trail.distanceKm} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Height difference:</span>
              <span className="font-medium">{trail.elevationGainMeters} m</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Highest point:</span>
              <span className="font-medium">{Math.round(trail.elevationGainMeters * 1.5)} m</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total time:</span>
              <span className="font-medium">{formatDuration(trail.durationMinutes)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Starting time:</span>
              <span className="font-medium">{trail.time || "--:--"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Date:</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}