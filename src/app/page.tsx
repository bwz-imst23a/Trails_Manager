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
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">Rappi Trails</h1>
        <TrailFormButton />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] text-[var(--secondary)]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="w-[180px] text-[var(--secondary)]">
              <SelectLabel className="text-[var(--secondary)]">Sort by</SelectLabel>
              <SelectItem value="Name A-Z">Name A-Z</SelectItem>
              <SelectItem value="Name Z-A">Name Z-A</SelectItem>
              <SelectItem value="Difficulty Asc">Easiest First</SelectItem>
              <SelectItem value="Difficulty Desc">Hardest First</SelectItem>
              <SelectItem value="Upcoming Trails">Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center">
          <Checkbox id="showPast" checked={showPast} onCheckedChange={() => setShowPast((v) => !v)} />
          <label htmlFor="showPast" className="ml-2 text-sm text-[var(--secondary)]">Show past trails</label>
        </div>
      </div>

      {/* Responsive Grid für TrailCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTrails && sortedTrails.map((trail, idx) => (
          <TrailCard key={trail.id} trail={trail} imageId={idx + 1} />
        ))}
      </div>
    </main>
  );
}
