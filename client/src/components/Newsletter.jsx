import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Newsletter() {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubscribe(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const subscription = Object.fromEntries(new FormData(form));
      const response = await apiRequest("newsletter", subscription);
      setStatusMessage(response.message);
      form.reset();
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="newsletter">
      <h2>Get New Listings First</h2>
      <p>
        Subscribe and be the first to know when fresh cars arrive
        <br />
        in our inventory.
      </p>
      <form onSubmit={handleSubscribe}>
        <input
          name="email"
          type="email"
          aria-label="Email address"
          placeholder="Enter your email address"
          required
          maxLength={254}
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <p role="status">{statusMessage}</p>
    </section>
  );
}
