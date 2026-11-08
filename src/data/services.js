const SERVICES = [
  { label: "30-MINUTE VISIT", petType: "cat", displayLabel: "30-min cat visit", price: "$20" },
  { label: "60-MINUTE VISIT", petType: "cat", displayLabel: "60-min cat visit", price: "$25" },
  { label: "DOG WALK", petType: "dog", displayLabel: "30-min dog walk", price: "$25" },
  { label: "60-MINUTE DOG WALK", petType: "dog", displayLabel: "60-min dog walk", price: "$30" }
];

export const servicesForPetType = (petType) =>
  SERVICES.filter(service => petType === "both" || service.petType === petType);

const serviceByLabel = (label) => SERVICES.find((service) => service.label === label);

export const ADDITIONAL_RATES = [
  { label: "Additional cat", price: "+$2 per visit" },
  { label: "Additional dog", price: "+$5 per walk" },
  { label: "Holiday rate", price: "+$5 per visit or walk" }
];

export const SERVICE_DETAILS = [
  {
    number: "01",
    title: "Cat & Home Visits",
    description:
      "Feeding, fresh litter, and company for your cat, plus small tasks around the home.",
    prices: [
      { label: "30-minute visit", service: serviceByLabel("30-MINUTE VISIT") },
      { label: "60-minute visit", service: serviceByLabel("60-MINUTE VISIT") }
    ]
  },
  {
    number: "02",
    title: "Dog Walks",
    description:
      "A walk at your dog’s pace, with time to sniff and explore. You’ll get an update afterward.",
    prices: [
      { label: "30-minute walk", service: serviceByLabel("DOG WALK") },
      { label: "60-minute walk", service: serviceByLabel("60-MINUTE DOG WALK") }
    ]
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
