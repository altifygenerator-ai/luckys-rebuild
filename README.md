# Lucky's Canoe Rental rebuild

A faithful Next.js rebuild of caddocanoeandkayak.com. This version deliberately follows the original blue Lucky's design instead of replacing it with a generic outdoor template. It keeps the five-page structure and verified public content while improving mobile use, accessibility, SEO, forms, river readings, and weather reliability.

## Included pages

- Home
- Float Trips
- Cabins
- Camping
- Things To Know

## Visual direction

- Original Lucky's blue and white color system
- Supplied Lucky's logo in the overlapping header position
- Blue photographic hero treatments and wave dividers inspired by the original site
- Original-style Tube, Canoe, and Kayak photo blocks using the supplied Lucky's river photos
- Cabin One, Cabin Two, and Cabin Three galleries with the supplied interior, exterior, porch, and river-view photos
- Keyboard-accessible cabin photo lightbox with previous, next, and close controls
- Simple rectangular buttons and straightforward sections instead of rounded SaaS cards or invented tourism content
- Responsive navigation and a mobile Call / Email / Directions bar

## Weather

`/api/weather` uses the official National Weather Service API for the Glenwood/Caddo River point.

- Current hourly forecast
- Seven daytime forecast periods
- Precipitation chance when provided
- Active local weather alert banner
- 30-minute server cache with stale-while-revalidate support
- Required NWS identifying User-Agent header
- Graceful unavailable state with a link to the official NWS forecast

## River data

`/api/river` uses USGS station **07359610 — Caddo River near Caddo Gap**.

- Latest values from the modern USGS Water Data API
- 48-hour history from the official USGS Water Services endpoint
- Five-minute cache
- Graceful fallback when one endpoint is unavailable
- No automatic claim that the river is safe, open, or closed

## Contact form

The contact form posts to `/api/contact` and sends through Resend.

1. Copy `.env.example` to `.env.local`.
2. Add a Resend API key.
3. Set `CONTACT_FROM_EMAIL` to an address on a verified sending domain.
4. Confirm `CONTACT_TO_EMAIL`.

Until those variables are set, the form tells visitors to call Lucky's instead of silently losing their message.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Before launch

The old site and Facebook currently conflict on the exact street formatting and hours. This build preserves the website's existing public details:

- Sweetgum Ln., Glenwood, Arkansas 71943
- 9 AM–3 PM, seven days a week during the season

Confirm these before publishing. Also confirm all prices, cabin rules, current float routes, and current raft availability.

## Existing URL redirects

- `/floattrips` and the old `?page_id=2345` route redirect to `/float-trips`
- `/thingstoknow` redirects to `/things-to-know`
