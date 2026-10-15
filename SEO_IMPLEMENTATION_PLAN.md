# Static Pre-Rendering Implementation Plan: Expeditions George of the Jungle (EGJ)

**Document Type:** Technical Implementation & Architecture Specification  
**Project:** Expeditions George of the Jungle (`egjFrontEnd`)  
**Target Environment:** React 19.1.0, Vite 7.0.4, React Router DOM 7.7.1, Vercel  
**Status:** Planning & Architectural Assessment (Read-Only Preparation)  
**Date:** 2026-10-16  
**File Reference:** `SEO_IMPLEMENTATION_PLAN.md`  

---

## 1. Executive Summary & Verified Baseline

### 1.1 Verified Codebase Facts (from source inspection)
- **Frontend Framework & Tooling:** React 19.1.0, React DOM 19.1.0, Vite 7.0.4, `@tailwindcss/vite` 4.1.11, Sass 1.93.2.
- **Routing:** React Router DOM 7.7.1 in client-side library mode (`BrowserRouter` in `src/main.jsx`, `Routes`/`Route` in `src/App.jsx`).
- **Authentication:** `@clerk/clerk-react` 5.36.0 wrapping the root in `src/main.jsx`; Zustand 5.0.8 storing user session token in `localStorage`.
- **Tour Data Architecture:**
  - The tour card overview (`/tour`, rendered by `CardsSection.jsx`) makes a runtime client-side Axios call (`getTours()` -> `GET /api/v1/tour`).
  - Individual tour detail pages (`/tour/gamboa-sacambu`, `/tour/2-days-1-night`, `/tour/3-days-2-nights`, `/tour/4-days-3-nights`, `/tour/5-days-4-nights`, `/tour/ayahuasca`) **do not fetch from the API**. Their itineraries, inclusions, exclusions, and FAQs are statically defined in JSX, with pricing imported from `src/constants/tourPricing.js`.
- **Hosting & Routing:** Vercel static deployment governed by `egjFrontEnd/vercel.json`, which currently rewrites all paths `/(.*)` to `/` (SPA fallback).
- **Current SEO State:** Single static `<title>` in `index.html`, zero `<meta name="description">`, zero Open Graph tags, and an empty `<div id="root"></div>` on initial byte delivery.

### 1.2 Objective
Implement static pre-rendering (SSG) for all 12 public routes so crawlers (Googlebot, Bingbot, social media scrapers) receive fully populated, semantic HTML with route-specific metadata on the first byte, without risking Clerk authentication, Stripe checkout, or client-side navigation.

---

## 2. Exact Files Requiring Changes

The following files would need modifications or additions during implementation. **No changes have been made in this review.**

| File Path | Change Type | Purpose & Scope |
|---|---|---|
| `egjFrontEnd/package.json` | Modification | Add pre-render build script (`build:prerender`) and required dev dependencies (e.g., `react-helmet-async` for metadata, Puppeteer/headless snapshot tool for build-time rendering). |
| `egjFrontEnd/index.html` | Modification | Add placeholder slots or default fallback tags for title, meta description, and social sharing. |
| `egjFrontEnd/src/main.jsx` | Modification | Wrap `<App />` with `<HelmetProvider>` to allow route components to declare head metadata. |
| `egjFrontEnd/src/components/SEO.jsx` | **New File** | Reusable component managing `<Helmet>` tags: title, meta description, canonical URL, Open Graph, and JSON-LD structured data. |
| `egjFrontEnd/src/pages/*.jsx` (12 routes) | Modification | Import and render `<SEO ... />` with route-specific titles, descriptions, and structured data schemas. |
| `egjFrontEnd/scripts/prerender.js` | **New File** | Post-build Node.js automation script: launches a local preview server of `dist/`, crawls the 12 public routes via headless Chromium, waits for network idle, and outputs static `index.html` files into route folders in `dist/`. |
| `egjFrontEnd/src/assets/API/Services/ToursService.js` | Modification | Add a fallback static cache for `getTours()` so `/tour` never renders empty if the backend is down during a build. |
| `egjFrontEnd/vercel.json` | Modification | Add `"cleanUrls": true` and configure static file routing rules so nested static HTML files take precedence over the root SPA rewrite. |

---

## 3. Compatibility Assessment: React 19 & Vite 7

### 3.1 The Two Approaches to Pre-Rendering
When pre-rendering a React application, two distinct paradigms exist:

