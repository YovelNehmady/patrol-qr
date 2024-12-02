import { NextResponse,NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // Fetch documents from a collection
        const collection = await db.collection(process.env.DB_USERS_COLLECTION!).find({}).toArray();

        return NextResponse.json({ data: collection }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
