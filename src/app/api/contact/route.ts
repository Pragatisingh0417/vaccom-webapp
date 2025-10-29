import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  number: string;
  location: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, number, location, message }: ContactFormData = await req.json();

    if (!name || !email || !number || !location || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Configure your mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your Gmail app password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: "your_email@example.com", // your receiving email
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${number}
        Location: ${location}
        Message: ${message}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "✅ Email sent successfully!",
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
