import { Router } from "express";
import { Submission } from "../models/Submission.js";
import { validateContactDetails } from "../validators/submissionValidator.js";

const router = Router();

router.post("/", async (request, response) => {
  const result = validateContactDetails(request.body || {});

  if (result.error) {
    return response.status(400).json({ error: result.error });
  }

  await Submission.create({ type: "enquiry", ...result.data });

  response.status(201).json({
    message: "Thank you. Your request has been saved for the team.",
  });
});

export default router;
