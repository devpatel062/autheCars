import React from "react";
import { MapPin, Gauge, ArrowRight } from "lucide-react";
import { formatCurrency } from "../helpers";
export default function VehicleCard({ vehicle, onSelect }) {
  return (
    <article className="car-card" key={vehicle.id}>
      <div className="car-photo">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
        />
        <span className="available">● Available</span>
      </div>
      <div className="car-info">
        <h3>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <div className="muted small location">
          <MapPin />
          {vehicle.location}
          <span>{vehicle.body}</span>
        </div>
        <div className="muted small">
          <Gauge />
          {vehicle.mileage.toLocaleString()} miles
        </div>
        <div className="specs">
          {[
            vehicle.fuel,
            vehicle.gearbox,
            `${vehicle.seats}-Seater`,
            vehicle.drive,
          ].map((specification) => (
            <span key={specification}>{specification}</span>
          ))}
        </div>
        <p className="price">
          {formatCurrency(vehicle.price)} <small>negotiable</small>
        </p>
        <button className="outline full" onClick={() => onSelect(vehicle)}>
          View car <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
