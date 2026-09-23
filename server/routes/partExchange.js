import { Router } from "express";
import { Submission } from "../models/Submission.js";
import {
  validateContactDetails,
  validateVehicleDetails,
} from "../validators/submissionValidator.js";

const router = Router();

router.post("/", async (request, response) => {
  const contactResult = validateContactDetails(request.body || {});

  if (contactResult.error) {
    return response.status(400).json({ error: contactResult.error });
  }

  const vehicleResult = validateVehicleDetails(request.body || {});

  if (vehicleResult.error) {
    return response.status(400).json({ error: vehicleResult.error });
  }

  await Submission.create({
    type: "part-exchange",
    ...contactResult.data,
    ...vehicleResult.data,
  });

  response.status(201).json({
    message: "Thank you. Your request has been saved for the team.",
  });
});

export default router;
