import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Trail } from "@/types/trails";

export async function addTrail(trail: Trail): Promise<{ id: string; data: Trail } | null> {
    try {
        const trailRef = await addDoc(collection(db, "trails"), trail);
        return { id: trailRef.id, data: trail };
    } catch (error) {
        console.error("Error adding trail: ", error);
        return null;
    }
}