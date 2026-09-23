import React from "react";
import VehicleCard from "../components/VehicleCard";
export default function InventoryPage({
  page,
  searchForm,
  results,
  demo,
  error,
  loading,
  onReset,
  onSelectVehicle,
}) {
  const visibleVehicles = results.filter(
    (vehicle) => page !== "/special-offers" || vehicle.price < 11000,
  );
  return (
    <main className="section listing">
      <div className="eyebrow">Find your next car</div>
      <h1>{page === "/special-offers" ? "Special Offers" : "Our Used Cars"}</h1>
      {page === "/special-offers" && (
        <p>
          Browse our lowest-priced sample vehicles. Contact us to confirm
          current offers.
        </p>
      )}
      {searchForm}
      <div className="section-heading">
        <p>
          {visibleVehicles.length} vehicles found{" "}
          {demo ? "· Sample inventory" : ""}
        </p>
        <button className="text-button" onClick={onReset}>
          Reset all filters
        </button>
      </div>
      {error ? (
        <p role="alert" className="error">
          {error}
        </p>
      ) : loading ? (
        <p role="status">Loading vehicles…</p>
      ) : (
        <div className="car-grid">
          {visibleVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      )}
      {!loading && !error && !visibleVehicles.length && (
        <p className="empty">
          No cars match these filters. Try broadening your search.
        </p>
      )}
    </main>
  );
}
