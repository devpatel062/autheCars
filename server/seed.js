import dotenv from "dotenv";
import mongoose from "mongoose";
import { Vehicle } from "./models/Vehicle.js";
dotenv.config({ path: new URL("../.env", import.meta.url) });

const sampleVehicles = [
  {
    id: "golf-2020",
    make: "Volkswagen",
    model: "Golf",
    year: 2020,
    price: 12000,
    mileage: 10000,
    fuel: "Petrol",
    gearbox: "Automatic",
    body: "Hatchback",
    drive: "FWD",
    seats: 4,
    lifestyle: ["Family Cars", "City Commuter", "Business & Commuter"],
    requirements: ["Low Mileage", "1 Previous Owner", "Full Service History"],
  },
  {
    id: "golf-2019",
    make: "Volkswagen",
    model: "Golf",
    year: 2019,
    price: 10500,
    mileage: 24000,
    fuel: "Diesel",
    gearbox: "Manual",
    body: "Hatchback",
    drive: "FWD",
    seats: 5,
    lifestyle: ["Family Cars", "Business & Commuter"],
    requirements: ["Full Service History"],
  },
  {
    id: "golf-2021",
    make: "Volkswagen",
    model: "Golf",
    year: 2021,
    price: 14950,
    mileage: 18000,
    fuel: "Petrol",
    gearbox: "Automatic",
    body: "Hatchback",
    drive: "FWD",
    seats: 5,
    lifestyle: ["Weekend Driver", "City Commuter"],
    requirements: ["Low Mileage", "1 Previous Owner"],
  },
  {
    id: "golf-2018",
    make: "Volkswagen",
    model: "Golf",
    year: 2018,
    price: 8995,
    mileage: 41000,
    fuel: "Diesel",
    gearbox: "Manual",
    body: "Hatchback",
    drive: "FWD",
    seats: 5,
    lifestyle: ["Family Cars", "City Commuter"],
    requirements: ["Full Service History"],
  },
].map((vehicle) => ({
  ...vehicle,
  image: "/images/golf.png",
  location: "Perth",
  available: true,
  demo: true,
}));

await mongoose.connect(process.env.MONGODB_URI);
try {
  for (const vehicle of sampleVehicles) {
    await Vehicle.updateOne(
      { id: vehicle.id },
      { $setOnInsert: vehicle },
      { upsert: true },
    );
  }
  console.log("Sample vehicles added. Existing vehicles were not changed.");
} finally {
  await mongoose.disconnect();
}
