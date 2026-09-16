export const SERVICES = [
  { label: "30-MINUTE VISIT", price: "$28", type: "service" },
  { label: "60-MINUTE VISIT", price: "$45", type: "service" },
  { label: "ADDITIONAL CAT", price: "+$5 per visit", type: "addon" },
  { label: "ADDITIONAL DOG", price: "+$10 per walk", type: "addon" },
  { label: "HOLIDAY RATE", price: "+25%", type: "addon" },
  { label: "DOG WALK", price: "$28", type: "service" },
  { label: "60-MINUTE DOG WALK", price: "$45", type: "service" }
];

export const BOOKABLE_SERVICES = SERVICES.filter(s => s.type === "service");
export const ADDONS = SERVICES.filter(s => s.type === "addon");

const serviceByLabel = (label) => SERVICES.find((service) => service.label === label);

export const SERVICE_DETAILS = [
  {
    number: "01",
    title: "Cat & Home Visits",
    description:
      "Feeding, fresh litter, and company for your cat, plus small tasks around the home.",
    prices: [
      { label: "30-minute visit", service: serviceByLabel("30-MINUTE VISIT") },
      { label: "60-minute visit", service: serviceByLabel("60-MINUTE VISIT") }
    ],
    details: ["Feeding", "Litter care", "Companionship", "Familiar home details"]
  },
  {
    number: "02",
    title: "Dog Walks",
    description:
      "A walk at your dog’s pace, with time to sniff and explore. You’ll get an update afterward.",
    prices: [
      { label: "30-minute walk", service: serviceByLabel("DOG WALK") },
      { label: "60-minute walk", service: serviceByLabel("60-MINUTE DOG WALK") }
    ],
    details: ["Comfort-paced walks", "Routine-aware care", "Clear updates"]
  }
];

export const HOMEPAGE_SERVICES = SERVICE_DETAILS.map(({ number, title, prices }, index) => ({
  number,
  title,
  description: index === 0
    ? "Food, fresh litter, and company for your cat."
    : "A walk at your dog’s pace, with time to sniff and explore.",
  prices: prices.map(({ label, service }) => ({ label, value: service?.price }))
}));
