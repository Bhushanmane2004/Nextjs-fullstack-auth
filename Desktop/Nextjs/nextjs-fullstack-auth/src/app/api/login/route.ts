import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log("Received login request for:", email);

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User Not Found. Please Sign Up." },
                { status: 400 }
            );
        }
        console.log("User exists:", user.username);

        // Validate password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        // Create JWT token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET environment variable is not set.");
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });

        // Prepare response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
            },
        });

        // Set cookie with token
        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 day in seconds
        });

        return response;
    } catch (error: any) {
        console.error("Error during login:", error.message);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
