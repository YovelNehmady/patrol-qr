import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ILoginData } from "@/models";

export async function POST(req: Request) {
    const JWT_SECRET = process.env.JWT_SECRET!;

    try {
        // Fetch documents from a collection

        const data: ILoginData = await req.json();
        const { username, password } = data;

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection(process.env.DB_USERS_COLLECTION!);

        // Fetch the user by username
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign(
            { username: user.username, password: password },
            JWT_SECRET
        );
        return NextResponse.json({ data: token }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}