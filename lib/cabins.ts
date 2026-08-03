export type CabinPhoto = {
  src: string;
  alt: string;
};

export type Cabin = {
  slug: "cabin-one" | "cabin-two" | "cabin-three";
  name: string;
  shortName: string;
  size: string;
  porch: string;
  vrbo: string;
  coverImage: string;
  coverAlt: string;
  photos: CabinPhoto[];
};

export const cabinAmenities = [
  "One queen bed",
  "Futon that converts into a bed",
  "Kitchen area",
  "One bathroom",
  "Wi-Fi and television",
  "Outdoor grill and picnic table",
] as const;

export const cabinPolicies = [
  {
    lead: "No smoking or vaping.",
    detail: "A $150 charge applies for evidence of smoking or vaping in a cabin.",
  },
  {
    lead: "No pets.",
    detail: "A $150 charge applies for evidence of pets during your stay.",
  },
  {
    lead: "Check-in is 4 PM. Checkout is 11 AM.",
    detail: "",
  },
  {
    lead: "Four-person maximum occupancy",
    detail: "per cabin.",
  },
  {
    lead: "",
    detail: "All reservations must have a credit card on file.",
  },
  {
    lead: "",
    detail: "Cabins are required to be left as they were found. A cabin left dirty is subject to a $50 cleaning charge.",
  },
  {
    lead: "",
    detail: "Reservations must be canceled 14 days in advance for a refund.",
  },
] as const;

export const cabins: Cabin[] = [
  {
    slug: "cabin-one",
    name: "Cabin One",
    shortName: "Cabin 1",
    size: "476 ft²",
    porch: "8 × 14 covered porch",
    vrbo: "3011373",
    coverImage: "/images/cabin-1-04.jpg",
    coverAlt: "Cabin One exterior on the wooded hillside",
    photos: [
      { src: "/images/cabin-1-06.jpg", alt: "Covered porch overlooking the river valley" },
      { src: "/images/cabin-1-04.jpg", alt: "Cabin One exterior and hillside" },
      { src: "/images/cabin-1-10.jpg", alt: "Living area with futon and river-facing windows" },
      { src: "/images/cabin-1-08.jpg", alt: "Queen bed with wood-paneled walls" },
      { src: "/images/cabin-1-03.jpg", alt: "View from the covered porch" },
      { src: "/images/cabin-1-05.jpg", alt: "Cabin One entrance" },
      { src: "/images/cabin-1-07.jpg", alt: "Wood-paneled interior hallway" },
      { src: "/images/cabin-1-09.jpg", alt: "Bathroom sink and vanity" },
      { src: "/images/cabin-1-01.jpg", alt: "Interior storage and wood wall detail" },
      { src: "/images/cabin-1-02.jpg", alt: "Storage and shower area" },
    ],
  },
  {
    slug: "cabin-two",
    name: "Cabin Two",
    shortName: "Cabin 2",
    size: "544 ft²",
    porch: "8 × 12 covered porch",
    vrbo: "3012822",
    coverImage: "/images/cabin-2-02.jpg",
    coverAlt: "Cabin Two exterior surrounded by trees",
    photos: [
      { src: "/images/cabin-2-02.jpg", alt: "Cabin Two exterior" },
      { src: "/images/cabin-2-03.jpg", alt: "Covered porch with river valley view" },
      { src: "/images/cabin-2-05.jpg", alt: "Full kitchen with refrigerator and range" },
      { src: "/images/cabin-2-09.jpg", alt: "Living area with futon" },
      { src: "/images/cabin-2-08.jpg", alt: "Queen bedroom" },
      { src: "/images/cabin-2-01.jpg", alt: "Kitchen and dining area" },
      { src: "/images/cabin-2-04.jpg", alt: "Breakfast counter and television area" },
      { src: "/images/cabin-2-06.jpg", alt: "Kitchen pass-through counter" },
      { src: "/images/cabin-2-07.jpg", alt: "Tiled shower" },
      { src: "/images/cabin-2-10.jpg", alt: "Porch seating and view" },
    ],
  },
  {
    slug: "cabin-three",
    name: "Cabin Three",
    shortName: "Cabin 3",
    size: "504 ft²",
    porch: "8 × 10 covered porch",
    vrbo: "3013045",
    coverImage: "/images/cabin-3-04.jpg",
    coverAlt: "Cabin Three exterior on the hillside",
    photos: [
      { src: "/images/cabin-3-04.jpg", alt: "Cabin Three exterior" },
      { src: "/images/cabin-3-14.jpg", alt: "Covered porch overlooking the water" },
      { src: "/images/cabin-3-12.jpg", alt: "Kitchen with refrigerator and range" },
      { src: "/images/cabin-3-13.jpg", alt: "Living area with seating" },
      { src: "/images/cabin-3-11.jpg", alt: "Queen bedroom" },
      { src: "/images/cabin-3-02.jpg", alt: "Side entrance and exterior" },
      { src: "/images/cabin-3-03.jpg", alt: "Covered porch and river view" },
      { src: "/images/cabin-3-06.jpg", alt: "View down toward the river" },
      { src: "/images/cabin-3-07.jpg", alt: "Covered porch deck" },
      { src: "/images/cabin-3-15.jpg", alt: "Cabin entrance and porch seating" },
      { src: "/images/cabin-3-08.jpg", alt: "Television and seating area" },
      { src: "/images/cabin-3-09.jpg", alt: "Dresser and window air conditioner" },
      { src: "/images/cabin-3-01.jpg", alt: "Bathroom vanity" },
      { src: "/images/cabin-3-05.jpg", alt: "Bathroom sink and toilet" },
      { src: "/images/cabin-3-10.jpg", alt: "Porch view toward the water" },
    ],
  },
];

export function getCabin(slug: string) {
  return cabins.find((cabin) => cabin.slug === slug);
}
