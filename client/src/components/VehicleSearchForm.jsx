import React from "react";
import { Search } from "lucide-react";
import { formatCurrency } from "../helpers";
export default function VehicleSearchForm({
  filters,
  onFilterChange,
  onSearch,
}) {
  const hasInvalidPriceRange = Boolean(
    filters.min && filters.max && Number(filters.min) > Number(filters.max),
  );

  return (
    <form className="search-panel" onSubmit={onSearch}>
      <div className="panel-title">Search vehicles</div>
      <div className="form-grid">
        {[
          ["make", "Make", ["Volkswagen"], "Any Make"],
          ["model", "Model", filters.make ? ["Golf"] : [], "Any Model"],
          ["min", "Min price", ["5000", "10000", "15000"], "No Min"],
          ["max", "Max price", ["5000", "10000", "15000", "20000"], "No Max"],
        ].map(([key, label, options, placeholder]) => (
          <label key={key}>
            {label}
            <select
              value={filters[key] || ""}
              onChange={(event) => {
                onFilterChange(key, event.target.value);
                if (key === "make") onFilterChange("model", "");
              }}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {["min", "max"].includes(key)
                    ? formatCurrency(option)
                    : option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {hasInvalidPriceRange ? (
        <p className="error">Minimum price must be lower than maximum price.</p>
      ) : null}
      <button className="primary full" disabled={hasInvalidPriceRange}>
        <Search size={20} />
        Search Cars
      </button>
    </form>
  );
}
