import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RiverLevels } from "@/components/RiverLevels";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { absoluteUrl, site } from "@/lib/site";
import { breadcrumbSchema, createPageMetadata, schemaIds, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Caddo River Float Trips in Glenwood, AR",
  description: "Plan a Caddo River float trip with canoe, kayak, tube, and raft rentals from Lucky's near Glenwood, Arkansas. Call for current availability.",
  path: "/float-trips",
  image: "/seo/float-trips-og.jpg",
  imageAlt: "Colorful kayaks and guests at Lucky's on the Caddo River",
  keywords: [
    "Caddo River float trips",
    "Caddo River canoe rental",
    "Caddo River kayak rental",
    "Caddo River tube rental",
    "Glenwood Arkansas float trip",
  ],
});

const floatTripsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      name: "Caddo River Float Trips in Glenwood, Arkansas",
      description: "Canoe, kayak, tube, and raft float trips on the Caddo River near Glenwood, Arkansas.",
      path: "/float-trips",
      image: "/seo/float-trips-og.jpg",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Float Trips", path: "/float-trips" },
    ]),
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/float-trips")}#service`,
      name: "Caddo River Float Trips and Paddlecraft Rentals",
      description: "Canoe, kayak, tube, and raft rentals for float trips on the Caddo River near Glenwood, Arkansas.",
      url: absoluteUrl("/float-trips"),
      serviceType: "Canoe, kayak, tube, and raft rentals",
      provider: { "@id": schemaIds.business },
      areaServed: {
        "@type": "Place",
        name: "Caddo River near Glenwood, Arkansas",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Float options",
        itemListElement: ["Tube rental", "Canoe rental", "Kayak rental", "Raft rental"].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
};

export default function FloatTripsPage() {
  return (
    <>
      <PageHero eyebrow="Caddo River float trips" title="Choose Your Way Down the River" intro="Tubes, canoes, kayaks, and rafts — Lucky's has you covered for a day on the Caddo." image="/images/river-scenic.jpg" imageAlt="Clear water and wooded shoreline on the Caddo River">
        <a className="button button-gold" href={site.phoneHref}>Call for Availability</a>
      </PageHero>
      <WeatherLink />

      <section className="content-section">
        <div className="shell narrow-shell">
          <p className="eyebrow">Float trips</p>
          <h2>The classic run into Glenwood</h2>
          <p className="large-copy">The most popular float on the Caddo River is the classic six-mile run that leads into Glenwood. You&apos;ll hit plenty of rock gardens along the way, which get interesting when the water runs low.</p>
          <p>A couple of miles downstream, the South Fork joins in from the west. From there, the river rolls through small rapids, stretches of long gravel bars, and the occasional willow thicket as it makes its way toward Glenwood.</p>
        </div>
      </section>

      <section className="trip-photo-section" aria-label="Caddo River float trip photos">
        <div className="shell trip-photo-grid">
          <div className="trip-photo trip-photo-wide"><Image src="/images/hero-caddo.jpg" alt="A group beside colorful kayaks on the Caddo River" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div className="trip-photo"><Image src="/images/tube-float-new.jpg" alt="Guests floating the Caddo River in orange tubes" fill sizes="(max-width: 800px) 50vw, 25vw" /></div>
          <div className="trip-photo trip-photo-overlook"><Image src="/images/kayak-overlook.jpg" alt="Kayakers passing below a wooded hillside on the Caddo River" fill sizes="(max-width: 800px) 50vw, 25vw" /></div>
        </div>
      </section>

      <section className="equipment-section">
        <div className="shell equipment-list">
          <article><span>Tube</span><div><h2>Take it slow</h2><p>For those days when the time doesn&apos;t matter and you have no place to be. Join us for a lazy trip down the river.</p></div></article>
          <article><span>Canoe</span><div><h2>Share the float</h2><p>Enjoy the river with someone else and spend the day making memories on the Caddo.</p></div></article>
          <article><span>Kayak</span><div><h2>Paddle your own way</h2><p>For a day of leisure or exercise, by yourself or in a group, a kayak is a great way to see the river.</p></div></article>
          <article><span>Raft</span><div><h2>Call for current availability</h2><p>Lucky&apos;s also lists rafts among its float options. Call before your trip for current availability, pricing, and the day&apos;s last put-in time.</p></div></article>
        </div>
        <div className="shell centered-action"><a className="button button-forest" href={site.phoneHref}>Call {site.phoneDisplay}</a><Link className="text-link" href="/things-to-know">Read the river rules</Link></div>
      </section>

      <div className="shell river-section-wrap"><RiverLevels /></div>
      <MapAndVisit />
      <ContactSection />
      <JsonLd data={floatTripsSchema} />
    </>
  );
}
