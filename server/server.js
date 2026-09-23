import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import vehicleRoutes from "./routes/vehicles.js";
import enquiryRoutes from "./routes/enquiry.js";
import partExchangeRoutes from "./routes/partExchange.js";
import newsletterRoutes from "./routes/newsletter.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (request, response) => response.json({ status: "ok" }));
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/part-exchange", partExchangeRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api", (request, response) =>
  response.status(404).json({ error: "Not found." }),
);

// Serve the React production build, including direct visits to page URLs.
app.use(
  express.static(fileURLToPath(new URL("../client/dist/", import.meta.url))),
);
app.get("/{*path}", (request, response) => {
  response.sendFile(
    fileURLToPath(new URL("../client/dist/index.html", import.meta.url)),
  );
});

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(error.status || 500).json({
    error:
      error.status === 400
        ? "Invalid request."
        : "Unable to complete your request. Please try again.",
  });
});

try {
  if (!process.env.MONGODB_URI)
    throw new Error("Set MONGODB_URI in the root .env file.");
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
