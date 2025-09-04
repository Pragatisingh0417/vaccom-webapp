// src/createSuperAdmin.js
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // adjust if your Admin.js is elsewhere
const dotenv = require("dotenv");

// explicitly resolve the path to your .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in your .env.local");
  process.exit(1);
}

async function createSuperAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const existing = await Admin.findOne({ role: "superadmin" });
    if (existing) {
      console.log("Superadmin already exists:", existing.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("superadmin123", 10);

    const admin = new Admin({
      name: "Super Admin",
      email: "superadmin@vaccom.com",
      password: hashedPassword,
      role: "superadmin",
    });

    await admin.save();
    console.log("Superadmin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating superadmin:", err);
    process.exit(1);
  }
}

createSuperAdmin();
