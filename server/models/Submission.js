import mongoose from "mongoose";

export const Submission = mongoose.model(
  "Submission",
  new mongoose.Schema(
    {
      type: String,
      email: String,
      name: String,
      phone: String,
      registration: String,
      mileage: String,
      message: String,
      vehicleId: String,
    },
    { timestamps: true },
  ),
);
