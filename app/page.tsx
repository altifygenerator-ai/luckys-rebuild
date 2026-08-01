import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { RiverLevels } from "@/components/RiverLevels";
import { site } from "@/lib/site";
import { webPageSchema } from "@/lib/seo";


const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema({
      name: "Caddo River Canoe, Kayak & Cabin Rentals | Lucky's",
      description: site.description,
      path: "/",
      image: "/seo/home-og.jpg",
    }),
  ],
};

const floats = [
  { title: "Tube Float", image: "/images/tube-float-new.jpg", alt: "Guests tubing on the river", mark: "○", text: "For those days when the time doesn’t matter and you have no place to be. Join us for a lazy trip down the river." },
  { title: "Canoe Float", image: "/images/canoe-beach.jpg", alt: "Canoes traveling through a river section", mark: "×", text: "When you want to enjoy the river with someone else. This is a perfect way to spend time and make memories." },
  { title: "Kayak Float", image: "/images/kayak-overlook.jpg", alt: "Kayakers seen from the wooded hillside above the Caddo River", mark: "◇", text: "For a day of leisure or exercise, by yourself or in a group, this is a great way to see the beautiful Caddo River." },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image src="/images/hero-caddo.jpg" alt="Kayakers paddling on the Caddo River" fill priority sizes="100vw" className="home-hero-image" />
        <div className="home-hero-overlay" />
        <div className="shell home-hero-inner">
          <h1>Caddo River Canoe &amp; Kayak Rentals</h1>
          <p>This bend is beautiful, exciting and fun for the avid canoer or kayaker as well as for the whole family.</p>
          <a className="button button-blue" href="#learn-more">Learn More</a>
        </div>
        <div className="wave-edge" aria-hidden="true" />
      </section>

      <section className="service-ribbon" id="learn-more" aria-label="What Lucky's offers">
        <div className="shell service-ribbon-grid">
          <Link href="/float-trips"><strong>Float Trips</strong><span>Tubes, canoes, kayaks, and rafts, we have it covered for your fun on the river.</span></Link>
          <div><strong>Fishing</strong><span>From the bank or on the river we have some of the best fishing holes.</span></div>
          <Link href="/camping"><strong>Camping</strong><span>Overnight or for a few days, you can stay and get away on the Caddo River.</span></Link>
        </div>
      </section>

      <WeatherLink />

      <section className="feature-split cabin-feature">
        <div className="shell split-grid">
          <div className="split-image cabin-aerial-home"><Image src="/images/cabins-aerial-home.jpg" alt="Aerial view of Lucky's three cabins in the wooded hills near the Caddo River" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
          <div className="split-copy blue-copy-box">
            <h2>Cabin Rentals</h2>
            <p>We now offer options for you to stay the night with us so your fun can continue to the next day or all weekend.</p>
            <Link className="simple-link" href="/cabins">More Info</Link>
          </div>
        </div>
      </section>

      <section className="float-options">
        <div className="shell">
          <span className="section-label">How We Work For You</span>
          <p className="section-intro">Located about a half mile off Highway 8, Lucky&apos;s Canoe &amp; Kayak Rental is your source for the best prices and best service on the Caddo.</p>
          <div className="float-card-grid">
            {floats.map((item) => (
              <article className="float-card" key={item.title}>
                <div className="float-card-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span className="float-mark" aria-hidden="true">{item.mark}</span>
                <div className="float-card-copy"><h2>{item.title}</h2><p>{item.text}</p><Link href="/float-trips">Read More</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-wave story-wave-one" aria-hidden="true" />
        <div className="story-wave story-wave-two" aria-hidden="true" />
        <div className="shell story-heading"><span>Why Choose Us</span><h2>Our Promise and Values</h2></div>
        <div className="shell story-grid">
          <div className="story-copy">
            <p>The most popular float on the Caddo River is the classic six-mile run that leads into Glenwood. You&apos;ll hit plenty of rock gardens along the way, which get interesting when the water runs low.</p>
            <p>A couple of miles downstream, the South Fork joins in from the west. From there, the river rolls through small rapids, stretches of long gravel bars, and the occasional willow thicket as it makes its way toward Glenwood.</p>
          </div>
          <div className="group-photo-wrap"><Image src="/images/canoe-group-shore.jpg" alt="A large group preparing canoes along the rocky Caddo River shoreline" width={1536} height={2048} sizes="(max-width: 800px) 86vw, 390px" /></div>
        </div>
      </section>

      <div className="shell river-section-wrap"><RiverLevels /></div>
      <MapAndVisit />
      <ContactSection />
      <JsonLd data={homeSchema} />
    </>
  );
}
