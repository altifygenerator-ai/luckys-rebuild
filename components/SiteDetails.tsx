import Image from "next/image";
import { WeatherStrip } from "@/components/WeatherStrip";
import { site } from "@/lib/site";

export function WeatherLink() {
  return <WeatherStrip />;
}

export function MapAndVisit() {
  return (
    <section className="map-section">
      <div className="shell map-grid">
        <div className="map-frame">
          <iframe
            title="Map to Lucky's Canoe Rental"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="visit-panel">
          <div className="visit-photo">
            <Image src="/images/luckys-office.jpg" alt="Lucky's main office and kayak rental area" fill sizes="(max-width: 900px) 100vw, 34vw" />
          </div>
          <span className="section-label">Our Contacts</span>
          <h2>Find Lucky&apos;s near Glenwood</h2>
          <address>{site.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
          <p>{site.hours}</p>
          <a className="button button-blue-dark" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </div>
    </section>
  );
}
