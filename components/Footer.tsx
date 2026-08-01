import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";
import { RiverLevelsCompact } from "@/components/RiverLevels";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Image src="/images/luckys-logo.png" alt="Lucky's Canoe Rental" width={118} height={106} />
            <p>Float trips, cabin rentals, and camping on the Caddo River near Glenwood, Arkansas.</p>
            <a className="button button-white" href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </div>
          <div>
            <h3>Contact</h3>
            <address>{site.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className="small-copy">{site.hours}</p>
          </div>
          <div>
            <h3>Site</h3>
            <div className="footer-links">{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
          </div>
          <RiverLevelsCompact />
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Lucky&apos;s. All rights reserved.</span>
          <span className="site-credit">
            Website by <a href={site.hometownWebServicesUrl} target="_blank" rel="noopener noreferrer">Hometown Web Services</a>
          </span>
        </div>
      </footer>
      <div className="mobile-action-bar" aria-label="Quick contact">
        <a href={site.phoneHref}>Call</a>
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`} target="_blank" rel="noreferrer">Directions</a>
      </div>
    </>
  );
}
