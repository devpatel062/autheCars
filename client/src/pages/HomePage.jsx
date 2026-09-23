import React from "react";
import {
  Search,
  ArrowRight,
  Heart,
  Settings,
  Users,
  ShieldCheck,
  Check,
  Phone,
  Clock,
} from "lucide-react";
import VehicleCard from "../components/VehicleCard";
import NeedsFilters from "../components/NeedsFilters";
import Newsletter from "../components/Newsletter";

export default function HomePage({
  searchForm,
  inventory,
  browsing,
  navigate,
  onViewAll,
  onSelectVehicle,
}) {
  return (
    <>
      <HeroSection searchForm={searchForm} />
      <FeaturedVehicles
        cars={inventory.vehicles}
        demo={inventory.vehicles.some((vehicle) => vehicle.demo)}
        loading={inventory.isLoading}
        error={inventory.error}
        onViewAll={onViewAll}
        onSelectVehicle={onSelectVehicle}
      />
      <VehicleBrowser
        {...browsing}
        cars={inventory.vehicles}
        loading={inventory.isLoading}
        onSelectVehicle={onSelectVehicle}
      />
      <AboutSection navigate={navigate} />
      <OpeningHours />
      <Newsletter />
    </>
  );
}

function AboutSection({ navigate }) {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <img
          className="about-image"
          src="/images/golf.png"
          alt="Volkswagen Golf in the Authe Cars inventory"
        />
        <div>
          <div className="eyebrow">About us</div>
          <h2>Scotland’s Trusted Used Car Experts</h2>
          <p>
            At Authe Cars, we believe everyone deserves reliable, affordable
            transport. Since our founding, we've helped hundreds of families
            across Scotland find quality vehicles they can trust — no pressure,
            no hidden costs.
          </p>
          <p>
            Every car is personally inspected, HPI checked, and priced fairly.
            We're not just selling cars, we're building lasting relationships in
            our community.
          </p>
          <div className="benefit">
            <ShieldCheck />
            <div>
              <strong>HPI Checked & Inspected</strong>
              <small>
                Every vehicle verified before listing, clean history guaranteed.
              </small>
            </div>
          </div>
          <div className="benefit">
            <Check />
            <div>
              <strong>Transparent Pricing in £</strong>
              <small>
                No hidden fees. Fully DVLA registered. Finance options
                available.
              </small>
            </div>
          </div>
          <div className="actions">
            <button className="primary" onClick={() => navigate("/used-cars")}>
              <Search size={18} />
              Browse Inventory
            </button>
            <a className="green button" href="tel:07570518789">
              <Phone size={18} />
              Call us now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedVehicles({
  cars,
  demo,
  loading,
  error,
  onViewAll,
  onSelectVehicle,
}) {
  return (
    <section className="section inventory">
      <div className="eyebrow">Fresh inventory</div>
      <div className="section-heading">
        <div>
          <h2>Featured Vehicles</h2>
          <p className="muted">
            Hand-picked cars in great condition, priced fairly across the UK.
          </p>
        </div>
        <button className="outline" onClick={onViewAll}>
          View all cars <ArrowRight size={16} />
        </button>
      </div>
      {demo && (
        <p className="demo-note">
          Sample inventory • Vehicles and prices are for demonstration.
        </p>
      )}
      {loading ? (
        <p role="status">Loading vehicles…</p>
      ) : error ? (
        <p role="alert" className="error">
          Unable to load inventory. {error}
        </p>
      ) : (
        <div className="car-grid">
          {cars.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function HeroSection({ searchForm }) {
  return (
    <>
      <section className="hero">
        <div className="trust">● Trusted used car dealership</div>
        <h1>
          Find Your Next
          <br />
          <em>Car Today</em>
        </h1>
        <p>
          Quality used vehicles at prices that work for everyone.
          <br />
          Browse our inventory and drive away happy.
        </p>
        {searchForm}
      </section>
      <div className="stats">
        {[
          ["200 +", "Cars Sold"],
          ["4.5 ★", "Customer Rating"],
          ["2+", "Years in Business"],
          ["100%", "Verified Listings"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function OpeningHours({}) {
  return (
    <section className="section hours" id="contact">
      <div className="eyebrow">Visit us</div>
      <h2>Opening Hours</h2>
      <p className="muted">
        Drop in any time during business hours — we're always happy to help.
      </p>
      <div className="hours-card">
        <div className="hours-title">
          <Clock />
          <div>
            <strong>Business Hours</strong>
            <small>Yard D, 8 Shore Road. Perth PH2 8BW, Scotland</small>
          </div>
        </div>
        <dl>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day}>
              <dt>{day}</dt>
              <dd>● 10:00 - 19:00</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const lifestyles = [
  "Family Cars",
  "City Commuter",
  "Adventure",
  "Business & Commuter",
  "Weekend Driver",
  "Eco Conscious",
  "Towing & Hauling",
];

function VehicleBrowser({
  tab,
  setTab,
  selected,
  setSelected,
  filters,
  setFilters,
  cars,
  loading,
  onSearch,
  onSelectVehicle,
}) {
  const lifestyleCars = cars.filter(
    (vehicle) => !selected || vehicle.lifestyle.includes(selected),
  );
  return (
    <section className="section browsing">
      <div className="eyebrow">Smart browsing</div>
      <div className="section-heading">
        <h2>Find the Right Car For You</h2>
        <button className="primary" onClick={onSearch}>
          <Search size={18} />
          Apply Filters
        </button>
      </div>
      <div className="tabs" role="tablist" aria-label="Browse cars">
        <button
          role="tab"
          aria-selected={tab === "lifestyle"}
          onClick={() => setTab("lifestyle")}
          className={tab === "lifestyle" ? "selected" : ""}
        >
          <Heart />
          Cars by Lifestyle
        </button>
        <button
          role="tab"
          aria-selected={tab === "needs"}
          onClick={() => setTab("needs")}
          className={tab === "needs" ? "selected" : ""}
        >
          <Settings />
          Cars by Needs
        </button>
      </div>
      {tab === "lifestyle" ? (
        <>
          <div className="lifestyles">
            {lifestyles.map((lifestyle) => (
              <button
                aria-pressed={selected === lifestyle}
                className={selected === lifestyle ? "selected" : ""}
                onClick={() =>
                  setSelected(selected === lifestyle ? "" : lifestyle)
                }
                key={lifestyle}
              >
                <Users />
                <span>{lifestyle}</span>
              </button>
            ))}
          </div>
          <p className="result-label">
            Showing results for: <strong>{selected || "All lifestyles"}</strong>
          </p>
          <div className="car-grid three">
            {lifestyleCars.slice(0, 3).map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
          {!loading && !lifestyleCars.length && (
            <div className="empty">
              No vehicles match this lifestyle yet.{" "}
              <button className="text-button" onClick={() => setSelected("")}>
                See all vehicles
              </button>
            </div>
          )}
        </>
      ) : (
        <NeedsFilters filters={filters} setFilters={setFilters} />
      )}
    </section>
  );
}
