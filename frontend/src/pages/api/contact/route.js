import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Contact Form Submission:", data);

    // In a real app, you would save this to a database or send an email
    // For now, we just return success
    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}