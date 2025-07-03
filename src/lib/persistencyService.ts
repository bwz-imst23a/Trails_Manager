import { ObjectId } from "mongodb";
import { getDatabase } from "./mongoConfig";
import { Trail } from "@/types/trails";

const COLLECTION_NAME = "trails";

// Helper function to map MongoDB document to Trail object
function mapDocumentToTrail(doc: { _id: ObjectId;[key: string]: unknown }): Trail {
  return {
    id: doc._id.toString(),
    name: doc.name as string,
    description: doc.description as string,
    distanceKm: doc.distanceKm as number,
    durationMinutes: doc.durationMinutes as number,
    elevationGainMeters: doc.elevationGainMeters as number,
    difficulty: doc.difficulty as 'T1' | 'T2' | 'T3' | 'T4' | 'T5',
    imageUrl: doc.imageUrl as string,
    date: doc.date as string,
    time: doc.time as string
  };
}

export async function addTrail(trail: Trail): Promise<{ id: string; data: Trail } | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Remove id from trail data if it exists, as MongoDB will generate one
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...trailData } = trail;

    const result = await collection.insertOne(trailData);
    return { id: result.insertedId.toString(), data: trail };
  } catch (error) {
    console.error("Error adding trail: ", error);
    return null;
  }
}

export async function getTrails(): Promise<Array<Trail> | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    const trails = await collection.find({}).toArray();

    return trails.map(mapDocumentToTrail);
  } catch (error) {
    console.error("Error getting trails: ", error);
    return null;
  }
}

export async function getTrail(id: string): Promise<Trail | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    if (!ObjectId.isValid(id)) {
      console.error("Invalid ObjectId format:", id);
      return null;
    }

    const trail = await collection.findOne({ _id: new ObjectId(id) });

    if (!trail) {
      console.error("Trail not found with ID:", id);
      return null;
    }

    return mapDocumentToTrail(trail);
  } catch (error) {
    console.error("Error fetching trail:", error);
    return null;
  }
}

export async function updateTrail(id: string, trail: Trail): Promise<{ id: string; updatedTrail: Trail } | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    if (!ObjectId.isValid(id)) {
      console.error("Invalid ObjectId format:", id);
      return null;
    }

    // Remove id from trail data for update
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = trail;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.error("Trail not found for update with ID:", id);
      return null;
    }

    const updatedTrail = await getTrail(id);

    if (!updatedTrail) {
      console.error("Updated trail not found with ID:", id);
      return null;
    }

    return { id, updatedTrail };
  } catch (error) {
    console.error("Error updating trail:", error);
    return null;
  }
}

export async function deleteTrail(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    if (!ObjectId.isValid(id)) {
      console.error("Invalid ObjectId format:", id);
      return;
    }

    await collection.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Error deleting trail:", error);
  }
}