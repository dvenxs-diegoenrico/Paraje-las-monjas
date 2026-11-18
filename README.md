# Paraje Las Monjas · sitio web

*Un jardín cuidado.* Production website for Paraje Las Monjas, a garden venue in Atlixco, Puebla.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion (`motion/react`, LazyMotion) · zod · Resend · Vercel.

```bash
pnpm install
cp .env.example .env.local   # fill in what you have; the site runs without it
pnpm dev                      # http://localhost:3000
pnpm build && pnpm start      # production build
pnpm lint && pnpm typecheck
pnpm test:e2e                 # Playwright smoke + axe (starts `pnpm start` on :3100 itself)
```

---

## Design language

| Idea | Where it lives |
|---|---|
| **Three planes.** Colossal type at the back, the subject in the middle overlapping it, actions on top. | `components/content/Hero.tsx` (home) and `components/content/PageHero.tsx` (inner pages) |
| **The subject breaks out.** El Arbolado's tree crowns are cut from the sky (`*-recorte.png`) and rise out of the arch over the headline. | `scripts/process_photos.py` makes the cut-out; `Hero.tsx` masks it so only the main crown escapes through the top of the arch |
| **Scallops.** Every crop, button and section hem shares one bump language. | `lib/scallop.ts` (SVG geometry → CSS masks), `.scallop-x` / `.scallop-top` utilities in `app/globals.css`, `components/base/Valance.tsx` |
| **Quiet motion.** Curtain-lift reveals, 8 s settle on hero images, slow parallax between planes, a seal that turns once a minute, growing underlines. Only `transform`/`opacity`. All of it turns off with `prefers-reduced-motion`. | `components/motion/*`, keyframes in `globals.css` |
| **Tokens only.** Cal, Piedra, Fronda, Tabique, Catarina, Viga, Cantera, Cal claro. No gold, no lime, no pure black/white. | `app/globals.css` (`:root` + `@theme`), mirrored in `lib/tokens.ts` |

Tailwind 4 has no `tailwind.config.ts`; tokens are declared with `@theme` in `app/globals.css` and used as `bg-cal`, `text-fronda`, etc.

## Structure

```
app/(es)/…            Spanish (default, lang="es-MX")
app/(en)/en/…         English (lang="en"); each tree has its own root layout
app/actions/inquiry.ts  Server Action: zod → honeypot → rate limit → Turnstile → Resend
components/
  base/               Button (scalloped), TextLink, Eyebrow, Rule, Valance
  brand/              Logo, Mark (+ generated mark-paths.ts)
  content/            Hero, PageHero, HomeSections, ScaleTabs, OfferCard, FAQ, CrossFade
  conversion/         InquiryForm, VisitCTA, StickyMobileBar
  layout/             Header, Footer, SiteShell (fonts, JSON-LD, analytics)
  media/              ScallopImage, Gallery + Lightbox
  motion/             MotionProvider, Reveal/Unveil, Drift, PageFade
  navigation/         MobileSheet, LanguageSwitch, useFocusTrap
  pages/              one component per page, shared by both languages
content/es.ts, en.ts  all copy, prices and facts
lib/                  i18n, images, scallop, seo, site, tokens, validators
public/brand/         logo kit (SVG)
scripts/              logo vectorizer, icon renderer, photo grading
_incoming/            client source files (raster logo, sample photos)
```

## Editing copy

All text is in **`content/es.ts`** (Spanish, primary) and **`content/en.ts`** (English). The English file is type-checked against the Spanish one, so a missing key fails the build. Prices live in `offers.items[].variants[].price` and are rendered as “Desde $X por invitado”; they only appear on `/planear` and `/celebraciones`.

The structure is CMS-ready: each page component receives a typed `Content` object, so Sanity (or any CMS) can replace `getContent()` later without touching components.

## Swapping photos

1. Drop the new file into `_incoming/` with the same name (e.g. `pabellon-cristal.jpg`), or add a new one.
2. `pnpm photos` — grades it (restrained greens, soft blacks), writes `public/images/` and refreshes sizes + blur placeholders in `lib/images.meta.json`.
3. If it is a new image, add an entry to `lib/images.ts` (alt text ES/EN, caption, chapter, optional focal point).

`next/image` serves AVIF/WebP at the right size. The hero cut-out (`jardin-arboles-1-recorte.png`) is generated automatically from the sky; if the new hero photo has no clear sky, the cut-out needs a manual mask.

### TODO · slots waiting for final photography

