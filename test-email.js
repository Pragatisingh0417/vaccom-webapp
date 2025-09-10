import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env.local

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Must be Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"Vaccom Support" <${process.env.SMTP_USER}>`,
    to: "pragatisingh0417@gmail.com", // Your email to test
    subject: "Test Email",
    text: "Hello! This is a test email from Vaccom.",
  });

  console.log("Email sent successfully!");
}

testEmail().catch(console.error);
