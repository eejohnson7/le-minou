export const SERVICES = [
  { label: "30-MINUTE VISIT", price: "$15", type: "service" },
  { label: "60-MINUTE VISIT", price: "$25", type: "service" },
  { label: "ADDITIONAL PET", price: "+ $5/visit", type: "addon" },
  { label: "HOLIDAY RATE", price: "+ $5/visit", type: "addon" },
  { label: "DOG WALK", price: "$20 / 30 minutes", type: "service" }
];

export const BOOKABLE_SERVICES = SERVICES.filter(s => s.type === "service");
export const ADDONS = SERVICES.filter(s => s.type === "addon");