All current photos are **low-resolution placeholders** (435–1,286 px wide) extracted from the client's sample PDF. Every slot needs final photography; priority:

| Slot | Current file | Needs |
|---|---|---|
| Home hero (subject + cut-out) | `jardin-arboles-1.jpg` (543 px) | ≥ 2000 px, tree against open sky |
| Home editorial 21:9 | `salon-pilares.jpg` (1,286 px) | ≥ 2560 px landscape |
| Home editorial 3:2, El lugar · La Pradera | `jardin-multiusos-1.jpg` (543 px) | ≥ 2000 px landscape |
| Adentro y afuera, El lugar · Pabellón | `pabellon-cristal.jpg`, `mesa-cristal.jpg` | ≥ 1600 px |
| Galería · Noche | `salon-piedra.jpg` only | real night photography |
| Every inner-page arch | see `components/pages/*` | ≥ 1600 px portrait |

Direction: natural light, no HDR, restrained greens, no balloons or draped ceilings in frame, no signage, real people in motion. (Some placeholders show drapes and balloons; replace them first.)

## Logo kit

`public/brand/`: `logo-vertical.svg`, `logo-horizontal.svg`, `mark.svg`, `logo-vertical-light.svg`, `logo-horizontal-light.svg`, `mark-light.svg`, `logo-mono.svg`, `logo-horizontal-mono.svg`, `mark-mono.svg`. Favicons: `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`; OG image `public/og.png`.

The mark was **traced from the client's 728 × 819 raster** (`_incoming/logo-actual.jpg`): bricks and leaves are separated by colour, smoothed and fitted with bezier curves (`scripts/brand/build_logo.py`), then recoloured flat (Tabique, Viga top course, Fronda leaves). The wordmark is reset in Newsreader / Hanken Grotesk / DM Mono and outlined. Rebuild with `pnpm brand` (needs `opencv-python-headless numpy fonttools uharfbuzz`). The trace is clean at web sizes; for print, ask the client for the original vector file.

Rules: clear space = height of the top brick course; minimum mark 24 px, horizontal logo 140 px; no shadows, gradients, outlines or rotation.

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes, for the form | Resend API key |
| `INQUIRY_TO_EMAIL` | yes | recipient(s), comma-separated |
| `INQUIRY_FROM_EMAIL` | yes | verified Resend sender |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | recommended | Cloudflare Turnstile; if unset the widget is hidden and the server skips the check |
| `NEXT_PUBLIC_SITE_URL` | yes | canonical origin for metadata, sitemap, JSON-LD |

Without the Resend variables the form **fails safely**: it validates, then tells the visitor to use WhatsApp, and logs the misconfiguration server-side. The rate limit (5 per IP per 10 min) is in-memory per server instance; move it to Vercel KV/Upstash if spam appears.

## Quality checks

- `pnpm test:e2e`: every route in ES and EN (one `h1`, correct `lang`, axe WCAG 2.2 AA, no page errors) on desktop and Pixel 7, plus nav + language switch, WhatsApp links, server-side form validation, safe failure, lightbox keyboard/focus trap, keyboard tabs. In this sandbox: `PW_CHROMIUM=/opt/pw-browsers/chromium pnpm test:e2e`.
- Stray colours: `grep -rnoiE "#[0-9a-f]{6}" app components lib` should return only tokens (plus the documented light-logo tints `#C4694A`, `#7C9A83`).
- Lighthouse, mobile, on the Vercel production URL: performance 81, accessibility 100, best practices 100, SEO 100 (LCP 3.8 s, CLS 0, TBT 360 ms). Below the ≥ 95 target: the gap is JS weight (~225 KB gz: Next/React runtime ≈ 150 KB + Motion ≈ 35 KB) and the hero waiting on hydration. Next step if it matters: replace Motion with CSS + IntersectionObserver.

## Open items `[por confirmar]`

| Item | Where |
|---|---|
| Address | footer, `/visita`, privacy notice, JSON-LD (omitted) |
| Visiting hours | footer, `/visita` |
| Capacity per space / maximums | capacity footnote, FAQ |
| Legal name (razón social) and privacy contact email | `/aviso-de-privacidad` |
| Price of sound system and of the Irónico bottle | rental catalogue on `/planear` |
| Exact Facebook page URL | `lib/site.ts` (currently a search link) |
| Night photography | gallery chapter *Noche* |
| Final domain | `NEXT_PUBLIC_SITE_URL` |

Never replace these with guesses: tree species, dimensions, plans, orientation, year built, roof/beam materials, accessibility features, awards or press are deliberately absent.
