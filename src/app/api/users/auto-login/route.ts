import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ILoginData } from "@/models";

export async function POST(req: Request) {

    try {
        const {userToken} = await req.json();
       const {username , password} =  jwt.decode(userToken) as ILoginData;

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

        return NextResponse.json({ data: {isLoggedIn : true} }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}