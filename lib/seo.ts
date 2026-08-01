import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export const schemaIds = {
  website: `${site.url}/#website`,
  business: `${site.url}/#business`,
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  image,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  type?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: site.language,
    isPartOf: { "@id": schemaIds.website },
    about: { "@id": schemaIds.business },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(image),
    },
  };
}
