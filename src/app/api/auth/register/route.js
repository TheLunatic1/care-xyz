import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const { nid, name, email, contact, password } = await request.json();

    // Required fields check
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { nid }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or NID already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      nid,
      name,
      email: email.toLowerCase(),
      contact,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}