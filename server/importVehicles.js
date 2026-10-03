import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "node:url";
import { Vehicle } from "./models/Vehicle.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const vehicles = [
  {
    id: "nissan-micra-acenta-cvt-2013",
    make: "Nissan",
    model: "Micra Acenta CVT",
    year: 2013,
    colour: "Grey",
    mileage: 84562,
    gearbox: "CVT",
    imagePath: "../data/Image from iOS.jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
  },
  {
    id: "honda-jazz-se-cvt-2006",
    make: "Honda",
    model: "Jazz SE CVT",
    year: 2006,
    colour: "Silver",
    mileage: 77408,
    gearbox: "CVT",
    imagePath: "../data/Image from iOS (1).jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
    serviceHistory: true,
  },
  {
    id: "nissan-note-tekna-auto-2008",
    make: "Nissan",
    model: "Note Tekna Auto",
    year: 2008,
    colour: "Black",
    mileage: 93886,
    gearbox: "Automatic",
    imagePath: "../data/Image from iOS (2).jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
  },
  {
    id: "nissan-note-n-tec-auto-2010",
    make: "Nissan",
    model: "Note N-Tec Auto",
    year: 2010,
    colour: "Beige",
    mileage: 115657,
    gearbox: "Automatic",
    imagePath: "../data/Image from iOS (3).jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
  },
  {
    id: "toyota-auris-tr-valvematic-s-a-2010",
    make: "Toyota",
    model: "Auris TR Valvematic S-A",
    year: 2010,
    colour: "Silver",
    mileage: 114802,
    gearbox: "Automatic",
    imagePath: "../data/Image from iOS (4).jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
    serviceHistory: true,
  },
  {
    id: "honda-jazz-i-vtec-ex-cvt-2011",
    make: "Honda",
    model: "Jazz I-VTEC EX CVT",
    year: 2011,
    colour: "Black",
    mileage: 126175,
    gearbox: "CVT",
    imagePath: "../data/Image from iOS (5).jpg",
    mot: true,
    tax: true,
    ulez: true,
    fullHistory: true,
  },
];

const requiredEnvironment = [
  "MONGODB_URI",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missingEnvironment = requiredEnvironment.filter(
  (name) => !process.env[name],
);

if (missingEnvironment.length) {
  throw new Error(
    `Missing environment variables: ${missingEnvironment.join(", ")}`,
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

await mongoose.connect(process.env.MONGODB_URI);

try {
  for (const vehicle of vehicles) {
    const image = await cloudinary.uploader.upload(
      fileURLToPath(new URL(vehicle.imagePath, import.meta.url)),
      {
        folder: "authe-cars/vehicles",
        public_id: vehicle.id,
        overwrite: true,
        resource_type: "image",
      },
    );

    await Vehicle.updateOne(
      { id: vehicle.id },
      {
        $set: {
          ...vehicle,
          image: image.secure_url,
          available: true,
          demo: false,
        },
        $unset: { imagePath: 1 },
      },
      { upsert: true },
    );
    console.log(`Imported ${vehicle.id}`);
  }
} finally {
  await mongoose.disconnect();
}
