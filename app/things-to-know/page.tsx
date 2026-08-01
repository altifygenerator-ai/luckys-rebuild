import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { MapAndVisit, WeatherLink } from "@/components/SiteDetails";
import { RiverLevels } from "@/components/RiverLevels";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Things To Know",
  description: "Rules and suggested items for canoe, kayak, and inner tube trips on Arkansas waterways.",
  alternates: { canonical: "/things-to-know" },
};

const rules = [
  ["Glass containers are prohibited.", "Except for containers for substances prescribed by a licensed physician, no person shall possess or use glass containers within the banks of Arkansas’ navigable waterways, within a vessel. For purposes of this act, ‘vessel’ does not include a houseboat, party barge, johnboat, runabout, ski boat, bass boat, or similar craft not easily susceptible to swamping, tipping, or rolling."],
  ["Fasten cooler lids.", "Anyone using Arkansas’ navigable waterways by canoe, kayak, inner tube, or another vessel easily susceptible to swamping, tipping, or rolling, and transporting a cooler or container for food and beverages, must make sure that container seals or locks to keep the contents from spilling into the water."],
  ["Attach and use a mesh litter bag.", "Carry and affix to the vessel a container or bag suitable for containing refuse, waste, and trash, and capable of being securely closed. The container or bag must be of mesh construction. Transport all refuse, waste, and trash to a place where it may be safely and lawfully disposed of. A container is not required for people traveling without food or beverages."],
  ["Use a floating holder for beverages.", "When a beverage is not securely contained in a cooler or litter bag, keep it attached to or held within a floating holder or another device designed to prevent it from sinking beneath the surface of the waterway."],
];

export default function ThingsToKnowPage() {
  return (
    <>
      <PageHero eyebrow="Before you take off" title="Things You Need To Know" intro="Rules and suggested items for users of canoes, kayaks, and inner tubes on Arkansas waterways." image="/images/river-launch.jpg" imageAlt="Guests launching kayaks on the Caddo River">
        <a className="button button-gold" href={site.phoneHref}>Call With Questions</a>
      </PageHero>
      <WeatherLink />

      <section className="content-section rules-section">
        <div className="shell">
          <p className="eyebrow">Rules of the river</p>
          <h2>These are enforceable Arkansas laws.</h2>
          <div className="rules-list">
            {rules.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
          <p className="penalty-note"><strong>Penalties:</strong> A violation of Act 803 is a misdemeanor. Each violation may be prosecuted as a separate offense and may be punishable by a fine of up to $500. Effective August 13, 2001.</p>
        </div>
      </section>

      <section className="suggested-section">
        <div className="shell">
          <p className="eyebrow light">Suggested items for your outing</p>
          <h2>Bring the basics</h2>
          <div className="suggested-list"><span>Shoes</span><span>Sunglasses</span><span>Sunscreen</span><span>Ice Cooler</span></div>
        </div>
      </section>

      <div className="shell river-section-wrap"><RiverLevels /></div>
      <MapAndVisit />
      <ContactSection />
    </>
  );
}
