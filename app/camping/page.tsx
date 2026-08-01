import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { RiverLevels } from "@/components/RiverLevels";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Camping & Lodging",
  description: "Tent camping and RV sites on the Caddo River at Lucky's near Glenwood, Arkansas.",
  alternates: { canonical: "/camping" },
};

export default function CampingPage() {
  return (
    <>
      <PageHero eyebrow="Camping & lodging" title="Come and Stay by the River" intro="With two locations right on the river, camping at Lucky's is more than just pitching a tent." image="/images/campground-guests.jpg" imageAlt="Campers and tents at Lucky's campground near Glenwood">
        <a className="button button-gold" href={site.phoneHref}>Call About Camping</a>
      </PageHero>
      <WeatherLink />

      <section className="feature-split camping-intro">
        <div className="shell split-grid reverse-mobile">
          <div className="split-copy">
            <p className="eyebrow">Something for everyone</p>
            <h2>Camping right on the Caddo</h2>
            <p>Our main camping area in Glenwood offers some sites with electric and water hookups. We have some parking for campers and RVs.</p>
            <p>Each site has a picnic table, fire ring, and park-style barbecue grill. Best of all, there is a bathhouse with full indoor plumbing and hot showers.</p>
          </div>
          <div className="split-image framed-image"><Image src="/images/campground-guests.jpg" alt="Guests at Lucky's campground" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        </div>
      </section>

      <section className="rates-section">
        <div className="shell rate-lines">
          <article><div><p className="eyebrow light">Bring your own tent</p><h2>Tent Camping</h2><p>After a day on the river, relax and stay the night. A shower house and other amenities are included while you stay.</p></div><div className="price-mark"><strong>$10</strong><span>per person over 12</span></div></article>
          <article><div><p className="eyebrow light">Camper and RV sites</p><h2>RV Sites</h2><p>Includes 30-amp electrical service and water. Bring your own water hose. There are no sewer hookups or dump station.</p></div><div className="price-mark"><strong>$25</strong><span>per night</span></div></article>
        </div>
      </section>

      <section className="content-section">
        <div className="shell narrow-shell">
          <p className="eyebrow">Friends, family, and groups</p>
          <h2>We welcome them all</h2>
          <p className="large-copy">For recreation at the campsite, play football, frisbee, volleyball, try your arm at horseshoes, or simply set your lawn chair in the water and enjoy the cool clear water.</p>
          <p>The section of the Caddo at “The Narrows” has been rated “The Best Swimming Hole in Arkansas” by the Arkansas Times. It is a short drive from Glenwood.</p>
          <p>Our campgrounds and swimming holes are private property and are designated for our canoe, kayak, and tube business use, and for paying guests and campers to enjoy.</p>
        </div>
      </section>

      <div className="shell river-section-wrap"><RiverLevels /></div>
      <MapAndVisit />
      <ContactSection />
    </>
  );
}
