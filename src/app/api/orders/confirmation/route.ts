import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { orderId, email, items, amount } = await req.json();

    console.log("📩 Confirmation request received:", {
      orderId,
      email,
      itemsCount: items?.length,
      amount,
    });

    // Validate required fields
    if (!orderId || !email || !items || !amount) {
      console.warn("⚠️ Missing required fields:", { orderId, email, items, amount });
      return NextResponse.json(
        { success: false, message: "Invalid request - missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build HTML for items
    const itemsHtml = items.length
      ? items
          .map(
            (item: any) =>
              `<li>${item.name} × ${item.qty} — ₹${(item.price * item.qty).toLocaleString("en-IN")}</li>`
          )
          .join("")
      : "<li>No items</li>";

    const mailOptions = {
      from: `"Vaccom Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <p>Hi there,</p>
        <p>Thank you for your order! Your payment was successful.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Items:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> ₹${amount.toLocaleString("en-IN")}</p>
        <p>We will notify you when your order is shipped.</p>
        <p>Thanks for shopping with us!</p>
      `,
    };

    console.log("📤 Sending email to:", email);

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Confirmation email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent",
      messageId: info.messageId,
    });
  } catch (err: any) {
    console.error("❌ Error sending confirmation email:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: err.message || err.toString(),
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}
