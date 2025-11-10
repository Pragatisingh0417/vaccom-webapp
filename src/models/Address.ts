import mongoose, { Schema, models } from "mongoose";

const AddressSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const Address = models.Address || mongoose.model("Address", AddressSchema);
export default Address;
