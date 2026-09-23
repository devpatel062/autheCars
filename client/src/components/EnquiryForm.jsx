import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { apiRequest } from "../api";

const CONTACT_FIELDS = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email address", type: "email" },
  { name: "phone", label: "Phone number", type: "tel" },
];
const VEHICLE_FIELDS = [
  { name: "registration", label: "Vehicle registration", type: "text" },
  { name: "mileage", label: "Current mileage", type: "number" },
];

export default function EnquiryForm({ enquiryType, vehicleId = "" }) {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isPartExchange = enquiryType === "part-exchange";
  const fields = isPartExchange
    ? [...CONTACT_FIELDS, ...VEHICLE_FIELDS]
    : CONTACT_FIELDS;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const endpoint = isPartExchange ? "part-exchange" : "enquiry";
      const response = await apiRequest(endpoint, { ...formData, vehicleId });
      setStatusMessage(response.message);
      setIsSubmitted(true);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <p className="success" role="status">
        {statusMessage}
      </p>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        {fields.map(({ name, label, type }) => (
          <label key={name}>
            {label}
            <input
              required
              name={name}
              type={type}
              min={type === "number" ? 0 : undefined}
              max={type === "number" ? 9999999 : undefined}
              maxLength={name === "email" ? 254 : 100}
            />
          </label>
        ))}
      </div>
      <label>
        Message
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="How can we help?"
        />
      </label>
      <label className="consent">
        <input required type="checkbox" />I agree to be contacted about this
        request.
      </label>
      <button className="primary full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit request"}
        <ArrowRight size={18} />
      </button>
      {statusMessage && (
        <p className="error" role="alert">
          {statusMessage}
        </p>
      )}
    </form>
  );
}
