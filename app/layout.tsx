import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import { schemaIds } from "@/lib/seo";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  "EvsktnVCeY6-LpbV1gqYDd-BEJ5LJry4sXxn0Fw81p0";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,

  title: {
    default: "Caddo River Canoe, Kayak & Cabin Rentals | Lucky's",
    template: "%s | Lucky's Canoe Rental",
  },

  description: site.description,

  keywords: [
    "Caddo River canoe rental",
    "Caddo River kayak rental",
    "Caddo River tube rental",
    "Caddo River cabins",
    "Caddo River camping",
    "Glenwood Arkansas canoe rental",
    "Glenwood Arkansas cabins",
    "Caddo River float trips",
    "Lucky's Canoe Rental",
  ],

  authors: [
    {
      name: site.name,
      url: site.url,
    },
  ],

  creator: site.name,
  publisher: site.name,
  category: "Outdoor recreation",

  alternates: {
    canonical: "/",
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "Caddo River Canoe, Kayak & Cabin Rentals | Lucky's",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: site.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Lucky's Canoe Rental on the Caddo River near Glenwood, Arkansas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Caddo River Canoe, Kayak & Cabin Rentals | Lucky's",
    description: site.description,
    images: [
      {
        url: site.defaultOgImage,
        alt: "Lucky's Canoe Rental on the Caddo River near Glenwood, Arkansas",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: googleVerification,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#327fbd",
  colorScheme: "light",
};

const sitewideSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": schemaIds.website,
      url: site.url,
      name: site.name,
      alternateName: site.alternateName,
      description: site.description,
      inLanguage: site.language,
      publisher: {
        "@id": schemaIds.business,
      },
    },
    {
      "@type": [
        "LocalBusiness",
        "SportsActivityLocation",
        "Campground",
      ],
      "@id": schemaIds.business,
      name: site.legalName,
      alternateName: [
        site.name,
        site.alternateName,
      ],
      description: site.description,
      url: site.url,

      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo),
        width: 147,
        height: 132,
      },

      image: [
        absoluteUrl("/seo/business-square.jpg"),
        absoluteUrl("/images/hero-caddo.jpg"),
        absoluteUrl("/seo/home-og.jpg"),
      ],

      telephone: site.phoneE164,
      email: site.email,

      address: {
        "@type": "PostalAddress",
        ...site.address,
      },

      areaServed: [
        {
          "@type": "City",
          name: "Glenwood, Arkansas",
        },
        {
          "@type": "Place",
          name: "Caddo River, Arkansas",
        },
      ],

      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        email: site.email,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },

      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Caddo River rentals and lodging",

        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Float trips and rentals",
            url: absoluteUrl("/float-trips"),

            itemListElement: [
              "Canoe rental",
              "Kayak rental",
              "Tube rental",
              "Raft rental",
            ].map((name) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name,
                provider: {
                  "@id": schemaIds.business,
                },
                areaServed: "Caddo River near Glenwood, Arkansas",
              },
            })),
          },
          {
            "@type": "Offer",
            url: absoluteUrl("/cabins"),
            itemOffered: {
              "@type": "Service",
              name: "Caddo River cabin rentals",
              provider: {
                "@id": schemaIds.business,
              },
            },
          },
          {
            "@type": "Offer",
            url: absoluteUrl("/camping"),
            itemOffered: {
              "@type": "Service",
              name: "Tent and RV camping",
              provider: {
                "@id": schemaIds.business,
              },
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <Header />

        <main id="main-content">
          {children}
        </main>

        <Footer />

        <JsonLd data={sitewideSchema} />
      </body>
    </html>
  );
}