import Image from "next/image"
import type { Trail } from "@/types/trails"

interface TrailCardProps {
  trail: Trail
  imageId?: number
}

export default function TrailCard({ trail, imageId = 1 }: TrailCardProps) {
  // Check if trail date is in the past
  const trailDate = new Date(trail.date)
  const isPastTrail = trailDate < new Date()

  // Format date as DD.MM.YY
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(trailDate)
    .replace(/\//g, ".")

  // Use different image IDs for variety
  const imageUrl = `https://picsum.photos/id/${imageId}/1200/800`

  return (
    <div className="trail-card h-full">
      <div className="relative w-full h-full aspect-video">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={trail.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="trail-card-image object-cover"
          priority={imageId <= 2} // Prioritize loading the first two images
        />

        <div className={`difficulty-badge difficulty-${trail.difficulty.toLowerCase()}`}>{trail.difficulty}</div>

        <div className="trail-card-overlay">
          <h2 className="trail-card-title">{trail.name}</h2>
          <div className={`trail-card-date ${isPastTrail ? "past-date" : ""}`}>{formattedDate}</div>
        </div>
      </div>
    </div>
  )
}
