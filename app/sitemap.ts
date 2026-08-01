import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const pages = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1,
    images: ["/seo/home-og.jpg", "/images/hero-caddo.jpg"],
  },
  {
    path: "/float-trips",
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: ["/seo/float-trips-og.jpg", "/images/river-scenic.jpg"],
  },
  {
    path: "/cabins",
    changeFrequency: "monthly" as const,
    priority: 0.9,
    images: ["/seo/cabins-og.jpg", "/images/cabins-aerial-hero.jpg"],
  },
  {
    path: "/camping",
    changeFrequency: "monthly" as const,
    priority: 0.85,
    images: ["/seo/camping-og.jpg", "/images/campground-guests.jpg"],
  },
  {
    path: "/things-to-know",
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: ["/seo/things-to-know-og.jpg", "/images/river-launch.jpg"],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images.map(absoluteUrl),
  }));
}
