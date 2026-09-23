import { Router } from "express";
import { Subscriber } from "../models/Subscriber.js";
import { validateEmail } from "../validators/submissionValidator.js";

const router = Router();

router.post("/", async (request, response) => {
  const result = validateEmail(request.body?.email);

  if (result.error) {
    return response.status(400).json({ error: result.error });
  }

  await Subscriber.updateOne(
    { email: result.email },
    { $setOnInsert: { email: result.email } },
    { upsert: true },
  );

  response.status(201).json({
    message: "You’re subscribed to new listings.",
  });
});

export default router;
