import mongoose from "mongoose";

export const Vehicle = mongoose.model(
  "Vehicle",
  new mongoose.Schema(
    {
      id: { type: String, unique: true },
      make: String,
      model: String,
      year: Number,
      price: Number,
      mileage: Number,
      fuel: String,
      gearbox: String,
      body: String,
      drive: String,
      seats: Number,
      lifestyle: [String],
      requirements: [String],
      image: String,
      location: String,
      available: Boolean,
      demo: Boolean,
    },
    { timestamps: true },
  ),
);
