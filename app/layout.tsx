import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lucky's Canoe Rental | Caddo River Glenwood, Arkansas",
    template: "%s | Lucky's Canoe Rental",
  },
  description: "Canoe, kayak, tube and raft rentals, cabins, and camping on the Caddo River near Glenwood, Arkansas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lucky's Canoe Rental",
    description: "Float trips, cabin rentals, and camping on the Caddo River near Glenwood, Arkansas.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/river-hero.jpg", width: 1920, height: 1080 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#327fbd",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Campground"],
    name: site.legalName,
    url: site.url,
    telephone: "+1-870-356-2772",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sweetgum Ln.",
      addressLocality: "Glenwood",
      addressRegion: "AR",
      postalCode: "71943",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
