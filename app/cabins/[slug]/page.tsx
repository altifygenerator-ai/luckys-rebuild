import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CabinGallery } from "@/components/CabinGallery";
import { CabinStayInfo } from "@/components/CabinStayInfo";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { cabins, getCabin } from "@/lib/cabins";
import { breadcrumbSchema, createPageMetadata, schemaIds, webPageSchema } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return cabins.map((cabin) => ({ slug: cabin.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cabin = getCabin(slug);

  if (!cabin) {
    return {};
  }

  return createPageMetadata({
    title: `${cabin.name} | Caddo River Cabin Rental`,
    description: `See the full photo gallery, ${cabin.size} cabin size, ${cabin.porch}, amenities, rate, and policies for Lucky's ${cabin.name} near the Caddo River.`,
    path: `/cabins/${cabin.slug}`,
    image: "/seo/cabins-og.jpg",
    imageAlt: `${cabin.name} at Lucky's near the Caddo River in Glenwood, Arkansas`,
    keywords: [
      `${cabin.name} Lucky's Canoe Rental`,
      "Caddo River cabin rental",
      "Glenwood Arkansas cabin",
      "cabins near Caddo River",
      `VRBO ${cabin.vrbo}`,
    ],
  });
}

export default async function CabinPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cabin = getCabin(slug);

  if (!cabin) {
    notFound();
  }

  const path = `/cabins/${cabin.slug}`;
  const cabinSchema = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema({
        name: `${cabin.name} at Lucky's Canoe Rental`,
        description: `${cabin.name} is a ${cabin.size} cabin with an ${cabin.porch} near the Caddo River in Glenwood, Arkansas.`,
        path,
        image: cabin.coverImage,
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Cabins", path: "/cabins" },
        { name: cabin.name, path },
      ]),
      {
        "@type": "VacationRental",
        "@id": `${absoluteUrl(path)}#vacation-rental`,
        name: `Lucky's ${cabin.name}`,
        description: `${cabin.name} is a ${cabin.size} cabin with an ${cabin.porch} near the Caddo River in Glenwood, Arkansas.`,
        url: absoluteUrl(path),
        mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
        isPartOf: { "@id": `${absoluteUrl("/cabins")}#lodging` },
        parentOrganization: { "@id": schemaIds.business },
        telephone: site.phoneE164,
        email: site.email,
        address: { "@type": "PostalAddress", ...site.address },
        sameAs: `https://www.vrbo.com/${cabin.vrbo}`,
        image: cabin.photos.map((photo) => absoluteUrl(photo.src)),
        petsAllowed: false,
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
        offers: {
          "@type": "Offer",
          url: absoluteUrl(path),
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

  return (
    <>
      <PageHero
        eyebrow="Lucky's cabin rentals"
        title={cabin.name}
        intro={`${cabin.size} with an ${cabin.porch}. Browse the full gallery below and call Lucky's for current availability.`}
        image={cabin.coverImage}
        imageAlt={cabin.coverAlt}
        imageClassName={`page-hero-image-${cabin.slug}`}
      >
        <a className="button button-gold" href={site.phoneHref}>
          Call About {cabin.name}
        </a>
      </PageHero>
      <WeatherLink />

      <section className="cabin-single-section">
        <div className="shell">
          <Link className="cabin-back-link" href="/cabins">
            ← Back to all cabins
          </Link>
          <div className="cabin-single-grid">
            <CabinGallery cabinName={cabin.name} photos={cabin.photos} />
            <div className="cabin-detail-copy">
              <span className="section-label">Cabin rental</span>
              <h2>{cabin.name}</h2>
              <dl className="cabin-facts">
                <div>
                  <dt>Cabin size</dt>
                  <dd>{cabin.size}</dd>
                </div>
                <div>
                  <dt>Covered porch</dt>
                  <dd>{cabin.porch}</dd>
                </div>
                <div>
                  <dt>VRBO property</dt>
                  <dd>{cabin.vrbo}</dd>
                </div>
              </dl>
              <p>
                This cabin has one queen bed, a futon that converts into a bed, a kitchen area, one bathroom, Wi-Fi, television, an outdoor grill, and a picnic table.
              </p>
              <a className="button button-blue-dark" href={site.phoneHref}>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CabinStayInfo />

      <section className="cabin-next-section">
        <div className="shell cabin-next-inner">
          <div>
            <span className="section-label">Compare your options</span>
            <h2>See the other cabins</h2>
          </div>
          <div className="cabin-next-links">
            {cabins
              .filter((item) => item.slug !== cabin.slug)
              .map((item) => (
                <Link className="button button-blue-dark" href={`/cabins/${item.slug}`} key={item.slug}>
                  View {item.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <MapAndVisit />
      <ContactSection />
      <JsonLd data={cabinSchema} />
    </>
  );
}
