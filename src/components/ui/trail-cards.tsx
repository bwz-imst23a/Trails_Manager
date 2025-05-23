import Image from "next/image"
import Link from "next/link"
import type { Trail } from "@/types/trails"

interface TrailCardProps {
  trail: Trail
  imageId?: number
}

export default function TrailCard({ trail, imageId = 1 }: TrailCardProps) {
  const trailDate = new Date(trail.date)
  const isPastTrail = trailDate < new Date()

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(trailDate)
    .replace(/\//g, ".")

  const imageUrl = trail.imageUrl

  return (
    <Link href={`/trail/${trail.id}`} className="block h-full">
      <div className="trail-card h-full flex flex-col aspect-video rounded-lg overflow-hidden shadow transition-transform duration-200 hover:scale-[1.02] cursor-pointer">
        <div className="relative w-full h-40 md:h-48 lg:h-56 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={trail.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="trail-card-image object-cover"
            priority={imageId <= 2}
          />
          <div className={`difficulty-badge difficulty-${trail.difficulty.toLowerCase()} trail-card-difficulty-small`}>
            {trail.difficulty}
          </div>
        </div>
        <div className="trail-card-overlay flex flex-row items-end justify-between p-3">
          <h2 className="trail-card-title">{trail.name}</h2>
          <div className={`trail-card-date ${isPastTrail ? "past-date" : ""}`}>{formattedDate}</div>
        </div>
      </div>
    </Link>
  )
}
