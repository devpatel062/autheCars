import React from "react";
import ContactBar from "./ContactBar";

const QUICK_LINKS = [
  { label: "Home", destination: "/" },
  { label: "Browse Inventory", destination: "/used-cars" },
  { label: "About Us", destination: "/#about" },
  { label: "Contact Us", destination: "/#contact" },
];
const INVENTORY_LINKS = [
  { label: "Electric Cars", filters: { fuel: "Electric" } },
  { label: "Hybrid Cars", filters: { fuel: "Hybrid" } },
  { label: "SUVs", filters: { body: "SUV" } },
  { label: "Family Cars", filters: { lifestyle: "Family Cars" } },
  { label: "Under £5,000", filters: { max: 5000 } },
];

export default function Footer({ navigate, setApplied }) {
  function followLink(event, destination) {
    event.preventDefault();
    navigate(destination);
  }

  function browseCategory(event, filters) {
    setApplied(filters);
    followLink(event, "/used-cars");
  }

  return (
    <footer>
      <div className="footer-inner">
        <div>
          <a
            href="/"
            onClick={(event) => followLink(event, "/")}
            className="footer-brand"
          >
            AUTHE <span>CARS</span>
          </a>
          <p>
            Quality used vehicles for everyday
            <br />
            people across Scotland.
            <br />
            Honest pricing, zero pressure.
          </p>
        </div>
        <div>
          <h3>Quick links</h3>
          {QUICK_LINKS.map(({ label, destination }) => (
            <a
              href={destination}
              key={label}
              onClick={(event) => followLink(event, destination)}
            >
              {label}
            </a>
          ))}
        </div>
        <div>
          <h3>Inventory</h3>
          {INVENTORY_LINKS.map(({ label, filters }) => (
            <a
              href="/used-cars"
              key={label}
              onClick={(event) => browseCategory(event, filters)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <ContactBar />
    </footer>
  );
}
