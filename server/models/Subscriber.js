import mongoose from 'mongoose';

export const Subscriber = mongoose.model(
  'Subscriber',
  new mongoose.Schema(
    { email: { type: String, unique: true, required: true } },
    { timestamps: true },
  ),
);