#### Approach A: Node.js SSR-based Prerendering (`react-dom/server` + Vite SSR)
- In this model, Vite bundles a server entry (`entry-server.jsx`), and Node runs `renderToString(<App />)`.
- **Compatibility Risk: HIGH.**
  1. **Clerk Incompatibility:** `@clerk/clerk-react` 5.36.0 strictly requires browser globals (`window`, `document`, `localStorage`). Calling `renderToString` on the current tree throws runtime `ReferenceError: window is not defined` unless extensive client-only guards or an architectural rewrite to `@clerk/react-router` is performed.
  2. **Browser Global Violations:** Existing components contain direct browser references outside `useEffect` (e.g., `window.scrollY` in `ScrollToTop`, `IntersectionObserver` checks in `DeferredGoogleReviews`).
  3. **React 19 Server Boundaries:** React 19 server rendering has breaking changes in hydration error handling and legacy string refs that affect older Vite SSR plugins.

#### Approach B: Headless Browser Post-Build Pre-Rendering (Recommended)
- In this model, Vite runs its standard production build (`vite build`), producing the standard browser bundle in `dist/`.
- A lightweight post-build script runs `vite preview` on a local port, uses Puppeteer/headless Chromium to visit the 12 routes, waits for DOM ready and network idle, and saves `document.documentElement.outerHTML` into `dist/<route>/index.html`.
- **Compatibility Assessment: 100% COMPATIBLE.**
  - **Verified Fact:** The application already builds and runs cleanly in Chromium (Vite 7 + React 19).
  - **Zero Node/Browser Conflicts:** Clerk executes in its native browser context; it simply sees an unauthenticated user and renders the public header.
  - **Zero Third-Party Library Conflicts:** `motion/react` (Framer Motion), `swiper`, Sass modules, and `@tailwindcss/vite` execute exactly as they do in production.
  - **Zero Production Runtime Overhead:** No server runtime is introduced.

---

## 4. Per-Route Metadata & Structured Data Matrix

To eliminate the single static title problem identified in finding `SEO-001`, each public route must be mapped to distinct metadata:

| Route | Canonical URL | Pre-Rendered Page Title | Meta Description Target | Primary JSON-LD Schema |
|---|---|---|---|---|
| `/` | `https://www.expeditionsgeorgeofthejungle.com/` | Amazon Jungle Tours Leticia Colombia \| Expeditions George of the Jungle | Certified English-speaking guided tours into the Colombian Amazon rainforest from Leticia. Wildlife treks, river expeditions, and indigenous cultural experiences. | `TouristInformationCenter` / `TravelAgency` |
| `/about` | `https://www.expeditionsgeorgeofthejungle.com/about` | About George of the Jungle \| 30+ Years Amazon Tourism Pioneer | Learn the story of George, an Amazonian icon with over 30 years guiding expeditions from Leticia across Colombia, Brazil, and Peru. | `AboutPage`, `Person` |
| `/tour` | `https://www.expeditionsgeorgeofthejungle.com/tour` | Amazon Expedition Tour Packages \| 2 to 5 Day Rainforest Treks | Explore all-inclusive Amazon rainforest tour packages from Leticia. Day trips, multi-day jungle survival, and traditional ayahuasca ceremonies. | `CollectionPage`, `ItemList` |
| `/tour/gamboa-sacambu` | `https://www.expeditionsgeorgeofthejungle.com/tour/gamboa-sacambu` | Full Day Gamboa & Sacambu Amazon Tour \| Expeditions George of the Jungle | One-day Amazon river cruise, canopy jungle trek, Peruvian indigenous community visit, and pink dolphin spotting. | `TouristTrip` |
| `/tour/2-days-1-night` | `https://www.expeditionsgeorgeofthejungle.com/tour/2-days-1-night` | 2 Days, 1 Night Amazon Jungle Expedition \| Leticia Colombia | Overnight Amazon tour: river navigation to Gamboa, caiman spotting, night wildlife walks, and canoe lake exploration. | `TouristTrip` |
| `/tour/3-days-2-nights` | `https://www.expeditionsgeorgeofthejungle.com/tour/3-days-2-nights` | 3 Days, 2 Nights Amazon Rainforest Tour \| Leticia, Colombia | Deeper Amazon exploration featuring jungle survival skills, medicinal plant foraging, piranha fishing, and night expeditions. | `TouristTrip` |
| `/tour/4-days-3-nights` | `https://www.expeditionsgeorgeofthejungle.com/tour/4-days-3-nights` | 4 Days, 3 Nights Deep Amazon Jungle Expedition \| Leticia | Immersive 4-day rainforest adventure with indigenous community stays, flooded forest navigation, and nocturnal wildlife tracking. | `TouristTrip` |
| `/tour/5-days-4-nights` | `https://www.expeditionsgeorgeofthejungle.com/tour/5-days-4-nights` | 5 Days, 4 Nights Ultimate Amazon Expedition \| Leticia Colombia | The complete Amazon experience: remote wilderness routes, layered wildlife encounters, and flexible pacing led by bilingual guides. | `TouristTrip` |
| `/tour/ayahuasca` | `https://www.expeditionsgeorgeofthejungle.com/tour/ayahuasca` | Traditional Ayahuasca Ceremony Experience \| Leticia Colombia | Sacred Amazonian plant medicine ceremony led by an experienced indigenous shaman in a safe, controlled, and respectful environment. | `TouristTrip` |
| `/contact` | `https://www.expeditionsgeorgeofthejungle.com/contact` | Contact Us \| Expeditions George of the Jungle Leticia | Get in touch for tour reservations, custom expedition quotes, or travel inquiries. Office located in Barrio Centro, Leticia, Amazonas. | `ContactPage` |
| `/refund-policy` | `https://www.expeditionsgeorgeofthejungle.com/refund-policy` | Booking Deposit & Refund Policy \| Expeditions George of the Jungle | Terms, cancellation policies, and deposit conditions for Amazon expedition reservations. | `WebPage` |
| `/privacy-policy` | `https://www.expeditionsgeorgeofthejungle.com/privacy-policy` | Privacy Policy \| Expeditions George of the Jungle | Privacy practices, GDPR and CCPA disclosures for website visitors and booked travellers. | `WebPage` |

