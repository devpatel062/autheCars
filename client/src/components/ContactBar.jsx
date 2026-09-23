import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
export default function ContactBar({}) {
  return (
    <div className="contact-bar">
      <span>
        <MapPin />
        Yard D, 8 Shore Road. Perth PH2 8BW, Scotland
      </span>
      <a href="tel:07570518789">
        <Phone />
        07570518789
      </a>
      <a href="mailto:admin@authecars.com">
        <Mail />
        admin@authecars.com
      </a>
      <span>
        <Clock />
        Mon - Sun: 10:00 - 19:00
      </span>
    </div>
  );
}
