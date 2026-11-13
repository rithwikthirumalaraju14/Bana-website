# BANA Development Foundation

React + Vite website based on the supplied expanded PDF content and the Charido visual reference.

## Development

Run commands from `my-app`:

```sh
npm install
npm run dev -- --port=3000
```

`npm run build` creates `dist`; `npm run preview` previews the production build. `npm run lint` runs Oxlint.

## Pages and content

- Home: `#/`
- About Us: `#/about`
- Contact Us: `#/contact`
- Initiative links preselect the enquiry subject via `#/contact?subject=...`.
- Section links use `?section=initiatives`, `?section=education`, or `?section=questions`.
- Hash navigation works on static hosting without server rewrite rules.
- Copy, FAQ answers, subject options, and image URLs live in `src/content.js`.
- The design uses Geist typography, forest green, orange, white, muted green, and a navy founder panel.

## Enquiry delivery

By default the validated form opens a `mailto:` email draft addressed to `Venkat@banafoundation.in`. The visitor must send that draft in their email application. The interface describes this explicitly and never claims that a draft has been received.

To enable direct delivery, copy `.env.example` to `.env.local` and set `VITE_ENQUIRY_ENDPOINT` to your real form endpoint, then restart Vite or rebuild. The endpoint receives a JSON POST with `name`, `email`, `phone`, `locality`, `subject`, and `message`. It must accept the site's origin (CORS) and return a 2xx status only after accepting delivery. Server-side validation and delivery credentials belong on that server. Failure retains all visitor entries; successful delivery clears the form and shows the supplied confirmation copy. Requests time out after 20 seconds.

## Photography and publication

The remote photographs are illustrative images from the supplied theme reference. They are labelled as illustrative and are not represented as BANA project photographs. Replace the `images` URLs in `src/content.js` with client-approved photographs and update their alt text in `src/App.jsx` before publication. No founder portrait was supplied, so the founder section uses a typographic panel.

The approximately 520 scholarship students figure has no added reporting period. No donation, tax-benefit, testimonial, facility-capacity, or additional impact claims are included. Current service availability, charges, facility locations, and scholarship arrangements are directed to the Foundation as the brief specifies. Internal PDF handoff notes are excluded from public page copy.
