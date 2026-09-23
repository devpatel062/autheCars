import React from "react";
import { ArrowRight } from "lucide-react";
export default function WarrantyPage({ onEnquire }) {
  return (
    <main className="section warranty">
      <div className="eyebrow">Peace of mind</div>
      <h1>Confidence in your next car.</h1>
      <p>
        Speak to our team about the warranty options available for your chosen
        vehicle. Coverage, duration, exclusions and eligibility will be
        confirmed before purchase.
      </p>
      <button className="primary" onClick={() => onEnquire()}>
        Ask about warranty <ArrowRight size={18} />
      </button>
    </main>
  );
}
