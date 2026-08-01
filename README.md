# Lucky's Canoe Rental rebuild

A faithful Next.js rebuild of Lucky's original website. The design follows the original blue-and-white river-outfitter style instead of replacing it with a generic outdoor template. It keeps the five-page structure and verified public content while improving mobile use, accessibility, search visibility, forms, river readings, and weather reliability.

## Included pages

- Home
- Float Trips
- Cabins
- Camping
- Things To Know
- Branded 404 page

## Visual direction

- Original Lucky's blue and white color system
- Supplied Lucky's logo in the overlapping header position
- Blue photographic hero treatments and wave dividers inspired by the original site
- Original-style Tube, Canoe, and Kayak photo blocks using supplied Lucky's river photos
- Cabin One, Cabin Two, and Cabin Three galleries with supplied interior, exterior, porch, and river-view photos
- Keyboard-accessible cabin photo lightbox with previous, next, and close controls
- Simple rectangular buttons and straightforward sections instead of rounded SaaS cards or invented tourism content
- Responsive navigation and a mobile Call / Email / Directions bar
- Linked “Website by Hometown Web Services” credit in the footer

## SEO and structured data

The default canonical site URL is:

```text
https://luckyscanoeandcabin.com
```

Change `NEXT_PUBLIC_SITE_URL` before building if the final domain changes. The SEO setup includes:

- Unique title and description metadata for every public page
- Canonical URLs based on one configurable site URL
- Page-specific Open Graph and Twitter metadata
- Five custom 1200 × 630 social-sharing images made from the supplied Lucky's photos
- LocalBusiness, SportsActivityLocation, Campground, WebSite, WebPage, Service, LodgingBusiness, VacationRental, Offer, and BreadcrumbList JSON-LD where the content supports it
- No fabricated reviews, ratings, hours, prices, or amenities in schema
- Image sitemap entries for each page
- Robots rules that allow public pages and keep API routes out of search results
- Web app manifest, blue Lucky's favicon, and Apple touch icon
- Optional Google Search Console verification through `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- Permanent redirects from the old WordPress route names

After launch, add the domain to Google Search Console, submit `/sitemap.xml`, and validate live pages with Google’s Rich Results Test and Schema Markup Validator.

## Weather

`/api/weather` uses the National Weather Service API for the Glenwood/Caddo River point.

- Current hourly forecast
- Seven daytime forecast periods
- Precipitation chance when provided
- Active local weather alert banner
- 30-minute server cache with stale-while-revalidate support
- Identifying User-Agent header
- Graceful unavailable state with a link to the official NWS forecast

## River data

`/api/river` uses USGS station **07359610 — Caddo River near Caddo Gap**.

- Latest values from the USGS Water Data API
- 48-hour history from the USGS Water Services endpoint
- Five-minute cache
- Graceful fallback when one endpoint is unavailable
- No automatic claim that the river is safe, open, or closed

## Contact form

The contact form posts to `/api/contact` and sends through Resend.

1. Copy `.env.example` to `.env.local`.
2. Add the Resend API key to `.env.local` and Vercel only.
3. Keep `CONTACT_FROM_EMAIL` on the verified `hometownwebservicesar.cc` sending domain.
4. Confirm `CONTACT_TO_EMAIL` before launch.

Until those variables are set, the form tells visitors to call Lucky's instead of silently losing their message.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Before launch

The old website and Facebook currently conflict on exact street formatting and hours. This build preserves the website details already used in the rebuild:

- Sweetgum Ln., Glenwood, Arkansas 71943
- 9 AM–3 PM, seven days a week during the season

Confirm those details before publishing. Also confirm prices, cabin rules, current float routes, raft availability, the contact email, and the final domain.

## Existing URL redirects

- `/floattrips` and the old `?page_id=2345` route redirect to `/float-trips`
- `/thingstoknow` redirects to `/things-to-know`

When both the old and new domains are attached to Vercel, configure the old domain to redirect to the canonical domain in Vercel so old backlinks and bookmarks carry over.
