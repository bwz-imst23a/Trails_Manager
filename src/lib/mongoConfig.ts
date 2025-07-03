import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'trails_app';

export async function connectToDatabase() {
    try {
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
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
export async function getDatabase() {
    if (!db) {
        await connectToDatabase();
        // Add graceful shutdown for Docker
        async function gracefulShutdown(signal: string) {
            console.log(`Received ${signal}, closing MongoDB connection...`);
            if (client) {
                try {
                    await client.close();
                    console.log('MongoDB connection closed.');
                } catch (error) {
                    console.error('Error closing MongoDB connection:', error);
                }
            }
            process.exit(0);
        }

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    }
    return db;
}