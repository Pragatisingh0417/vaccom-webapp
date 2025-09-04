// models/Admin.js
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "product_manager", "order_manager", "marketing_manager"],
      required: true,
    },
  },
  { timestamps: true }
);

// Use existing model if it exists, otherwise create a new one
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = Admin;
