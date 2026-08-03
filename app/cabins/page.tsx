import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CabinStayInfo } from "@/components/CabinStayInfo";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RiverLevels } from "@/components/RiverLevels";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { cabins } from "@/lib/cabins";
import { breadcrumbSchema, createPageMetadata, schemaIds, webPageSchema } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Caddo River Cabin Rentals in Glenwood, AR",
  description:
    "Compare Lucky's three cabin rentals near the Caddo River in Glenwood, Arkansas, then view the full photo gallery and details for each cabin.",
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

const cabinsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      name: "Caddo River Cabin Rentals in Glenwood, Arkansas",
      description:
        "Compare three Lucky's cabin rentals near the Caddo River and open a separate page for the photos and details of each cabin.",
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
      containsPlace: cabins.map((cabin) => ({
        "@type": "VacationRental",
        "@id": `${absoluteUrl(`/cabins/${cabin.slug}`)}#vacation-rental`,
        name: `Lucky's ${cabin.name}`,
        url: absoluteUrl(`/cabins/${cabin.slug}`),
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
      <PageHero
        eyebrow="Cabin rentals"
        title="Cabin Rentals"
        intro="Choose a cabin below to see its full photo gallery, exact size, porch details, and reservation information."
        image="/images/cabins-aerial-hero.jpg"
        imageAlt="Aerial view of Lucky's cabins surrounded by woods near the Caddo River"
        imageClassName="page-hero-image-cabins"
      >
        <a className="button button-gold" href={site.phoneHref}>
          Call About a Cabin
        </a>
      </PageHero>
      <WeatherLink />

      <section className="cabin-intro-section">
        <div className="shell cabin-intro-grid">
          <div>
            <span className="section-label">Three cabin rentals</span>
            <h2>Pick a cabin to see every photo</h2>
          </div>
          <p>
            Select a cabin below for its complete interior, porch, exterior, and view gallery.
          </p>
        </div>
      </section>

      <section className="cabin-overview-section">
        <div className="shell cabin-overview-grid">
          {cabins.map((cabin) => (
            <article className="cabin-overview-card" key={cabin.slug}>
              <Link className="cabin-overview-image" href={`/cabins/${cabin.slug}`} aria-label={`View ${cabin.name}`}>
                <Image
                  src={cabin.coverImage}
                  alt={cabin.coverAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </Link>
              <div className="cabin-overview-copy">
                <span className="section-label">Cabin rental</span>
                <h2>
                  <Link href={`/cabins/${cabin.slug}`}>{cabin.name}</Link>
                </h2>
                <dl className="cabin-overview-facts">
                  <div>
                    <dt>Cabin size</dt>
                    <dd>{cabin.size}</dd>
                  </div>
                  <div>
                    <dt>Covered porch</dt>
                    <dd>{cabin.porch}</dd>
                  </div>
                </dl>
                <p>Queen bed, futon, kitchen area, bathroom, Wi-Fi, television, outdoor grill, and picnic table.</p>
                <Link className="button button-blue-dark" href={`/cabins/${cabin.slug}`}>
                  View {cabin.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CabinStayInfo />
      <div className="shell river-section-wrap">
        <RiverLevels />
      </div>
      <MapAndVisit />
      <ContactSection />
      <JsonLd data={cabinsSchema} />
    </>
  );
}
