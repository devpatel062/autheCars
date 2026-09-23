import React from "react";

export default function PartExchangePage({ page, onEnquire }) {
  return (
    <section className="hero exchange-hero">
      <h1>
        {page === "/part-exchange" ? "Part Exchange Your" : "Sell Your"}
        <br />
        <em>Car Today</em>
      </h1>
      <p>
        {page === "/part-exchange"
          ? "Looking to trade in your vehicle? We can help you estimate its part-exchange value toward your next purchase."
          : "Tell us about your vehicle and our team will get in touch to discuss a valuation."}
      </p>
      <div className="exchange-card">
        <div className="panel-title">
          Vehicle {page === "/part-exchange" ? "part exchange" : "valuation"}
        </div>
        <img
          src="/images/exchange.png"
          alt="Car with a wrench and exchange arrows"
        />
        <button className="primary full" onClick={() => onEnquire()}>
          {page === "/part-exchange"
            ? "Get Your Part Exchange"
            : "Get Your Valuation"}
        </button>
      </div>
    </section>
  );
}
