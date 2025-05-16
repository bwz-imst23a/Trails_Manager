import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Trail } from "@/types/trails";

export async function addTrail(trail: Trail): Promise<{ id: string; data: Trail } | null> {
  throw new Error("Function not implemented.");
  try {
    const trailRef = await addDoc(collection(db, "trails"), trail);
    return { id: trailRef.id, data: trail };
  } catch (error) {
    console.error("Error adding trail: ", error);
    return null;
  }
}

export async function getTrails(): Promise<Array<Trail> | null> {
  try {
    const trailsSnapshot = await getDocs(collection(db, "trails"));

    const trails = trailsSnapshot.docs.map(doc => (doc.data() as Trail));

    return trails;
  } catch (error) {
    console.error("Error getting trails: ", error);
    return null;
  }
}