import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { RiverLevels } from "@/components/RiverLevels";
import { CabinGallery, type CabinPhoto } from "@/components/CabinGallery";
import { absoluteUrl, site } from "@/lib/site";
import { breadcrumbSchema, createPageMetadata, schemaIds, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Caddo River Cabin Rentals in Glenwood, AR",
  description: "View three Lucky's cabin rentals near the Caddo River in Glenwood, Arkansas, with actual interior photos, amenities, rates, and policies.",
  path: "/cabins",
  image: "/seo/cabins-og.jpg",
  imageAlt: "Aerial view of Lucky's cabins in the wooded hills near the Caddo River",
  keywords: [
    "Caddo River cabin rentals",
    "cabins in Glenwood Arkansas",
    "cabins near Caddo River",
    "Lucky's cabins",
    "Glenwood Arkansas lodging",
  ],
});

type Cabin = {
  name: string;
  size: string;
  porch: string;
  vrbo: string;
  photos: CabinPhoto[];
};

const cabins: Cabin[] = [
  {
    name: "Cabin One",
    size: "476 ft²",
    porch: "8 × 14 covered porch",
    vrbo: "3011373",
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
    name: "Cabin Two",
    size: "544 ft²",
    porch: "8 × 12 covered porch",
    vrbo: "3012822",
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
    name: "Cabin Three",
    size: "504 ft²",
    porch: "8 × 10 covered porch",
    vrbo: "3013045",
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

const cabinsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      name: "Caddo River Cabin Rentals in Glenwood, Arkansas",
      description: "Three cabin rentals near the Caddo River with actual photos, amenities, rates, and policies.",
      path: "/cabins",
      image: "/seo/cabins-og.jpg",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Cabins", path: "/cabins" },
    ]),
    {
      "@type": "LodgingBusiness",
      "@id": `${absoluteUrl("/cabins")}#lodging`,
      name: "Lucky's Caddo River Cabin Rentals",
      description: "Three cabin rentals near the Caddo River in Glenwood, Arkansas.",
      url: absoluteUrl("/cabins"),
      parentOrganization: { "@id": schemaIds.business },
      telephone: site.phoneE164,
      email: site.email,
      address: { "@type": "PostalAddress", ...site.address },
      image: [absoluteUrl("/seo/cabins-og.jpg"), absoluteUrl("/images/cabins-aerial-hero.jpg")],
      petsAllowed: false,
      amenityFeature: [
        ["Wi-Fi", true],
        ["Television", true],
        ["Kitchen area", true],
        ["Private bathroom", true],
        ["Outdoor grill", true],
        ["Picnic table", true],
        ["Smoking", false],
      ].map(([name, value]) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value,
      })),
      containsPlace: cabins.map((cabin, index) => ({
        "@type": "VacationRental",
        "@id": `${absoluteUrl("/cabins")}#cabin-${index + 1}`,
        name: `Lucky's ${cabin.name}`,
        url: absoluteUrl("/cabins"),
        sameAs: `https://www.vrbo.com/${cabin.vrbo}`,
        image: cabin.photos.map((photo) => absoluteUrl(photo.src)),
        floorSize: {
          "@type": "QuantitativeValue",
          value: Number(cabin.size.replace(/[^0-9]/g, "")),
          unitCode: "FTK",
          unitText: "square feet",
        },
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: 4,
        },
        amenityFeature: [
          "Queen bed",
          "Futon bed",
          "Kitchen area",
          "Private bathroom",
          "Wi-Fi",
          "Television",
          "Outdoor grill",
          "Picnic table",
          cabin.porch,
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
      })),
      offers: {
        "@type": "Offer",
        url: absoluteUrl("/cabins"),
        description: "$150 per day with a two-day minimum. Call for current availability.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 150,
          priceCurrency: "USD",
          unitText: "DAY",
        },
      },
    },
  ],
};

export default function CabinsPage() {
  return (
    <>
      <PageHero eyebrow="Cabin rentals" title="Cabin Rentals" intro="Stay the night so your time on the Caddo can continue into the next day or all weekend." image="/images/cabins-aerial-hero.jpg" imageAlt="Aerial view of Lucky's cabins surrounded by woods near the Caddo River" imageClassName="page-hero-image-cabins">
        <a className="button button-gold" href={site.phoneHref}>Call About a Cabin</a>
      </PageHero>
      <WeatherLink />

      <section className="cabin-intro-section">
        <div className="shell cabin-intro-grid">
          <div>
            <span className="section-label">Three cabin rentals</span>
            <h2>Cabin photos and details</h2>
          </div>
          <p>Browse the actual interiors, porches, and views below. Call Lucky&apos;s for current availability and reservation details.</p>
        </div>
      </section>

      <div className="cabin-detail-list">
        {cabins.map((cabin, index) => (
          <section className={`cabin-detail-section ${index % 2 ? "cabin-detail-alt" : ""}`} key={cabin.name}>
            <div className="shell cabin-detail-grid">
              <CabinGallery cabinName={cabin.name} photos={cabin.photos} />
              <div className="cabin-detail-copy">
                <span className="section-label">Cabin rental</span>
                <h2>{cabin.name}</h2>
                <dl className="cabin-facts">
                  <div><dt>Cabin size</dt><dd>{cabin.size}</dd></div>
                  <div><dt>Covered porch</dt><dd>{cabin.porch}</dd></div>
                  <div><dt>VRBO property</dt><dd>{cabin.vrbo}</dd></div>
                </dl>
                <p>Each cabin has one queen bed, a futon that converts into a bed, a kitchen area, one bathroom, Wi-Fi, television, an outdoor grill, and a picnic table.</p>
                <a className="button button-blue-dark" href={site.phoneHref}>Call {site.phoneDisplay}</a>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="cream-section">
        <div className="shell two-column-copy">
          <div>
            <p className="eyebrow">Inside each cabin</p>
            <h2>Simple, comfortable stays</h2>
            <ul className="plain-list">
              <li>One queen bed</li><li>Futon that converts into a bed</li><li>Kitchen area</li><li>One bathroom</li><li>Wi-Fi and television</li><li>Outdoor grill and picnic table</li>
            </ul>
          </div>
          <div className="rate-block">
            <span>Current listed rate</span><strong>$150</strong><small>per day, with a two-day minimum</small>
            <p>The two-day minimum also applies around three-day holiday weekends.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell policy-layout">
          <div><p className="eyebrow">Cabin policies</p><h2>Before you reserve</h2></div>
          <div className="policy-list">
            <p><strong>No smoking or vaping.</strong> A $150 charge applies for evidence of smoking or vaping in a cabin.</p>
            <p><strong>No pets.</strong> A $150 charge applies for evidence of pets during your stay.</p>
            <p><strong>Check-in is 4 PM. Checkout is 11 AM.</strong></p>
            <p><strong>Four-person maximum occupancy</strong> per cabin.</p>
            <p>All reservations must have a credit card on file.</p>
            <p>Cabins are required to be left as they were found. A cabin left dirty is subject to a $50 cleaning charge.</p>
            <p>Reservations must be canceled 14 days in advance for a refund.</p>
          </div>
        </div>
      </section>

      <div className="shell river-section-wrap"><RiverLevels /></div>
      <MapAndVisit />
      <ContactSection />
      <JsonLd data={cabinsSchema} />
    </>
  );
}
