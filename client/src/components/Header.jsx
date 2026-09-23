import React from "react";
import { Menu, X } from "lucide-react";
export default function Header({ page, menu, setMenu, navigate, onEnquire }) {
  return (
    <header>
      <a
        className="brand"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          navigate("/");
        }}
      >
        <img src="/images/logo.png" alt="Authe Cars" />
      </a>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menu}
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
      <nav className={menu ? "open" : ""}>
        {[
          ["Home", "/"],
          ["Used Cars", "/used-cars"],
          ["Part Exchange", "/part-exchange"],
          ["Sell your cars", "/sell-your-car"],
          ["Special Offers", "/special-offers"],
          ["Warranty", "/warranty"],
        ].map(([label, url]) => (
          <a
            className={page === url ? "active" : ""}
            href={url}
            key={url}
            onClick={(event) => {
              event.preventDefault();
              navigate(url);
            }}
          >
            {label}
          </a>
        ))}
        <button className="primary quote" onClick={() => onEnquire()}>
          Get a Quote
        </button>
      </nav>
    </header>
  );
}
