import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function POST(req: Request) {
    try {
        const patrolData = await req.json(); // Parse the incoming JSON body
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.DB_PATROLS_COLLECTION!);

        // Insert the new patrol into the collection
        const result = await collection.insertOne({
            ...patrolData,
            createdAt: new Date(), // Add a timestamp
        });

        return NextResponse.json(
            { message: "Patrol added successfully", insertedId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        throw new Error(`cant save the patrol ${error}`);
    }
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Fetch documents from a collection
    const collection = await db.collection(process.env.DB_PATROLS_COLLECTION!).find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(
        { data: collection },
        { status: 200 }
    );
}