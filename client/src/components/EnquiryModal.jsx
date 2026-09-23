import React, { useEffect, useRef, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { formatCurrency } from "../helpers";
import EnquiryForm from "./EnquiryForm";

export default function EnquiryModal({ modal, close }) {
  const dialogRef = useRef(null);
  const [showForm, setShowForm] = useState(modal.type !== "vehicle");
  const { vehicle } = modal;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) close();
  }

  let title = "Get a quote";
  if (modal.type === "part-exchange") {
    title = "Your part-exchange request";
  } else if (vehicle) {
    title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={close}
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
    >
      <button className="close" onClick={close} aria-label="Close dialog">
        <X />
      </button>
      <h2 id="modal-title">{title}</h2>
      {vehicle && (
        <>
          <img
            className="detail-image"
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.model}`}
          />
          <div className="section-heading">
            <h2>{formatCurrency(vehicle.price)}</h2>
            <span>
              {vehicle.mileage.toLocaleString()} miles · {vehicle.fuel}
            </span>
          </div>
          <p>
            {vehicle.gearbox} · {vehicle.body} · {vehicle.seats} seats ·{" "}
            {vehicle.drive}
          </p>
        </>
      )}
      {showForm ? (
        <EnquiryForm enquiryType={modal.type} vehicleId={vehicle?.id} />
      ) : (
        <button className="primary full" onClick={() => setShowForm(true)}>
          Enquire about this car <ChevronRight size={18} />
        </button>
      )}
    </dialog>
  );
}
