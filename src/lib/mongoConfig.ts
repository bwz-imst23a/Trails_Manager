import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'trails_app';

export async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(MONGODB_URI, {
            // Add connection options for Docker
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
        await client.connect();
        console.log('Connected to MongoDB');
    }

    if (!db) {
        db = client.db(DB_NAME);
    }

    return { client, db };
}

export async function getDatabase() {
    if (!db) {
        await connectToDatabase();
    }
    return db;
}

// Add graceful shutdown for Docker
process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    }
});

process.on('SIGTERM', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    }
});