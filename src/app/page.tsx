import AddTrailButton from "@/components/AddTrailButton";

export default function Home() {

  return (
    <main className="p-6">
      <header className="flex justify-between">
        <h1>Rappi Trails</h1>
        <AddTrailButton />
      </header>
    </main>
  );
}
