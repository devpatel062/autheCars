const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{7,25}$/;
const REGISTRATION_PATTERN = /^[A-Za-z0-9 -]{2,12}$/;
const MILEAGE_PATTERN = /^\d{1,7}$/;

function cleanText(value) {
  return String(value || "").trim();
}

export function validateEmail(value) {
  const email = cleanText(value).toLowerCase();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { error: "Enter a valid email address." };
  }

  return { email };
}

export function validateContactDetails(body) {
  const emailResult = validateEmail(body.email);
  if (emailResult.error) return emailResult;

  const name = cleanText(body.name);
  const phone = cleanText(body.phone);
  const message = cleanText(body.message);
  const vehicleId = cleanText(body.vehicleId);

  if (!name || name.length > 100) {
    return { error: "Enter your name (up to 100 characters)." };
  }
  if (!PHONE_PATTERN.test(phone)) {
    return { error: "Enter a valid phone number." };
  }
  if (message.length > 2000) {
    return { error: "Keep your message under 2,000 characters." };
  }

  return {
    data: { name, email: emailResult.email, phone, message, vehicleId },
  };
}

export function validateVehicleDetails(body) {
  const registration = cleanText(body.registration);
  const mileage = cleanText(body.mileage);

  if (!REGISTRATION_PATTERN.test(registration) || !MILEAGE_PATTERN.test(mileage)) {
    return { error: "Enter a valid registration and mileage." };
  }

  return { data: { registration, mileage } };
}
