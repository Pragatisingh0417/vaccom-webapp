import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, email, items, amount } = body;

    if (!email || !items || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Compose the email content
    const emailContent = `
      <h2>⚠️ Payment Failed</h2>
      <p>Your order (ID: ${orderId}) could not be processed due to a failed payment.</p>
      <h3>Order Details:</h3>
      <ul>
        ${items
          .map(
            (item: any) =>
              `<li>${item.name} - $${item.price.toFixed(2)} x ${item.qty}</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total Attempted Amount:</strong> $${amount.toFixed(2)}</p>
      <p>Please try placing the order again or contact support if the issue persists.</p>
    `;

    // Send email using your preferred email service
    // Example: using Nodemailer or SendGrid
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "⚠️ Your Payment Failed",
        html: emailContent,
      }),
    });

    return NextResponse.json({ success: true, message: "Failed order email sent" });
  } catch (err: any) {
    console.error("Failed order email error:", err);
    return NextResponse.json(
      { error: "Failed to send failed order email" },
      { status: 500 }
    );
  }
}
