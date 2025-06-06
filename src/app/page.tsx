"use client";
import { useEffect, useState } from "react";
import { trailService } from "@/lib/clientServices";
import TrailCard from "@/components/ui/trail-cards";
import TrailFormButton from "@/components/TrailFormButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trail } from "@/types/trails";

const difficultyOrder = ["T1", "T2", "T3", "T4", "T5"];

export default function Home() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [showPast, setShowPast] = useState<boolean>(false);

  useEffect(() => {
    trailService.getTrails().then((data) => {
      setTrails(data || []);
    });
  }, []);

  function sortTrails(trails: Trail[]): Trail[] {
    let sorted = [...trails];
    switch (sortBy) {
      case "Name A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Difficulty Asc":
        sorted.sort((a, b) => difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty));
        break;
      case "Difficulty Desc":
        sorted.sort((a, b) => difficultyOrder.indexOf(b.difficulty) - difficultyOrder.indexOf(a.difficulty));
        break;
      case "Upcoming Trails":
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      default:
        break;
    }
    return sorted;
  }

  // Filter für vergangene Trails
  const now = new Date();
  let filteredTrails = trails;
  if (!showPast) {
    filteredTrails = trails.filter((trail) => new Date(trail.date) >= now);
  }

  const sortedTrails = sortTrails(filteredTrails);

  return (
    <main className="container mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 lg:py-8 xl:py-12 max-w-[120rem]">
      {/* Header Section - Enhanced for 4K */}
      <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
        {/* Title - Enhanced typography for 4K */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[var(--secondary)] text-center sm:text-left leading-tight">
          Rappi Trails
        </h1>
        {/* Add Trail Button - Enhanced sizing */}
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-2 sm:justify-end">
          <TrailFormButton />
        </div>
      </div>

      {/* Filters Section - Enhanced for 4K */}
      <div className="mb-6 sm:mb-8 lg:mb-12 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-6 lg:gap-8 xl:gap-12">
        {/* Sort Dropdown - Larger for 4K */}
        <div className="w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px] md:w-[220px] lg:w-[260px] xl:w-[300px] text-[var(--secondary)] h-10 sm:h-11 lg:h-12 xl:h-14 text-sm lg:text-base xl:text-lg">
              <SelectValue placeholder="Sortieren" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="w-full text-[var(--secondary)]">
                <SelectLabel className="text-[var(--secondary)] px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Sort by</SelectLabel>
                <SelectItem value="Name A-Z" className="px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Name A-Z</SelectItem>
                <SelectItem value="Name Z-A" className="px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Name Z-A</SelectItem>
                <SelectItem value="Difficulty Asc" className="px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Easiest First</SelectItem>
                <SelectItem value="Difficulty Desc" className="px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Hardest First</SelectItem>
                <SelectItem value="Upcoming Trails" className="px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base">Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Show Past Trails Checkbox - Enhanced for 4K */}
        <div className="flex items-center gap-2 sm:gap-3 px-1">
          <Checkbox
            id="showPast"
            checked={showPast}
            onCheckedChange={() => setShowPast((v) => !v)}
            className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 xl:h-5 xl:w-5"
          />
          <label
            htmlFor="showPast"
            className="text-xs sm:text-sm lg:text-base xl:text-base text-[var(--secondary)] cursor-pointer select-none leading-tight"
          >
            Show past trails
          </label>
        </div>
      </div>

      {/* Results Count - Enhanced for 4K */}
      {sortedTrails && sortedTrails.length > 0 && (
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-[var(--secondary)]/70 text-center sm:text-left">
            {sortedTrails.length} trail{sortedTrails.length !== 1 ? 's' : ''} found
          </p>
        </div>
      )}

      {/* Trail Cards Grid - Optimized for laptop and 4K screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        {sortedTrails && sortedTrails.map((trail, idx) => (
          <TrailCard key={trail.id} trail={trail} imageId={idx + 1} />
        ))}
      </div>

      {/* Empty State - Enhanced for 4K */}
      {(!sortedTrails || sortedTrails.length === 0) && (
        <div className="text-center py-12 sm:py-16 lg:py-24 xl:py-32">
          <div className="text-[var(--secondary)]/60 mb-4 sm:mb-6 lg:mb-8">
            <svg
              className="mx-auto h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 mb-4 sm:mb-6 lg:mb-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium text-[var(--secondary)] mb-3 lg:mb-4">
            No trails found
          </h3>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[var(--secondary)]/70 mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-0 max-w-2xl mx-auto">
            {!showPast
              ? "No upcoming trails available. Try showing past trails or add a new one!"
              : "No trails available yet. Start by adding your first trail!"
            }
          </p>
          <div className="px-4 sm:px-0">
            <TrailFormButton />
          </div>
        </div>
      )}

      {/* Enhanced bottom spacing for 4K */}
      <div className="h-6 sm:h-8 lg:h-12 xl:h-16" />
    </main>
  );
}