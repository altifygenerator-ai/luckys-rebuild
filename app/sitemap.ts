import type { MetadataRoute } from "next";
import { cabins } from "@/lib/cabins";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/seo/home-og.jpg"),
        absoluteUrl("/images/hero-caddo.jpg"),
      ],
    },
    {
      url: absoluteUrl("/float-trips"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        absoluteUrl("/seo/float-trips-og.jpg"),
        absoluteUrl("/images/river-scenic.jpg"),
      ],
    },
    {
      url: absoluteUrl("/cabins"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        absoluteUrl("/seo/cabins-og.jpg"),
        absoluteUrl("/images/cabins-aerial-hero.jpg"),
      ],
    },
    {
      url: absoluteUrl("/camping"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      images: [
        absoluteUrl("/seo/camping-og.jpg"),
        absoluteUrl("/images/campground-guests.jpg"),
      ],
    },
    {
      url: absoluteUrl("/things-to-know"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      images: [
        absoluteUrl("/seo/things-to-know-og.jpg"),
        absoluteUrl("/images/river-launch.jpg"),
      ],
    },
  ];

  const cabinPages: MetadataRoute.Sitemap = cabins.map((cabin) => {
    const imagePaths = [
      cabin.coverImage,
      ...cabin.photos.slice(0, 4).map((photo) => photo.src),
    ];

    return {
      url: absoluteUrl(`/cabins/${cabin.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
      images: [...new Set(imagePaths)].map((image) => absoluteUrl(image)),
    };
  });

  return [...staticPages, ...cabinPages];
}