import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
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

export async function getTrails(): Promise<Array<Trail> | null> {
  try {
    const trailsSnapshot = await getDocs(collection(db, "trails"));

    const trails = trailsSnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID
      ...doc.data() as Trail // Spread the document data
    }));

    return trails;
  } catch (error) {
    console.error("Error getting trails: ", error);
    return null;
  }
}

export async function getTrail(id: string): Promise<Trail | null> {
  try {
    const trailDoc = await getDoc(doc(db, "trails", id));

    if (!trailDoc.exists()) {
      console.error("Trail not found with ID:", id);
      return null;
    }

    return trailDoc.data() as Trail;
  } catch (error) {
    console.error("Error fetching trail:", error);
    return null;
  }
}