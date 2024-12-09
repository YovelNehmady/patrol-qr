import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // Fetch documents from a collection
        const collection = await db.collection(process.env.DB_CODE_COLLECTION!).find({}).toArray();
        return NextResponse.json({ data: collection[0].code }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { code } = await req.json();
        console.log('code',code);
        
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // Fetch documents from a collection
        const collection = await db.collection(process.env.DB_CODE_COLLECTION!).find({}).toArray();
        const idToUpdate = collection[0]._id;
        console.log('idToUpdate',idToUpdate);
        
        const result = await db.collection(process.env.DB_CODE_COLLECTION!).updateOne(
            { _id: idToUpdate }, // Static identifier to target the single document
            {
                $set: { code: code },
            },
            { upsert: true } // Create the document if it doesn't exist
        );
        return NextResponse.json(
            { message: "Code saved successfully", result, code:code },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error saving code:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}