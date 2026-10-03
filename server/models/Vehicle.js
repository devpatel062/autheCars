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
      lifestyle: { type: [String], default: [] },
      requirements: { type: [String], default: [] },
      image: String,
      colour: String,
      location: String,
      available: Boolean,
      demo: Boolean,
      mot: Boolean,
      tax: Boolean,
      ulez: Boolean,
      fullHistory: Boolean,
      serviceHistory: Boolean,
    },
    { timestamps: true },
  ),
);
