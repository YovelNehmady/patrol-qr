import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {}; // Correct usage of MongoClientOptions

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // Allow global `var` to be set in development mode
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the client across module reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