### 4.1 Open Graph Protocol Embeds
Each route's static HTML must include:
```html
<meta property="og:site_name" content="Expeditions George of the Jungle" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.expeditionsgeorgeofthejungle.com/tour/2-days-1-night" />
<meta property="og:title" content="2 Days, 1 Night Amazon Jungle Expedition" />
<meta property="og:description" content="Overnight Amazon tour with caiman spotting and night wildlife walks." />
<meta property="og:image" content="https://www.expeditionsgeorgeofthejungle.com/assets/card1-BE7c8iAQ.webp" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 5. Dynamic Tour Data Loading & Build-Time Fault Tolerance

### 5.1 Architecture of Tour Data
- **Verified Fact:** Only `CardsSection.jsx` (rendered on `/tour`) calls `getTours()` from `ToursService.js` at runtime.
- **Verified Fact:** The six tour detail pages do not query the backend; their copy is in JSX and their pricing is imported from `tourPricing.js`.

### 5.2 Failure Mode Analysis: API Down During Pre-Render Build
If the Vercel backend serverless function is sleeping (cold start), failing, or if the build runs in an isolated network environment without backend connectivity:
1. `CardsSection.jsx`'s `useEffect` catches the error: `console.error("Error fetching tours:", error)`.
2. The `tours` state remains an empty array `[]`.
3. The pre-rendered snapshot of `/tour/index.html` would be saved with **zero tour cards**, freezing an empty catalog into the static production HTML until the next deployment.

### 5.3 Resilient Solution: Two-Tier Build Cache
To make builds deterministic and 100% resilient to API downtime:
1. **Fallback Seed File (`src/constants/fallbackTours.json`):** Export the baseline tour metadata (names, descriptions, image URLs) directly into the frontend repository.
2. **Resilient Service Function:** Update `ToursService.js` so that if `apiGet("/tour")` times out or fails (HTTP 5xx, network error), it resolves with `fallbackTours.json` instead of throwing an unhandled rejection.
3. **Build Outcome:** `/tour` always renders all 6 tour cards during pre-rendering, regardless of backend status. In production runtime, live API data will revalidate and replace the fallback once the client mounts.

---

## 6. Vercel Routing Configuration

### 6.1 Current Vercel Behavior
Currently, `egjFrontEnd/vercel.json` contains:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
This forces all requests to the root `index.html`.

### 6.2 Pre-Rendered Directory Structure
The pre-render script outputs static files matching the URL structure inside `dist/`:
```text
dist/
├── index.html                           (Homepage pre-rendered)
├── about/
│   └── index.html                       (About page pre-rendered)
├── tour/
│   ├── index.html                       (Tour catalog pre-rendered)
│   ├── 2-days-1-night/
│   │   └── index.html                   (2D/1N tour pre-rendered)
│   ├── 3-days-2-nights/
│   │   └── index.html
│   ├── 4-days-3-nights/
│   │   └── index.html
│   ├── 5-days-4-nights/
│   │   └── index.html
│   ├── gamboa-sacambu/
│   │   └── index.html
│   └── ayahuasca/
│       └── index.html
├── contact/
│   └── index.html
├── sitemap.xml
└── robots.txt
```

### 6.3 Target `vercel.json` Configuration
To ensure Vercel serves the exact pre-rendered file without redirect loops while maintaining the SPA fallback for un-prerendered or dynamic URLs:
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/((?!api/|.*\\..*).*)",
      "destination": "/$1/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- **Direct Visit (`GET /tour/2-days-1-night`):** Vercel locates `dist/tour/2-days-1-night/index.html` on the Edge CDN and serves it with HTTP 200 immediately. Crawlers see the fully rendered page.
- **Client-Side Navigation:** When a user clicks `<Link to="/tour/2-days-1-night">`, React Router intercepts the click and swaps the view in-memory without making an HTTP request to Vercel.

---

## 7. Risks & Verification Test Cases

| Area | Potential Risk | Mitigation in Pre-Rendering | Verification Test Case |
|---|---|---|---|
| **Clerk Authentication** | Headless crawler crashes trying to read auth cookies or user state. | Crawler runs in a pristine incognito context. `useUser()` evaluates to `{ isSignedIn: false }`. Public navigation renders with standard "Book Now" / "Pay Now" buttons. | Run snapshot script and verify terminal logs for zero Clerk exceptions. |
| **Clerk Client Hydration** | Logged-in user refreshes page; React 19 hydration mismatch occurs between static logged-out HTML and dynamic user state. | Wrap Clerk's dynamic user indicators (`UserButton`, admin buttons) in a mounted check or standard React 19 boundary. | Log in with a test Clerk account, refresh `/tour/2-days-1-night`, verify `UserButton` mounts cleanly without UI flickering. |
| **Stripe Checkout** | Modal state or Stripe redirect logic triggers during build snapshot. | `BookingModal` is gated by `showModal = useState(false)` and only mounts on user interaction (`openModal`). | Verify pre-rendered HTML contains zero modal markup or Stripe session creation scripts. |
| **Booking & Pay Now Modals** | Client interaction broken after hydration. | The client JavaScript bundle (`dist/assets/index-*.js`) hydrates the pre-rendered DOM, attaching event listeners. | Open a pre-rendered tour page, click "Booking Reservation", complete Step 1, verify Step 2 opens and redirects to Stripe Checkout. |
| **Direct URL Visits** | Direct browser request returns 404 or an unstyled flash. | Vercel's cleanUrls serves the pre-rendered HTML containing bundled CSS links in the `<head>`. | Open an incognito browser window, paste `https://www.expeditionsgeorgeofthejungle.com/tour/3-days-2-nights` directly, verify immediate styled render. |
| **Browser Refreshes** | Refreshing on a sub-route resets the state or crashes React Router. | `ScrollToTop` component in `App.jsx` handles state resets gracefully; pre-rendered HTML provides instant markup before JS executes. | Navigate through 3 routes, press `F5` / `Ctrl+R` on `/tour/5-days-4-nights`, verify page stays on route and retains styling. |

