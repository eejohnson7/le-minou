export const SERVICES = [
  { label: "30-MINUTE VISIT", price: "$15", type: "service" },
  { label: "60-MINUTE VISIT", price: "$25", type: "service" },
  { label: "ADDITIONAL PET", price: "+ $5/visit", type: "addon" },
  { label: "HOLIDAY RATE", price: "+ $5/visit", type: "addon" },
  { label: "DOG WALK", price: "$20 / 30 minutes", type: "service" }
];

export const BOOKABLE_SERVICES = SERVICES.filter(s => s.type === "service");
export const ADDONS = SERVICES.filter(s => s.type === "addon");

const servicePrice = (label) => SERVICES.find((service) => service.label === label)?.price;

export const HOMEPAGE_SERVICES = [
  {
    number: "01",
    title: "Cat & Home Visits",
    description:
      "Calm, attentive visits shaped around feeding, litter, companionship, and the small home details that keep everything feeling familiar.",
    prices: [
      { label: "30-minute visit", value: servicePrice("30-MINUTE VISIT") },
      { label: "60-minute visit", value: servicePrice("60-MINUTE VISIT") }
    ]
  },
  {
    number: "02",
    title: "Dog Walks",
    description:
      "Structured, unhurried walks paced to your dog’s comfort, routine, and energy—not a one-size-fits-all route.",
    prices: [
      { label: "30-minute walk", value: servicePrice("DOG WALK") }
    ]
  },
  {
    number: "03",
    title: "Longer Visits & Add-ons",
    description:
      "More time for pets who need it, plus straightforward adjustments for multi-pet homes and holiday care.",
    prices: [
      { label: "Additional pet", value: servicePrice("ADDITIONAL PET") },
      { label: "Holiday rate", value: servicePrice("HOLIDAY RATE") }
    ]
  }
];
