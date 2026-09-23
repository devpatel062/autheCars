import React, { useEffect, useState } from "react";
import { apiRequest } from "./api";
import ContactBar from "./components/ContactBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import VehicleSearchForm from "./components/VehicleSearchForm";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import PartExchangePage from "./pages/PartExchangePage";
import WarrantyPage from "./pages/WarrantyPage";
import { matchesVehicleFilters } from "./helpers";

export default function App() {
  const [page, setPage] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handlePopState() {
      setPage(window.location.pathname);
      setIsMenuOpen(false);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(destination) {
    const [pathname, sectionId] = destination.split("#");
    window.history.pushState({}, "", destination);
    setPage(pathname || "/");
    setIsMenuOpen(false);

    if (sectionId) {
      // Wait for the destination page to mount before scrolling to its section.
      window.setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadInventory() {
      try {
        const data = await apiRequest("vehicles");
        if (isActive) {
          setVehicles(data.vehicles);
        }
      } catch (error) {
        if (isActive) setError(error.message);
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadInventory();
    return () => {
      isActive = false;
    };
  }, []);

  const inventory = { vehicles, isLoading, error };
  const [modal, setModal] = useState(null);
  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [activeTab, setActiveTab] = useState("lifestyle");
  const [selectedLifestyle, setSelectedLifestyle] = useState("");

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function searchVehicles(event) {
    event?.preventDefault();
    const includeLifestyle =
      page === "/" && activeTab === "lifestyle" && selectedLifestyle;
    setAppliedFilters(
      includeLifestyle ? { ...filters, lifestyle: selectedLifestyle } : filters,
    );
    navigate("/used-cars");
  }

  function resetFilters() {
    setAppliedFilters({});
    setFilters({});
  }

  function viewAllVehicles() {
    setAppliedFilters({});
    navigate("/used-cars");
  }

  function selectVehicle(vehicle) {
    setModal({ type: "vehicle", vehicle });
  }

  function openEnquiry() {
    setModal({ type: "enquiry" });
  }

  const searchForm = (
    <VehicleSearchForm
      filters={filters}
      onFilterChange={updateFilter}
      onSearch={searchVehicles}
    />
  );

  function renderPage() {
    switch (page) {
      case "/":
        return (
          <HomePage
            searchForm={searchForm}
            inventory={inventory}
            navigate={navigate}
            onViewAll={viewAllVehicles}
            onSelectVehicle={selectVehicle}
            browsing={{
              tab: activeTab,
              setTab: setActiveTab,
              selected: selectedLifestyle,
              setSelected: setSelectedLifestyle,
              filters,
              setFilters,
              onSearch: searchVehicles,
            }}
          />
        );
      case "/used-cars":
      case "/special-offers":
        return (
          <InventoryPage
            page={page}
            searchForm={searchForm}
            results={inventory.vehicles.filter((vehicle) =>
              matchesVehicleFilters(vehicle, appliedFilters),
            )}
            demo={vehicles.some((vehicle) => vehicle.demo)}
            error={inventory.error}
            loading={inventory.isLoading}
            onReset={resetFilters}
            onSelectVehicle={selectVehicle}
          />
        );
      case "/part-exchange":
      case "/sell-your-car":
        return (
          <PartExchangePage
            page={page}
            onEnquire={() => setModal({ type: "part-exchange" })}
          />
        );
      case "/warranty":
        return <WarrantyPage onEnquire={openEnquiry} />;
      default:
        return (
          <main className="section">
            <h1>Page not found</h1>
            <button className="primary" onClick={() => navigate("/")}>
              Back to home
            </button>
          </main>
        );
    }
  }

  return (
    <>
      <ContactBar />
      <Header
        page={page}
        menu={isMenuOpen}
        setMenu={setIsMenuOpen}
        navigate={navigate}
        onEnquire={openEnquiry}
      />
      {renderPage()}
      <Footer navigate={navigate} setApplied={setAppliedFilters} />
      {modal && <EnquiryModal modal={modal} close={() => setModal(null)} />}
    </>
  );
}
