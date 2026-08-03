export const pricingNotes = [
  "All prices shown are cash prices.",
  "Credit-card transactions are subject to a 10% charge plus applicable card-processing fees.",
  "Add $10 for trips to Amity or Norman.",
  "Shuttle service to or from a cabin is $5 per person, one way.",
  "Parking is $20 minimum per vehicle. Every vehicle must display a parking ticket on the dashboard.",
] as const;

export const floatPrices = [
  { item: "Canoe", prices: ["1 boat: $50", "2 boats: $45 each", "4 boats: $40 each"] },
  { item: "Single kayak", prices: ["1 boat: $35", "2 boats: $30 each"] },
  { item: "Double kayak", prices: ["1 boat: $55", "2 boats: $50 each"] },
  { item: "4-person raft", prices: ["$100"] },
  { item: "5-person raft", prices: ["$125"] },
  { item: "6-person raft", prices: ["$150"] },
  { item: "Tube", prices: ["1–4 tubes: $25 each", "5 or more: $20 each"] },
] as const;

export const shuttlePrices = [
  { item: "Tube shuttle", price: "$15 per person" },
  { item: "Boat shuttle", price: "$20 per person", note: "5 or more: $15 per person" },
  { item: "Personal pickup — Tranquil Lane", price: "$5 per person" },
  { item: "Personal pickup — anywhere else", price: "$10 per person" },
] as const;

export const campingPrices = [
  { item: "RV spot", price: "$25 per night" },
  { item: "RV with tent", price: "$25 RV fee + $10 per person" },
  { item: "Tent camping", price: "$10 per person, ages 12 and up" },
] as const;

export const cabinPrice = {
  price: "$150 per night",
  minimum: "Two-night minimum",
} as const;
