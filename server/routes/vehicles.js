import { Router } from "express";
import { Vehicle } from "../models/Vehicle.js";

const router = Router();

router.get("/", async (request, response) => {
  const filters = request.query;
  const query = { available: true };

  for (const field of [
    "make",
    "model",
    "fuel",
    "gearbox",
    "body",
    "drive",
    "lifestyle",
  ]) {
    if (typeof filters[field] === "string" && filters[field])
      query[field] = filters[field];
  }
  if (typeof filters.requirement === "string" && filters.requirement) {
    query.requirements = filters.requirement;
  }

  for (const field of ["min", "max"]) {
    if (!filters[field]) continue;
    const price = Number(filters[field]);
    if (!Number.isFinite(price) || price < 0) {
      return response
        .status(400)
        .json({ error: "Price filters must be positive numbers." });
    }
    query.price = {
      ...query.price,
      [field === "min" ? "$gte" : "$lte"]: price,
    };
  }

  const vehicles = await Vehicle.find(query).lean();
  response.json({ vehicles });
});

export default router;
