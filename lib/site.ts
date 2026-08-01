const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = (configuredUrl || "https://luckyscanoeandcabin.com").replace(/\/+$/, "");

export const site = {
  name: "Lucky's Canoe Rental",
  legalName: "Lucky's Canoe & Kayak Rental",
  alternateName: "Lucky's Canoe Rental & Campground",
  url: siteUrl,
  locale: "en_US",
  language: "en-US",
  description:
    "Canoe, kayak, tube, and raft rentals, cabin rentals, and camping on the Caddo River near Glenwood, Arkansas.",
  phoneDisplay: "870-356-2772",
  phoneE164: "+18703562772",
  phoneHref: "tel:+18703562772",
  email: "info@caddocanoeandkayak.com",
  address: {
    streetAddress: "Sweetgum Ln.",
    addressLocality: "Glenwood",
    addressRegion: "AR",
    postalCode: "71943",
    addressCountry: "US",
  },
  addressLines: ["Sweetgum Ln.", "Glenwood, Arkansas 71943"],
  mapQuery: "Sweetgum Lane, Glenwood, Arkansas 71943",
  hours: "9 AM–3 PM, seven days a week during the Caddo River canoe and kayak season",
  weatherUrl: "https://forecast.weather.gov/MapClick.php?lat=34.3268&lon=-93.5507",
  usgsUrl: "https://waterdata.usgs.gov/monitoring-location/07359610/",
  logo: "/images/luckys-logo.png",
  defaultOgImage: "/seo/home-og.jpg",
  hometownWebServicesUrl: "https://hometownwebservicesar.com",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/float-trips", label: "Float Trips" },
  { href: "/cabins", label: "Cabins" },
  { href: "/camping", label: "Camping" },
  { href: "/things-to-know", label: "Things To Know" },
] as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
