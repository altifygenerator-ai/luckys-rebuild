# Content notes for the first review

This build intentionally does not invent prices, routes, booking rules, or amenities that were not on the public website.

## Preserved from the current site

- Main five-page navigation
- Canoes, kayaks, tubes, and rafts
- Fishing and camping mentions
- Six-mile float description into Glenwood
- Three cabin sizes, porch sizes, amenities, rates, rules, and VRBO property numbers
- Supplied cabin photos grouped into Cabin One, Cabin Two, and Cabin Three galleries
- Supplied Lucky's river, launch, tube, kayak, canoe, and office photos placed in the matching site sections
- Tent and RV camping prices and listed amenities
- Arkansas waterway rules and suggested outing items
- Phone, email, website address formatting, and seasonal hours
- USGS station 07359610 river readings

## Confirm before launch

- Exact street address: the website says Sweetgum Ln.; Facebook shows 138 Sweet Gum Lane
- Seasonal hours versus Facebook's “Always open” display
- All current rental, camping, and cabin prices
- Current float routes, last put-in time, and raft availability
- Whether the three VRBO property numbers are still active
- Whether the contact email should remain info@caddocanoeandkayak.com

## Weather implementation

- The rebuilt blue weather strip uses the official National Weather Service point forecast for Glenwood/Caddo River.
- It displays the current hourly forecast, seven daytime highs with following nighttime lows, precipitation chance, and active weather alerts.
- It links back to the official NWS forecast and does not make river-operation decisions.

## Domain and SEO setup

- The configured default canonical URL is `https://luckyscanoeandcabin.com`.
- Change `NEXT_PUBLIC_SITE_URL` before the production build if the final domain is different.
- Page titles, descriptions, canonical tags, social-sharing images, sitemap entries, robots rules, breadcrumbs, and page-specific structured data are included.
- Search schema only contains details visible on the site or already preserved from the original public content.
- The footer includes a linked Hometown Web Services credit.
