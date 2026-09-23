const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

export function matchesVehicleFilters(vehicle, filters) {
  const exactMatchFields = [
    "make",
    "model",
    "fuel",
    "gearbox",
    "body",
    "drive",
  ];
  const matchesAttributes = exactMatchFields.every(
    (field) => !filters[field] || vehicle[field] === filters[field],
  );
  const meetsMinimum = !filters.min || vehicle.price >= Number(filters.min);
  const meetsMaximum = !filters.max || vehicle.price <= Number(filters.max);
  const matchesRequirement =
    !filters.requirement || vehicle.requirements.includes(filters.requirement);
  const matchesLifestyle =
    !filters.lifestyle || vehicle.lifestyle.includes(filters.lifestyle);

  return (
    matchesAttributes &&
    meetsMinimum &&
    meetsMaximum &&
    matchesRequirement &&
    matchesLifestyle
  );
}
