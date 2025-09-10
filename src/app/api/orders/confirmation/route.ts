import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { orderId, email, items, amount } = await req.json();

    if (!orderId || !email || !items || !amount) {
      console.log("Missing fields in email request:", { orderId, email, items, amount });
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    console.log("Sending confirmation email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Gmail App Password
      },
    });

    const itemsHtml = items
      .map((item: any) => `<li>${item.name} x ${item.qty} - ₹${item.price * item.qty}</li>`)
      .join("");

    await transporter.sendMail({
      from: `"Vaccom Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <p>Hi there,</p>
        <p>Thank you for your order! Your payment was successful.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Items:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> ₹${amount}</p>
        <p>We will notify you when your order is shipped.</p>
        <p>Thanks for shopping with us!</p>
      `,
    });

    console.log("Confirmation email sent successfully to:", email);
    return NextResponse.json({ message: "Confirmation email sent" });
  } catch (err: any) {
    console.error("Error sending confirmation email:", err.message);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
