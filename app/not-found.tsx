import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="not-found-section">
      <div className="shell not-found-inner">
        <p className="eyebrow">Page not found</p>
        <h1>That page drifted downstream.</h1>
        <p>The page may have moved during the site rebuild. Head back home or call Lucky&apos;s for help.</p>
        <div className="not-found-actions">
          <Link className="button button-blue-dark" href="/">Back to Home</Link>
          <a className="text-link" href={site.phoneHref}>Call {site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