---

## 8. Rollback Plan & Validation Suite

### 8.1 Rollback Plan
If any unforeseen issue occurs during deployment (e.g., build timeout on Vercel or hydration error):

1. **Instant Vercel Rollback (Zero Downtime, < 30 seconds):**
   - Go to **Vercel Dashboard > Expeditions George of the Jungle > Deployments**.
   - Find the previous known-healthy deployment (commit `67343f6` or `2b332e4`).
   - Click the three dots (`...`) -> **Promote to Production**. Vercel will instantly repoint domain traffic to the previous build artifact.
2. **Git Revert:**
   - Run `git revert HEAD` to create a clean rollback commit.
   - Run `git push origin main`.
3. **Build Script Decoupling:**
   - Keep the standard `vite build` script unchanged. Define pre-rendering as a separate command (`npm run build:prerender`). If pre-rendering fails, the standard SPA build can be deployed immediately without code changes.

### 8.2 Validation Command Suite (Post-Implementation)

Run these automated terminal checks after pre-rendering to confirm indexing readiness before releasing:

```bash
# 1. Verify build output contains index.html files for every route
ls -la egjFrontEnd/dist/tour/2-days-1-night/index.html
ls -la egjFrontEnd/dist/tour/ayahuasca/index.html
ls -la egjFrontEnd/dist/about/index.html

# 2. Raw HTML inspection (simulate a non-JS search bot)
# Confirm that tour titles and itineraries are present in raw HTML
curl -s http://localhost:4173/tour/2-days-1-night | grep -i "caiman"
curl -s http://localhost:4173/tour/2-days-1-night | grep -i "<title>2 Days, 1 Night"

# 3. Confirm Open Graph image and meta description exist on raw HTML
curl -s http://localhost:4173/tour/gamboa-sacambu | grep -i "og:image"
curl -s http://localhost:4173/tour/gamboa-sacambu | grep -i "description"

# 4. Confirm JSON-LD structured data is present
curl -s http://localhost:4173/tour/ayahuasca | grep -i "application/ld+json"

# 5. Verify robots.txt and sitemap.xml remain intact in dist
curl -s http://localhost:4173/robots.txt | grep -i "Sitemap:"
curl -s http://localhost:4173/sitemap.xml | grep -i "<loc>"
```
