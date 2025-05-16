import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-[var(--secondary)] mb-4">Trail Not Found</h2>
      <p className="text-[var(--foreground)] mb-8 text-center">
        Sorry, the trail you are looking for does not exist or has been removed.
      </p>
      <Link href="/">
        <Button className="bg-[var(--primary)] text-[var(--primary-foreground)]">Return to Trails</Button>
      </Link>
    </div>
  )
}
