import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucky's Canoe Rental",
    short_name: "Lucky's",
    description: "Caddo River float trips, cabin rentals, and camping near Glenwood, Arkansas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#327fbd",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
