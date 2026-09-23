const filterGroups = [
  [
    "fuel",
    "Fuel type",
    [
      "Petrol",
      "Diesel",
      "Electric",
      "Hybrid",
      "Mild Hybrid",
      "Plug Hybrid",
      "LPG",
    ],
  ],
  ["gearbox", "Gear box", ["Manual", "Automatic", "Semi Automatic", "CVT"]],
  [
    "body",
    "Body style",
    ["Hatchback", "Saloon", "Estate", "SUV", "Coupe", "Convertible", "Pickup"],
  ],
  ["drive", "Drive train", ["FWD", "RWD", "AWD", "4 WD / 4X4"]],
  [
    "budget",
    "Budget & running costs",
    ["Under £5,000", "£5,000 - £10,000", "£10,000 - £15,000", "£20,000+"],
  ],
  [
    "requirement",
    "Special requirements",
    [
      "Low Mileage",
      "1 Previous Owner",
      "Full Service History",
      "Zero Emissions",
      "Long Range (EV 250 km)",
      "Rapid Charge Support",
    ],
  ],
];

const budgetRanges = {
  "Under £5,000": ["", "5000"],
  "£5,000 - £10,000": ["5000", "10000"],
  "£10,000 - £15,000": ["10000", "15000"],
  "£20,000+": ["20000", ""],
};

import React from "react";

export default function NeedsFilters({ filters, setFilters }) {
  function toggleFilter(key, value) {
    const isSelected = filters[key] === value;
    if (key === "budget") {
      const [min, max] = isSelected ? ["", ""] : budgetRanges[value];
      setFilters((current) => ({
        ...current,
        budget: isSelected ? "" : value,
        min,
        max,
      }));
      return;
    }
    setFilters((current) => ({ ...current, [key]: isSelected ? "" : value }));
  }
  return (
    <div className="need-filters">
      {filterGroups.map(([key, label, options]) => (
        <fieldset key={key}>
          <legend>{label}</legend>
          <div>
            {options.map((option) => (
              <button
                key={option}
                aria-pressed={filters[key] === option}
                className={filters[key] === option ? "selected" : ""}
                onClick={() => toggleFilter(key, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      <button className="text-button" onClick={() => setFilters({})}>
        Clear filters
      </button>
    </div>
  );
}
