export interface Trail {
  id: string
  name: string
  description: string
  distance: number
  durationMinute: number
  elevationGainMeters: number
  difficulty: "T1" | "T2" | "T3" | "T4" | "T5"
  imageUrl: string
  date: string // ISO date string
}
