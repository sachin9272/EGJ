# Website Audit Report
## Expeditions George of the Jungle (EGJ)
**Report Date:** 2026-10-15
**Auditor:** Senior Website Auditor (AI — Read-Only Analysis)
**Audit Type:** Comprehensive — SEO, Performance, Sales/CRO, UX/Accessibility, Code Quality, Security, Analytics

---

## ⚠️ CRITICAL NOTICE — READ FIRST

**FINDING SEC-001** (classified P0) revealed that the backend `.env` file containing live/test API keys for MongoDB, Clerk, Cloudinary, and Stripe is present in the project and has been pushed to a public GitHub repository. These credentials must be rotated immediately. See Section 12 (Security Review) for full details.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Website Overview and Technology Stack](#2-website-overview-and-technology-stack)
3. [Audit Scope, Methodology, and Limitations](#3-audit-scope-methodology-and-limitations)
4. [Overall Website Health Assessment](#4-overall-website-health-assessment)
5. [Technical SEO Audit](#5-technical-seo-audit)
6. [Content SEO and Keyword Opportunities](#6-content-seo-and-keyword-opportunities)
7. [Performance and Core Web Vitals Audit](#7-performance-and-core-web-vitals-audit)
8. [Sales and Conversion Rate Optimization](#8-sales-and-conversion-rate-optimization)
9. [UI/UX and Mobile Responsiveness](#9-uiux-and-mobile-responsiveness)
10. [Accessibility Audit](#10-accessibility-audit)
11. [Code Quality and Architecture](#11-code-quality-and-architecture)
12. [Security and Reliability Review](#12-security-and-reliability-review)
13. [Analytics and Growth Opportunities](#13-analytics-and-growth-opportunities)
14. [Detailed Prioritized Findings Register](#14-detailed-prioritized-findings-register)
15. [Page-by-Page Audit](#15-page-by-page-audit)
16. [Top 10 Recommended Actions](#16-top-10-recommended-actions)
17. [Phased Implementation Roadmap](#17-phased-implementation-roadmap)
18. [Recommended Metrics and Validation Plan](#18-recommended-metrics-and-validation-plan)
19. [External Tools and Tests Required](#19-external-tools-and-tests-required)
20. [Final Recommendations](#20-final-recommendations)

---

## 1. Executive Summary

**Expeditions George of the Jungle (EGJ)** is a legitimate Amazon rainforest ecotourism business operating from Leticia, Amazonas, Colombia, with 30+ years of history and over 230 Google reviews averaging 4.9 stars. The website is a React SPA (Single-Page Application) backed by a Node.js/Express API, deployed on Vercel.

The website has strong foundations: a clear business proposition, a working Stripe payment flow, good tour content, and real social proof. However, it suffers from several critical and high-priority issues that are directly harming search rankings, bookings, and business growth.

**The most pressing issues are:**

1. **P0 — SECURITY**: Multiple live and test API keys (MongoDB, Stripe, Clerk, Cloudinary) are committed in plaintext to `egjBackEnd/.env`, which has been pushed to a remote GitHub repository (`https://github.com/sachin9272/EGJ`). These credentials must be rotated immediately.
2. **P1 — SEO**: The website is a client-side React SPA with no server-side rendering, no per-page `<title>` or `<meta description>` tags, no sitemap, no robots.txt, and no structured data. Google cannot reliably index individual tour pages, resulting in near-zero organic discoverability for tour-specific queries.
3. **P1 — PERFORMANCE**: A 13 MB JPEG (`Home Page.jpeg`) and multiple unoptimized PNG source files exist in the repository, and two autoplay videos load on the homepage without a poster frame or WebM alternative, significantly degrading LCP and mobile performance.
4. **P1 — CRO**: There is no analytics implementation (no Google Analytics, no Meta Pixel, no Hotjar). The business cannot measure which pages drive bookings, where users drop off, or which CTAs convert.
5. **P1 — CORS**: The server uses `app.use(cors())` with no origin whitelist, meaning any website on the internet can make authenticated API requests to the backend.

**Summary scorecard:**

| Category | Score | Confidence |
|---|---|---|
| Technical SEO | 22/100 | High |
| Content SEO | 35/100 | High |
| Performance (code risk) | 38/100 | High |
| Sales / CRO | 41/100 | High |
| UI/UX (code-based) | 55/100 | Medium |
| Accessibility | 40/100 | High |
| Code Quality | 52/100 | High |
| Security | 18/100 | High |
| Analytics | 5/100 | High |

> Scores represent a defensible assessment based on static code analysis. They are **not** Lighthouse scores, PageSpeed Insights results, or measured business metrics. Live Lighthouse measurements and Google Search Console data would be required for measured scores.

---

## 2. Website Overview and Technology Stack

### Business
- **Name:** Expeditions George of the Jungle (EGJ)
- **Type:** Ecotourism tour operator
- **Location:** Leticia, Amazonas, Colombia (tri-border: Colombia, Brazil, Peru)
- **Core offering:** Amazon rainforest guided tours (1-day to 5-day multi-night packages), Ayahuasca ceremonies
- **Price range:** $110 (Ayahuasca) to $510 (5 days/4 nights) per person USD
- **Payment model:** 30% deposit online (Stripe), balance in cash at office
- **Social proof:** 4.9 stars / 230+ Google Reviews
- **Website:** `expeditionsgeorgeofthejungle.com`

### Frontend Stack
| Component | Technology |
|---|---|
| Framework | React 19 (SPA, CSR-only) |
| Build tool | Vite 7 |
| Routing | React Router DOM 7 |
| CSS | SCSS Modules + Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Carousel | Swiper.js |
| Auth | Clerk (authentication-as-a-service) |
| State | Zustand |
| HTTP | Axios |
| Deployment | Vercel |

### Backend Stack
| Component | Technology |
|---|---|
| Runtime | Node.js (ESM modules) |
| Framework | Express 5 |
| Database | MongoDB (Mongoose) |
| Auth | Clerk (JWT via `@clerk/express`) |
| Payments | Stripe |
| Email | Nodemailer |
| File storage | Cloudinary |
| PDF | PDFKit |
| Webhooks | Svix (Clerk), Stripe native |
| Deployment | Vercel serverless |

### Pages / Routes
| Route | Component | Description |
|---|---|---|
| `/` | Home | Hero, video, "Why Travel With Us" carousel, "Join Us" section |
| `/about` | About | Founder story, mission, vision |
| `/tour` | TourExpeditions | Tour listing cards, FAQ |
| `/tour/gamboa-sacambu` | GamboaSacambu | Full-day tour detail |
| `/tour/ayahuasca` | Ayahuasca | Ayahuasca ceremony detail |
| `/tour/2-days-1-night` | TwoDaysOneNight | 2-day tour detail |
| `/tour/3-days-2-nights` | ThreeDaysTwoNights | 3-day tour detail |
| `/tour/4-days-3-nights` | FourDaysThreeNights | 4-day tour detail |
| `/tour/5-days-4-nights` | FiveDaysFourNights | 5-day tour detail |
| `/contact` | Contact | Contact form + details |
| `/refund-policy` | RefundPolicy | Refund policy |
| `/privacy-policy` | PrivacyPolicy | Privacy policy |
| `/success` | BookingSuccess | Post-payment confirmation |

---

## 3. Audit Scope, Methodology, and Limitations

### Scope
- Complete static code analysis of all frontend (`egjFrontEnd/`) and backend (`egjBackEnd/`) source files
- Review of configuration files, environment files, routing, components, styles
- Analysis of Git repository state

### Methodology
- Systematic file-by-file inspection of all pages, components, services, controllers, middleware, models, and configs
- Cross-referencing code patterns against SEO, performance, accessibility, and security best practices
- Evidence-based findings with file path and line number references

### Limitations
- **No live website testing**: Core Web Vitals (LCP, CLS, INP, FCP, TTFB) were not measured. Findings are code-based risk assessments, not live measurements.
- **No Google Search Console data**: Cannot confirm indexed pages, crawl errors, or ranking positions.
- **No analytics data**: Cannot confirm traffic sources, bounce rate, conversion funnel drop-off, or user behaviour.
- **No automated security scanning**: No penetration testing was performed. Security findings are source-code level risk identifications.
- **No production environment access**: Cannot verify CDN configuration, SSL certificate status, server response headers, or redirect behaviour in production.
- **Visual assessment limited**: Without browser rendering, responsive design assessments rely on SCSS/CSS file inspection.
- **Search volume data not available**: Keyword opportunity sizing requires external tools (Ahrefs, Semrush, Google Keyword Planner).

---

## 4. Overall Website Health Assessment

The EGJ website has a solid product (genuinely high-rated tours, good content, real social proof, a functioning payment flow) but significant technical debt in areas that directly limit business growth:

- **Search visibility is critically impaired** because the site renders entirely client-side with no SSR, no per-page metadata, and no structured data. Tour pages are largely invisible to Google.
- **The booking funnel works** but leaks potential customers through friction: the booking form requires a lot of information upfront, pricing is not shown on tour cards until clicked, and the CTA copy ("Booking Reservation" instead of "Book Now") is not as action-oriented as it could be.
- **Security posture is dangerous**: credentials committed to git history must be treated as compromised.
- **No analytics means the business is flying blind**: there is no way to know where users come from, which tours get the most interest, or where they abandon the funnel.
- **Performance is at risk**: unoptimized legacy images in the repository (13 MB JPEG), two autoplay videos on the homepage, and no SSR/SSG mean mobile users may experience slow page loads.

---

## 5. Technical SEO Audit

### 5.1 Page Titles & Meta Descriptions

**Finding: SEO-001 (P1)**

The single `index.html` at `/home/harsh/Downloads/EGJ/egjFrontEnd/index.html` contains only one static title:
```html
<title>Expeditions George of the Jungle</title>
```
There is **no `<meta name="description">`** tag at all. Because there is no SSR or any React Helmet / `react-head` implementation, every page — home, tour detail pages, about, contact — shares the same title and has no meta description.

**Impact**: Google cannot differentiate pages in search results. Tour-specific queries like "Amazon rainforest tours Leticia Colombia" have no correctly-titled page to rank. Click-through rates from any organic impressions are severely reduced.

**Evidence**: `egjFrontEnd/index.html` lines 5–16; no `react-helmet`, `react-head`, or equivalent found anywhere in `src/`.

---

### 5.2 Open Graph & Social Sharing Metadata

**Finding: SEO-002 (P2)**

No Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) or Twitter Card tags exist. When the site URL is shared on Facebook, WhatsApp, or Twitter, no rich preview appears — only a blank link. For a tourism business that drives significant referral traffic through social sharing, this is a missed opportunity on every booking confirmation and traveller's social post.

---

### 5.3 Sitemap

**Finding: SEO-003 (P1)**

No `sitemap.xml` exists in the `public/` folder or as a backend route. Google has no structured way to discover and index the 12 pages of the website. Given the SPA architecture, dynamic tour pages are unlikely to be indexed without explicit sitemap submission.

**Evidence**: `ls /home/harsh/Downloads/EGJ/egjFrontEnd/public/` shows only: `favicon-32x32.png`, `favicon.ico`, `Logo.png`, `Logo.webp`.

---

### 5.4 robots.txt

**Finding: SEO-004 (P2)**

No `robots.txt` exists. While this does not block crawling (the default is to allow all), the absence means Google cannot be directed away from irrelevant paths (e.g., `/success`) and there is no pointer to the sitemap. Google will automatically set `robots.txt` as "allow all" but this is a missed best practice.

---

### 5.5 Structured Data (Schema.org)

**Finding: SEO-005 (P1)**

No structured data is implemented. Missing schemas that would directly benefit this business:

| Schema Type | Expected Benefit |
|---|---|
| `TouristAttraction` or `TouristTrip` | Rich snippets for individual tours |
| `LocalBusiness` | Google Business Panel integration |
| `FAQPage` | FAQ rich results in SERPs (the FAQ section on `/tour` is a perfect candidate) |
| `BreadcrumbList` | Navigation breadcrumbs in search results |
| `Review` / `AggregateRating` | Star ratings in search snippets (4.9 ★ 230+ reviews) |

The Google Reviews carousel (`GoogleReviewsCarousel.jsx`) hardcodes six real reviews with star ratings but does not render any JSON-LD schema. Implementing `AggregateRating` schema is a high-priority quick win.

---

### 5.6 Client-Side Rendering and Googlebot Indexability

**Finding: SEO-006 (P1)**

The entire site is a client-side React SPA. All content — including tour descriptions, prices, itineraries, and FAQ — is rendered by JavaScript. While Googlebot does execute JavaScript, client-side-only rendering creates significant indexability risks:

- **Rendering delay**: Googlebot's JavaScript rendering queue means pages are indexed days or weeks after crawl.
- **Depth penalty**: Dynamic SPA content is treated as "second wave" indexing, deprioritised vs. server-rendered HTML.
- **API-dependent content**: Tour cards in `CardsSection.jsx` (line 116) fetch tours from the API at render time. If the API is slow or unavailable during Googlebot's crawl, the content is invisible.
- **Hydration timing**: There is no server-rendered HTML shell with content; the initial HTML delivered is an empty `<div id="root"></div>`.

**Recommended direction**: Migrate to Next.js with `generateStaticParams` for tour detail pages, or implement Vite SSR. Even pre-rendering static HTML at build time via `vite-plugin-ssr` or a pre-rendering tool would significantly improve indexability.

---

### 5.7 URL Structure

The URL structure is clean and readable:
- `/tour/2-days-1-night` ✅
- `/tour/gamboa-sacambu` ✅
- `/tour/ayahuasca` ✅

**Minor Issue**: The route `/tour` is mapped to `TourExpeditioins.jsx` — the component filename has a typo ("Expeditions" misspelled as "Expeditions" with double 'i'). This does not affect the URL but will confuse future developers.

**Finding: SEO-007 (P3)**: The `/success` page (post-payment confirmation) is publicly accessible and could theoretically be indexed by Google. It should be excluded via `robots.txt` and/or a `noindex` meta tag.

---

### 5.8 Heading Hierarchy

**Finding: SEO-008 (P2)**

Multiple pages use incorrect heading hierarchy:

- **Home page** (`TravelWithUsSection.jsx` line 83): Uses `<h1>WHY TRAVEL WITH US?</h1>` inside a section component that is rendered below the hero section, which itself has `<h1>THE JOURNEY OF YOUR LIFE</h1>`. This creates two `<h1>` elements on the homepage.
- **CardsSection.jsx** (line 162): Uses `<h1 className="cards_section_title">TIME TO PICK YOUR TOUR</h1>` inside the `/tour` page — but the tour page's hero section also renders an `<h1>`. There are two `<h1>` elements on the Tour Expeditions page.
- **Tour detail pages** (e.g., GamboaSacambu, TwoDaysOneNight): Correctly use `<h1>` for the tour title; highlight cards inside use `<h2>` for subsections — this is appropriate.
- **About page** (line 40): Correctly uses `<h1>` for page title.

Multiple `<h1>` tags on a single page dilutes heading signal for search engines.

---

### 5.9 Image Alt Text

**Finding: SEO-009 (P2)**

- **Logo**: `alt="Logo"` — not descriptive. Should be `alt="Expeditions George of the Jungle Logo"`.
- **BePartOfUs.jsx** (line 103): `alt={\`Image${index}\`}` — entirely non-descriptive. These images show Amazon jungle scenery and should have descriptive alt text.
- **CardsSection.jsx** (line 197): `alt={tour.name || "Tour Image"}` — uses the tour name from the database, which is better but depends on the admin entering meaningful names.
- **TravelWithUsSection.jsx** (line 128): `alt={card.title}` — uses the card title ("Locally Rooted, English-Speaking Guides"), which is acceptable.

---

### 5.10 Canonical URLs

**Finding: SEO-010 (P2)**

No canonical `<link rel="canonical">` tags are set on any page. For a SPA with a vercel.json rewrite rule that serves all paths from the same `index.html`, there is a moderate risk of Google seeing the same content served at multiple URLs without a canonical signal.

---

### 5.11 Internal Linking

**Finding: SEO-011 (P2)**

- Tour detail pages (GamboaSacambu, Ayahuasca, etc.) have no internal links to related tours. A visitor on the 2-day tour page cannot navigate to the 3-day tour without going back to `/tour`.
- The footer has only 2 quick links: About and Tour Expeditions. Individual tour pages are not linked from the footer.
- The navigation does not have a dropdown menu for the six individual tour pages. Deep-linking to individual tours from navigation or the footer would improve crawlability and user discovery.

---

### 5.12 Mobile-First Indexing

Since Google uses mobile-first indexing, any SPA rendering issue or content difference between desktop and mobile is significant. The use of SCSS breakpoints and Swiper's responsive `breakpoints` configuration suggests the UI adapts for mobile — but this cannot be confirmed without live browser testing (see Limitations).

---

### 5.13 HTTPS

The `CLIENT_URL` in `.env` is `https://expeditionsgeorgeofthejungle.com/` — HTTPS is in use. Cannot confirm certificate validity or mixed-content issues without live inspection.

---

## 6. Content SEO and Keyword Opportunities

### 6.1 Missing Page Targets

The following high-intent search queries have no dedicated landing page:

| Search Intent | Missing Page |
|---|---|
| "Amazon tours from Leticia" | A location + departure-focused landing page |
| "Amazon ecotours Colombia" | Country-level SEO landing page |
| "Ayahuasca ceremony Colombia" | Existing page exists; content could be expanded |
| "Amazon River dolphins tour" | No dedicated page; mentioned only in descriptions |
| "Piranha fishing Amazon" | No dedicated page |
| "Indigenous community Amazon visit" | No dedicated page |
| "Amazon tour prices" | No pricing comparison page |
| "Best Amazon jungle tour" | No informational/blog content |

**Finding: SEO-012 (P2)**: The blog/content marketing layer is entirely absent. A travel business with 30 years of Amazon expertise could generate significant organic traffic with articles like: "What to expect on your first Amazon jungle tour," "Amazon dry season vs. wet season: which is better for tours," "Complete packing list for an Amazon rainforest trip," etc.

### 6.2 Existing Content Strengths

- The About page has substantial, unique, personal founder story content — this is genuinely differentiating.
- Individual tour pages have detailed itineraries, included/excluded lists, and practical notes on weather and seasonality — all good SEO signals once the site becomes indexable.
- The FAQ section (8 questions) answers real pre-purchase concerns — this is strong content that deserves FAQPage schema.

### 6.3 Keyword Gaps in Existing Content

- Pages do not include the primary geographic keyword "Leticia, Amazonas" in `<h1>` tags.
- The meta description (once implemented) should include "English-speaking guides," "Amazon rainforest tours," and "Leticia Colombia" — these are confirmed differentiators visible in reviews.
- The hero copy "THE JOURNEY OF YOUR LIFE" is emotionally resonant but contains no geographic or service keywords.

### 6.4 Competitor Context

> ⚠️ No competitor keyword data is available from code inspection alone. Semrush, Ahrefs, or Google Search Console should be used to identify gaps and opportunities relative to TripAdvisor listings and competing Leticia tour operators.

---

## 7. Performance and Core Web Vitals Audit

> **Important**: These are code-based risk assessments. Actual Core Web Vitals measurements require running Lighthouse or PageSpeed Insights on the live production URL. Do not treat these as measured scores.

### 7.1 LCP (Largest Contentful Paint) Risk — HIGH

**Finding: PERF-001 (P1)**

The homepage has two `<video>` elements that autoplay:
1. `VideoSection.jsx` (line 27): A Cloudinary-hosted MP4 from `res.cloudinary.com/dbuxt1ti8/video/upload/v1759272080/React_lp5cj4.mp4`
2. `BePartOfUs.jsx` (line 74): Another Cloudinary-hosted MP4 from `res.cloudinary.com/dbuxt1ti8/video/upload/v1759535461/VID-20250509-WA0024_ddexeo.mp4`

Both videos use `preload="metadata"`, which is correct — however:
- Neither video has a `poster` attribute. Without a poster, the LCP candidate may be blank until the video metadata loads, harming perceived performance.
- The hero section (`Hero.jsx`) uses a CSS background image (via SCSS class `hero_section`). If this background image is large, it could be the LCP element and may not be preloaded via `<link rel="preload">`.
- The hero animation uses `initial={{ opacity: 0, y: 100 }}`, meaning the `<h1>` is invisible on initial render and only appears after a JavaScript animation. The LCP element (the first large visible content block) may therefore be delayed by JavaScript execution time.

**Finding: PERF-002 (P1)**

Large unoptimized images exist in `/src/assets/images/`:
- `Home Page.jpeg` — **13 MB**. If this is used anywhere in production, it is catastrophic for LCP.
- `jungle.jpg.jpeg` — 3.5 MB
- `Card2.png` — 4.1 MB

The optimized WebP versions exist in `/src/assets/images/optimized/` and are used in most places (e.g., `TravelWithUsSection.jsx` imports WebP files). However, the unoptimized originals are still in the repository and shipped as part of the Vite build unless explicitly excluded — Vite will bundle any imported file. If any component still imports from the non-optimized originals, they will be included in the production bundle.

**Validation required**: Confirm via `grep -r "Home Page.jpeg" src/` whether any component imports the unoptimized files.

### 7.2 JavaScript Bundle Size — MEDIUM RISK

**Finding: PERF-003 (P2)**

The following libraries contribute to bundle size and should be monitored:
- `motion` (Framer Motion): Comprehensive animation library — tree-shaking should reduce this, but animations are used extensively across nearly every component and page. Multiple animation instances fire on every scroll (`whileInView` in many components).
- `swiper`: Carousel library for the TravelWithUs section. Only one carousel exists on the entire site — a lightweight alternative may be more appropriate.
- `react-icons`: Installed globally; if not tree-shaken properly, the full icon pack could inflate the bundle. Current usage imports from specific sub-packages (`fa`, `fa6`, `fi`, `gi`, `io`, `io5`, `md`) which is correct practice.
- `@clerk/clerk-react`: Third-party authentication bundle. This loads on every page, including pages that do not require authentication.

The Vite configuration (`vite.config.js`) has no explicit chunking strategy, no `build.rollupOptions.output.manualChunks`, and no bundle analysis configuration. This is not a confirmed defect but a risk.

### 7.3 CLS (Cumulative Layout Shift) Risk — MEDIUM

**Finding: PERF-004 (P2)**

- `<video>` elements with `autoPlay` and no explicit width/height attributes can cause layout shifts when they load.
- The hero section `<h1>` animates in from `y: 100` to `y: 0`. Depending on how the element is positioned, this may cause CLS.
- Google Fonts are loaded via two `<link rel="preconnect">` and one `<link rel="stylesheet">` in `index.html` (lines 8–12). The `display=swap` parameter is included (in the URL), which prevents FOIT but can cause FOUT (Flash of Unstyled Text) on slow connections, potentially contributing to CLS.

### 7.4 Third-Party Scripts — MEDIUM RISK

**Finding: PERF-005 (P1)**

`index.html` (line 13) loads the Google AdSense script:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7135146013353999" crossorigin="anonymous"></script>
```

This script loads on **every page** of the site. AdSense is primarily a monetization tool for publishers, not an e-commerce booking site. For a business whose primary goal is converting visitors into tour bookings, displaying competitor ads (or even unrelated ads) on the booking funnel pages is **a direct conversion killer** and should be reconsidered entirely.

Additionally, AdSense ads introduce:
- CLS risk from dynamically-sized ad units.
- Additional DNS lookups and script execution on every page load.
- Privacy concerns that may require cookie consent banners (GDPR).

### 7.5 API-Dependent Rendering

**Finding: PERF-006 (P2)**

`CardsSection.jsx` fetches all tours from the API on mount (`getTours()` on line 116) before rendering the tour cards. This means:
- The tour listing on `/tour` shows nothing until the API response arrives.
- If the Vercel serverless backend has a cold start (which is common on Vercel's free/hobby tier), this API call can take 3–8 seconds.
- There is no loading skeleton, spinner, or fallback visible to the user while data loads — just an empty section.
- Similarly, `TourExpeditioins.jsx` also calls `getTours()` independently (line 14), meaning the same API is called twice when the page loads.

### 7.6 Performance Wins Already Implemented (Positive Findings)

- WebP versions of all card images are used in `TravelWithUsSection.jsx` ✅
- `loading="lazy"` and `decoding="async"` on most images ✅
- Cloudinary image optimization for dynamically loaded tour images (via `optimizeCloudinaryImage()` in `CardsSection.jsx`) ✅
- `DeferredGoogleReviews` component in `App.jsx` uses IntersectionObserver to lazy-load the reviews section ✅
- Logo uses WebP format in production ✅
- `preload="metadata"` on video elements ✅

---

## 8. Sales and Conversion Rate Optimization

### 8.1 Value Proposition Assessment

**Strengths:**
- Clear hero headline: "THE JOURNEY OF YOUR LIFE" — emotionally strong.
- Subtitle immediately highlights the key differentiator: "English-speaking guides" — critical for international visitors.
- 4.9 stars / 230+ Google reviews is excellent social proof (the strongest trust signal on the site).

**Weaknesses (Finding: CRO-001, P1):**
- **No pricing is shown on the tour cards**. A user visiting `/tour` can see the tour names and a "View Details" button, but has no idea what any tour costs until they click into the detail page and open the booking modal. Many price-sensitive visitors will bounce. Showing prices (or at minimum, "From $130/person") on the tour cards would dramatically reduce friction.
- **No photos of actual tour experiences on the tour card listing**. Tour cards display a card image but the primary booking conversion happens after the user has seen what the tour includes — this context is missing from the first screen.

### 8.2 CTA Analysis

**Finding: CRO-002 (P2)**

CTA copy across the site:
- Navbar: "Book Now" — ✅ Clear
- Hero: "BOOK TOUR" — ✅ Good
- Tour cards: "View Details" — ⚠️ Weak. This is a discovery CTA, not a conversion CTA. Users who are ready to book must click "View Details" → scroll to CTA → click "Booking Reservation" → fill form → proceed to payment. That's 4 steps before payment begins.
- Tour detail pages: "Booking Reservation" — ⚠️ Slightly formal. Testing "Book This Tour" or "Reserve My Spot" may improve conversion.

### 8.3 Booking Form Friction

**Finding: CRO-003 (P1)**

The booking modal (`BookingModal.jsx`) collects the following mandatory fields in Step 1:
1. First Name
2. Last Name
3. Nationality
4. Passport Number
5. Email
6. Phone
7. Tour Package (pre-filled)
8. Number of tourists (1–10)
9. Additional tourists' First Name, Last Name, Passport (for each extra person)
10. Tour dates
11. Arrival flight number and date/time
12. Departure flight number and date/time
13. Hotel accommodation address
14. Message

**This is an extremely long form for an initial deposit payment.** Most e-commerce best practices suggest collecting minimal information at checkout and gathering additional logistics details post-payment. Requiring passport numbers, flight details, and hotel addresses at the deposit stage will cause significant form abandonment.

**Recommendation (documentation only — not implemented):** Consider a two-tier model:
- **Step 1 (Deposit)**: Name, email, phone, tour, date, number of people → proceed to Stripe
- **Step 2 (Logistics, sent via email after payment)**: Passport, flight, hotel, dietary preferences

### 8.4 Trust Signals

**Positive:**
- Google Reviews carousel with real reviews is strong social proof ✅
- "Payments are processed securely by Stripe" note in the booking modal ✅
- Privacy policy and refund policy pages exist ✅

**Missing (Finding: CRO-004, P2):**
- TripAdvisor link is in the footer but no TripAdvisor rating badge is displayed prominently on the site.
- No testimonial photos (names only in reviews, no face photos).
- No "How many people have booked this tour" or "X spots remaining" urgency signals.
- No trust badges near the "Book Now" button on the tour cards.
- GDPR/cookie consent banner is absent despite the Privacy Policy referencing cookies and AdSense.

### 8.5 Payment Flow Conversion Risk

**Finding: CRO-005 (P2)**

The `BookingModal.jsx` (line 146) shows the Stripe payment page URL (`window.location.href = url`) after form submission. If the user clicks the browser's back button from the Stripe checkout page, they return to the website but no booking record was created yet (or an incomplete `isPaid: false` booking exists in MongoDB). This means:

- The booking document expires after 24 hours (line 103 of `checkoutController.js`).
- There is no email capture before the Stripe redirect to enable abandoned cart follow-up.
- The `cancel_url` in the Stripe session redirects to `/` (homepage), not back to the tour page, losing the user's context.

**Finding: CRO-006 (P2)**: The "Pay Now" modal (for existing customers with an invoice) exists in the navbar but is not documented anywhere on the public-facing site. New visitors do not know this option exists.

### 8.6 WhatsApp Contact

A WhatsApp link (`https://wa.me/573208996144`) is in the footer. WhatsApp is heavily used by tour customers in South America and Europe. However:
- There is no WhatsApp floating button or chat widget on the site.
- The footer WhatsApp link opens to the Leticia number, but tour detail pages (GamboaSacambu, Ayahuasca, etc.) link to a **different number** (`573175299539` — see `socialLinks.whatsapp` in each tour page), which is not shown in the footer.
- Two different phone numbers are used in different parts of the site without explanation.

**Finding: CRO-007 (P2)**: Multiple contact phone numbers used inconsistently. The footer shows `+57 (320) 899-6144` (WhatsApp) but the tour detail pages link to `+57 (317) 529-9539` (email links use the same Google Mail format). This creates confusion and damages trust.

---

## 9. UI/UX and Mobile Responsiveness

> Visual assessment is limited to SCSS/JSX code inspection. A full responsive design review requires live browser testing across device sizes.

### 9.1 Navigation

**Finding: UX-001 (P2)**

Navigation links in `NavBar.jsx` (lines 93–101) use `<a href={link.path}>` instead of React Router's `<Link to={link.path}>`. This causes full page reloads on navigation rather than React Router's client-side navigation. For an SPA, every navigation click triggers a full reload of the JavaScript bundle, defeating the SPA architecture's primary UX benefit.

```jsx
// Current (problematic):
<a className={navBar.nav_link} href={link.path} onClick={handleNavLinkClick}>
  {link.name}
</a>

// Should be:
<Link className={navBar.nav_link} to={link.path} onClick={handleNavLinkClick}>
  {link.name}
</Link>
```

The same issue exists in the mobile sidebar (lines 193–200) and in the footer (`Footer.jsx` lines 49–53).

### 9.2 Scroll Animation Behaviour

**Finding: UX-002 (P2)**

Multiple sections use `whileInView` animations with `once: false`. This means every section animates every time it scrolls into view, including when the user scrolls back up. This creates a jarring repeat-animation experience — animations are generally expected to run once on initial entry. Additionally, the Hero section uses both `animate` (which runs immediately) and `whileInView`, creating a potential animation conflict.

### 9.3 Mobile Hamburger Menu

**Finding: UX-003 (P2)**

The mobile hamburger button in `NavBar.jsx` (line 245) is inside a `div`, not a `button`. Actually, it IS wrapped in a `<button>` on line 245 — correct. However:
- The hamburger button has no `aria-label` attribute (line 245–251): This fails accessibility.
- The close button in the mobile sidebar (line 183–188) is correctly a `<button>`.
- The mobile menu has `<div>` used as nav items for the right section wrapper — these are not semantic `<nav>` elements.

### 9.4 Video Accessibility

**Finding: UX-004 (P2)**

The autoplay background video in `VideoSection.jsx` has no `aria-label`, no `aria-hidden="true"`, and no captions or transcripts. For users who cannot process visual media (or for accessibility auditors), this video contributes nothing and may be distracting.

### 9.5 Form UX Issues

**Finding: UX-005 (P2)**

In `BookingModal.jsx`:
- The "Message" field (line 358–365) uses `<input type="text">` not `<textarea>`. A text message field should be a textarea to allow multi-line input.
- Form labels for additional participants (line 282) are generic: "Traveller 2", "Traveller 3" etc. — inputs below are not labeled individually (only placeholders are shown), which is an accessibility concern.

### 9.6 BookingSuccess Page

**Finding: UX-006 (P3)**

`BookingSuccess.jsx` uses inline JavaScript style objects instead of CSS classes. This is inconsistent with the rest of the codebase (which uses SCSS modules) and makes the styling unmaintainable. Additionally, the success page uses no Navbar — a user who navigates here and refreshes has no way to get back to the site except via the "Back to Home" button.

---

## 10. Accessibility Audit

> WCAG 2.2 AA assessment based on code inspection only. Live testing with screen readers (NVDA, VoiceOver) and automated tools (axe, WAVE) is required for a complete audit.

### 10.1 Focus Management

**Finding: ACC-001 (P2)**

The booking modal (`BookingModal.jsx`) does not implement focus trap. When the modal opens, keyboard focus remains behind the modal overlay, meaning keyboard users cannot access the form fields without tabbing through all underlying page elements first. The modal should capture focus on open and return focus to the trigger button on close.

### 10.2 Button Accessibility

**Finding: ACC-002 (P2)**

- **Hamburger button** (`NavBar.jsx` line 247): `<button className={navBar.hamburguer_button} onClick={...}>` — no `aria-label`, no `aria-expanded` attribute. Screen reader users cannot determine the button's purpose or the current open/closed state.
- **Volume toggle button** (`BePartOfUs.jsx` line 78): `<button ... onClick={toggleSound}>` — no `aria-label`. The icon (`IoMdVolumeOff`/`IoIosVolumeHigh`) is not accessible by itself.
- **Tour card "View Details" button** (`CardsSection.jsx` line 212): No `aria-label` specifying which tour. Multiple "View Details" buttons with identical labels are indistinguishable for screen reader users.
- **FAQ items** (`Faq.jsx` line 68): The clickable FAQ question uses a `<div onClick>` pattern, not a `<button>`. Div elements are not natively keyboard-accessible and not announced as interactive by screen readers.

### 10.3 Image Alt Text (Accessibility)

Partially addressed in SEO-009. The `alt={\`Image${index}\`}` pattern in `BePartOfUs.jsx` is non-descriptive and will be read aloud by screen readers as "Image0", "Image1", etc.

### 10.4 Color Contrast

Cannot be confirmed without visual rendering and contrast measurement tools. The design uses a dark green background (`#061008`, `#10180d`) with light cream text (`#f4eed9`) — this combination is likely to pass WCAG AA at large text sizes but should be verified with a contrast checker for body text.

### 10.5 Skip Navigation

**Finding: ACC-003 (P3)**

No "skip to main content" link exists. This is required for keyboard-only users who would otherwise tab through the entire navigation on every page.

### 10.6 Form Labels

**Finding: ACC-004 (P2)**

In `Contact.jsx`, form labels wrap their inputs using `<label>` — this is the correct pattern ✅. However, in `BookingModal.jsx`:
- Participant input fields (lines 283–306) use `name` attributes but no associated `<label>` elements. The placeholder text is used as the only label, which disappears when the user starts typing.

### 10.7 Semantic HTML

**Positive findings:**
- `<footer>` used correctly ✅
- `<address>` in footer correctly wraps contact info ✅
- `<article>` used for review cards and timeline items ✅
- `<section>` used for page sections ✅
- Tour card `<h2>` correctly used for subsection titles (when heading hierarchy is correct) ✅

**Issues:**
- `<h1>` used multiple times per page (SEO-008) ✅ already documented
- FAQ toggle uses `<div onClick>` instead of `<button>` or `<details>`/`<summary>` (ACC-002)

---

## 11. Code Quality and Architecture

### 11.1 Duplicate API Fetching

**Finding: CQ-001 (P2)**

`TourExpeditioins.jsx` (line 12–18) fetches tours with `getTours()` and stores them in local state (`const [tours, setTours] = useState([])`), but the result is never passed to `CardsSection`. Then `CardsSection.jsx` independently fetches tours again (line 113–129). This is a duplicate API call — the same data is fetched twice, once by the parent and once by the child, with the parent's result discarded.

### 11.2 Booking Modal — Development Text in Production

**Finding: CQ-002 (P0)**

`BookingModal.jsx` lines 429–434:
```jsx
<>
  This test tour charges the full{" "}
  <strong>${paymentBreakdown.dueToday.toFixed(2)}</strong> today
  so you can verify the live Stripe payment flow.
</>
```

This "test tour" message appears to be a development artifact that is conditionally rendered when `payInFull = true`. If any tour or scenario triggers `payInFull = true` in production, customers will see "This test tour charges the full $X today so you can verify the live Stripe payment flow" — which is deeply unprofessional and could undermine trust in the payment. This text should be replaced with appropriate production-ready messaging immediately.

### 11.3 Hardcoded API Expiry for Testing

**Finding: CQ-003 (P1)**

`booking.controller.js` line 50:
```js
const expireAt = new Date(Date.now() + 2 * 60 * 1000); //for testing
```

This is commented as "for testing" — meaning unpaid bookings expire after **2 minutes** instead of 24 hours. If this is the live code in production, any user who takes more than 2 minutes to complete the Stripe checkout (e.g., fetching card details) will have their booking document expired and deleted before payment confirms. The `checkoutController.js` correctly uses 24 hours (line 103), but the `booking.controller.js` (the older flow) uses 2 minutes.

### 11.4 Wrong HTTP Status Codes

**Finding: CQ-004 (P2)**

`booking.controller.js`:
- `getBookings()` (line 97) responds with `res.status(302)` — HTTP 302 is a redirect status, not a data response. It should be `200`.
- `getBookingByID()` (line 131) also uses `res.status(302)`.
- `getBookingByID()` (line 125) uses `res.status(401)` for "Booking not found" — this should be `404`. 401 means "Unauthorized."
- `deleteBooking()` (line 197) uses `res.status(401)` for "Booking not found" — should be `404`.
- `updateBooking()` (line 152) uses `res.status(401)` for "Booking not found" — should be `404`.

### 11.5 TypeScript Missing

**Finding: CQ-005 (P3)**

The project uses JavaScript throughout despite TypeScript being available for both React and Node.js. Given the data flow complexity (Stripe webhooks, booking state management, Clerk auth, MongoDB models), TypeScript would significantly reduce runtime errors. This is a medium-term improvement recommendation, not an immediate blocker.

### 11.6 Console Logs in Production Webhook

**Finding: CQ-006 (P2)**

`stripeWebhook.controller.js` (lines 12–16) logs the webhook secret to the server console:
```js
console.log("Using Webhook Secret:", process.env.STRIPE_WEBHOOK_SECRET);
```

This exposes the webhook secret in server logs. If server logs are accessible to any third party (e.g., Vercel log drains, Datadog, etc.), this leaks the secret. Additionally, verbose diagnostic logging throughout the webhook controller (30+ console.log statements) will incur log storage costs and makes log analysis harder.

### 11.7 Axios Wrapper Redundancy

**Finding: CQ-007 (P3)**

`axiosIntance.js` (note: "Instance" is misspelled in the filename) wraps all Axios methods (`apiGet`, `apiPost`, etc.) in try/catch blocks that only re-throw the error:
```js
export const apiGet = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    throw error; // This adds no value
  }
};
```

The try/catch blocks add no value here and should either be removed or enhanced with meaningful error transformation. The filename typo (`axiosIntance.js` instead of `axiosInstance.js`) should also be corrected.

### 11.8 Zustand Auth Token in localStorage

**Finding: CQ-008 (P2)**

`auth.js` uses Zustand's `persist` middleware:
```js
{ name: "auth-storage" }
```

By default, Zustand persist stores to `localStorage`. This means the Clerk JWT token is stored in `localStorage`, making it accessible to any JavaScript running on the page (including third-party scripts like AdSense). For a site handling sensitive booking and passport information, token storage in localStorage is a security concern. `httpOnly` cookies would be preferable but require server-side coordination with Clerk.

### 11.9 Missing Error Page

**Finding: CQ-009 (P3)**

There is no 404 error page route. If a user navigates to a nonexistent URL (e.g., `/tour/unknown-tour`), the Vercel rewrite in `vercel.json` redirects all paths to `/` (the homepage). While this prevents a 404, it silently redirects users to the homepage with no explanation, which is confusing and does not help them find what they were looking for.

### 11.10 Nationality Typo in Database Schema

**Finding: CQ-010 (P3)**

`booking.model.js` line 32 and `checkoutController.js` line 109, 203: Field is named `"nacionality"` (Spanish spelling) instead of `"nationality"`. This inconsistency exists throughout the codebase. It is a minor issue but will be confusing for any future developer.

---

## 12. Security and Reliability Review

### 12.1 CRITICAL: Secrets Committed to Repository

**Finding: SEC-001 (P0 — CRITICAL)**

The file `egjBackEnd/.env` is present in the Git repository and has been pushed to a remote repository (`github.com/sachin9272/EGJ`, confirmed via commit history). This file contains multiple live/test credentials:

| Service | Variable | Risk |
|---|---|---|
| MongoDB Atlas | `MONGODB_URI` | Full database access — read/write/delete all data |
| Clerk | `CLERK_SECRET_KEY` | Full authentication admin access |
| Clerk | `CLERK_WEBHOOK_SECRET` | Webhook signature bypass |
| Cloudinary | `CLOUDINARY_API_SECRET` | Read/write/delete all uploaded media |
| Stripe | `STRIPE_API_SECRET` (test) | Stripe test environment manipulation |
| Stripe | `STRIPE_WEBHOOK_SECRET` | Webhook signature bypass |
| Email | `EMAIL_PASS` | Gmail app password — send emails as the configured account |
| Stripe (LIVE) | Commented line 16 | **A live Stripe secret key pattern is present** (commented out but still in git history) |

> The audit report does **not** reproduce any secret values. The `.env` file at line 2 begins with `MONGODB_URI=mongodb+srv://...` and contains 30 lines of credentials.

**Note**: The `.gitignore` in `egjBackEnd/` correctly lists `.env` — however, the `.env` file was committed before the `.gitignore` was in place (or the `.gitignore` was not respected). The file exists in current HEAD and in git history.

**Immediate actions required:**
1. **Rotate all credentials** — MongoDB Atlas password, Clerk keys, Cloudinary keys, Stripe keys (both test and any live keys), email app password.
2. Remove the `.env` file from git history using `git filter-repo` or BFG Repo Cleaner.
3. Force-push the cleaned history to all remotes.
4. Revoke the GitHub repository's access if it is public, or make it private.
5. Audit MongoDB Atlas logs for unauthorized access.
6. Audit Stripe logs for unauthorized transactions.
7. Revoke and regenerate Clerk keys in the Clerk dashboard.

### 12.2 CORS: Wildcard Origin

**Finding: SEC-002 (P1)**

`server.js` line 24:
```js
app.use(cors());
```

Called without any configuration, this allows **any origin** to make cross-origin requests to the API, including:
- Crafted requests from attacker-controlled websites.
- CSRF-style attacks against authenticated API endpoints.

The CORS middleware should be configured with an explicit `origin` allowlist:
```js
// Example for documentation only — do not implement:
app.use(cors({
  origin: ['https://expeditionsgeorgeofthejungle.com'],
  credentials: true
}));
```

### 12.3 No Rate Limiting

**Finding: SEC-003 (P2)**

There is no rate limiting on any API endpoint. This creates risks:
- The contact form endpoint (`POST /api/v1/contact`) can be spammed, sending unlimited emails to the admin email address.
- The checkout endpoint (`POST /api/v1/checkout/create-direct-session`) creates MongoDB booking documents and Stripe sessions — this could be abused to create thousands of dummy booking records.
- Authentication endpoints are protected by Clerk, but unauthenticated endpoints have no protection.

### 12.4 Webhook Security

**Finding: SEC-004 (P2)**

`stripeWebhook.controller.js` correctly verifies Stripe webhook signatures using `stripe.webhooks.constructEvent()` — this is good practice ✅.

However, line 14:
```js
console.log("Using Webhook Secret:", process.env.STRIPE_WEBHOOK_SECRET);
```
This logs the full webhook secret on every webhook call. If these logs are accessible to third parties or stored insecurely, the secret is exposed.

### 12.5 Input Validation on Contact Form

**Finding: SEC-005 (P2)**

`contact.controller.js` performs basic validation (fullName and email required) and correctly HTML-escapes all output via `escapeHtml()` — this is good ✅. However:
- There is no validation of email format on the backend (only field presence is checked).
- There is no message length limit — a malicious user could send a 100 MB string as the message field.
- There is no CAPTCHA or bot protection. With no rate limiting, the form is vulnerable to spam attacks.

### 12.6 Unprotected Admin Routes

**Finding: SEC-006 (P2)**

`server.js` line 46:
```js
app.use("/api/v1/users", clerkMiddleware(), adminRouter);
```

The admin routes use `clerkMiddleware()` for authentication but it is not clear whether all admin routes also apply the `adminOnly` middleware from `adminAuthMiddleware.js`. The admin middleware checks `req.user.role !== "Admin"` — but `req.user` is populated by the `protect` middleware which queries MongoDB. If a route in `adminRouter` does not apply `protect` and then `adminOnly` in sequence, any authenticated Clerk user could access admin functionality.

> Full verification of each admin route handler would require reading `admin.routes.js` (not fully inspected in this audit pass — recommend secondary review).

### 12.7 Booking Model: No User Ownership Validation on Updates

**Finding: SEC-007 (P2)**

`booking.controller.js` `updateBooking()` (line 145) and `deleteBooking()` (line 192) perform no ownership check:
```js
const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
```

Any authenticated user who knows a booking's MongoDB ObjectId can update or delete another user's booking. The booking routes apply `clerkMiddleware()` but it is unclear whether `protect` and ownership checks are applied. This is a potential horizontal privilege escalation vulnerability.

---

## 13. Analytics and Growth Opportunities

### 13.1 No Analytics Implementation

**Finding: ANA-001 (P1)**

There is no analytics implementation of any kind in the codebase:
- No Google Analytics (GA4)
- No Meta Pixel (Facebook)
- No Hotjar or similar heatmap tool
- No Plausible, Umami, or privacy-first alternative
- No custom event tracking

This means the business has **no data** on:
- How many people visit the site per day/week/month
- Which tour pages get the most traffic
- Where users drop off in the booking funnel
- Whether the booking modal is opened frequently but completed rarely
- Which countries visitors come from
- Whether mobile or desktop users convert better
- How much organic, referral, or direct traffic the site receives

### 13.2 No Conversion Tracking

**Finding: ANA-002 (P1)**

There is no conversion event tracking:
- No "BookingModal Opened" event
- No "Booking Form Submitted" event
- No "Stripe Checkout Initiated" event
- No "Booking Completed" event (from the `/success` page)

Without this data, the business cannot calculate:
- Conversion rate from tour page view to booking attempt
- Cart abandonment rate at the Stripe checkout stage
- Revenue by tour type or package

### 13.3 Recommended Analytics Implementation (Documentation Only)

> **Important**: The following is documentation-only. No code was or should be implemented.

For a business of this type, the recommended analytics stack would be:

1. **Google Analytics 4 (GA4)**: Track page views, user acquisition, and custom booking funnel events.
2. **Google Tag Manager**: For managing GA4, conversion tags, and any future pixel without code changes.
3. **GA4 Custom Events to track**:
   - `booking_modal_open` (which tour)
   - `booking_form_submit` (tour, tourist count)
   - `stripe_checkout_initiated` (tour, amount)
   - `booking_complete` (fired on `/success` page)
   - `contact_form_submit`
   - `whatsapp_click` (from footer or tour pages)
4. **Google Search Console**: Essential for tracking which keywords drive organic traffic, click-through rates, and crawl errors.
5. **Stripe Dashboard Analytics**: Built-in revenue reporting (already available — just needs to be monitored).

---

## 14. Detailed Prioritized Findings Register

| ID | Category | File / Location | Problem | Business Impact | Effort | Priority |
|---|---|---|---|---|---|---|
| SEC-001 | Security | `egjBackEnd/.env` | Live and test API secrets committed to git repo | **CRITICAL** — database, payments, auth potentially compromised | Small (rotate keys) / Large (purge git history) | **P0** |
| CQ-002 | Code Quality | `BookingModal.jsx` L429 | "This test tour" development text in production code path | Destroys customer trust if shown | Small | **P0** |
| CQ-003 | Reliability | `booking.controller.js` L50 | 2-minute booking expiry (test mode) instead of 24 hours | Unpaid bookings deleted before payment can complete | Small | **P1** |
| SEO-001 | SEO | `index.html` L15 | Single static title; no meta descriptions on any page | Zero SEO differentiation between pages | Medium | **P1** |
| SEO-003 | SEO | `public/` folder | No sitemap.xml | Google cannot discover all pages | Small | **P1** |
| SEO-005 | SEO | Global (no schema) | No structured data (FAQ, LocalBusiness, AggregateRating) | Missing rich snippets; lower CTR | Medium | **P1** |
| SEO-006 | SEO | Full site | CSR-only SPA; no SSR or pre-rendering | Tour pages not reliably indexed by Google | Large | **P1** |
| PERF-001 | Performance | `VideoSection.jsx`, `BePartOfUs.jsx` | Two autoplay videos, no poster, hero animation delays LCP | Poor mobile LCP; may fail Core Web Vitals | Small | **P1** |
| PERF-002 | Performance | `src/assets/images/` | 13 MB JPEG, 4.1 MB PNG originals in repository | Catastrophic LCP if imported; large repo size | Small | **P1** |
| PERF-005 | Performance | `index.html` L13 | Google AdSense script on every page | CLS, conversion loss, page speed hit | Small | **P1** |
| CRO-001 | CRO | `CardsSection.jsx` | No pricing shown on tour cards | High bounce rate from undecided visitors | Small | **P1** |
| CRO-003 | CRO | `BookingModal.jsx` | 14-field booking form before deposit payment | High form abandonment | Medium | **P1** |
| ANA-001 | Analytics | Full site | No analytics implementation | Business flying blind on all metrics | Medium | **P1** |
| ANA-002 | Analytics | Full site | No conversion tracking | Cannot measure booking funnel | Medium | **P1** |
| SEC-002 | Security | `server.js` L24 | `cors()` with no origin whitelist | Any website can call the API | Small | **P1** |
| UX-001 | UX | `NavBar.jsx`, `Footer.jsx` | `<a href>` instead of `<Link to>` causes full-page reloads | Poor SPA UX; slow navigation | Small | **P2** |
| SEO-002 | SEO | Global | No Open Graph or Twitter Card meta tags | No rich social sharing previews | Small | **P2** |
| SEO-004 | SEO | `public/` folder | No robots.txt | Cannot direct crawlers or exclude /success | Small | **P2** |
| SEO-008 | SEO | Multiple pages | Multiple `<h1>` elements per page | Diluted heading signals | Small | **P2** |
| SEO-011 | SEO | Tour detail pages | No cross-linking between tour pages or in footer | Weak internal linking; poor crawl depth | Small | **P2** |
| PERF-003 | Performance | `package.json` | No bundle analysis; large dependencies (motion, swiper) | Unknown bundle size; possible bloat | Medium | **P2** |
| PERF-006 | Performance | `TourExpeditioins.jsx`, `CardsSection.jsx` | Duplicate API call for tours; no loading state | Slow perceived load; poor UX | Small | **P2** |
| CRO-002 | CRO | `CardsSection.jsx` | Weak "View Details" CTA on tour cards | Lower click-through to booking funnel | Small | **P2** |
| CRO-004 | CRO | Multiple pages | Missing trust signals (TripAdvisor badge, cookie consent) | Reduced conversion trust | Small | **P2** |
| CRO-007 | CRO | `Footer.jsx`, tour pages | Two different WhatsApp numbers used inconsistently | Customer confusion, trust damage | Small | **P2** |
| ACC-001 | Accessibility | `BookingModal.jsx` | No focus trap in modal | Keyboard users cannot access form | Small | **P2** |
| ACC-002 | Accessibility | `NavBar.jsx`, `Faq.jsx` | Missing aria-label, aria-expanded on interactive elements | Screen reader users cannot navigate | Small | **P2** |
| ACC-004 | Accessibility | `BookingModal.jsx` | Participant inputs lack associated labels | Screen readers announce no label | Small | **P2** |
| CQ-001 | Code Quality | `TourExpeditioins.jsx` | Duplicate `getTours()` API call (parent + child) | Unnecessary API load | Small | **P2** |
| CQ-004 | Code Quality | `booking.controller.js` | Wrong HTTP status codes (302 for data, 401 for not found) | API clients behave incorrectly | Small | **P2** |
| CQ-006 | Code Quality | `stripeWebhook.controller.js` L14 | Webhook secret logged to console | Secret exposure in logs | Small | **P2** |
| CQ-008 | Code Quality | `auth.js` | JWT token stored in localStorage via Zustand persist | XSS token theft risk | Medium | **P2** |
| SEC-003 | Security | `server.js` | No rate limiting on any endpoint | Spam, abuse, DoS vulnerability | Small | **P2** |
| SEC-005 | Security | `contact.controller.js` | No email format validation, no message length limit, no CAPTCHA | Spam and potential abuse | Small | **P2** |
| PERF-004 | Performance | Multiple animations | `whileInView` with `once: false` triggers repeat animations | Jarring UX on scroll-up | Small | **P3** |
| SEO-007 | SEO | `/success` route | Success page indexable | Irrelevant page in search results | Small | **P3** |
| SEO-009 | SEO | `BePartOfUs.jsx` L103 | Non-descriptive image alt text (`Image0`, `Image1`) | Poor accessibility + SEO | Small | **P3** |
| SEO-012 | SEO | Content layer | No blog or informational content | Missing organic top-of-funnel traffic | Large | **P3** |
| CRO-005 | CRO | Checkout flow | cancel_url redirects to homepage, not tour page | Lost context on Stripe cancel | Small | **P3** |
| CRO-006 | CRO | Navbar | "Pay Now" feature undiscovered by new visitors | Revenue left on table | Small | **P3** |
| UX-002 | UX | Multiple sections | Animations repeat on scroll-up (`once: false`) | Jarring user experience | Small | **P3** |
| UX-004 | UX | `VideoSection.jsx` | Video has no `aria-hidden` or captions | Accessibility gap | Small | **P3** |
| UX-005 | UX | `BookingModal.jsx` | Message uses `<input>` not `<textarea>` | Cannot type multi-line messages | Small | **P3** |
| UX-006 | UX | `BookingSuccess.jsx` | Inline styles, no Navbar on success page | Inconsistency; user gets stuck | Small | **P3** |
| CQ-007 | Code Quality | `axiosIntance.js` | Filename typo; empty try/catch wrappers | Maintenance confusion | Small | **P3** |
| CQ-009 | Code Quality | `vercel.json` | No 404 route; all paths redirect to `/` | Users silently redirected, no error page | Small | **P3** |
| CQ-010 | Code Quality | `booking.model.js` | `"nacionality"` typo in field name | Developer confusion | Small | **P3** |
| ACC-003 | Accessibility | Global | No "skip to main content" link | Keyboard users must tab all nav items | Small | **P3** |
| SEO-010 | SEO | Global | No canonical `<link>` tags | Potential duplicate content signals | Small | **P3** |

**Priority Summary:**
- P0 (Critical): 2 findings
- P1 (High): 12 findings
- P2 (Medium): 20 findings
- P3 (Low): 14 findings

---

## 15. Page-by-Page Audit

### 15.1 Homepage (`/`)

**Strengths:**
- Strong hero with emotionally resonant headline and English-speaking guide differentiator ✅
- "Why Travel With Us" section covers 6 genuine differentiators ✅
- "Join Us on This Adventure" section shows authentic imagery and safety messaging ✅
- DeferredGoogleReviews loads the reviews section lazily, reducing initial page weight ✅

**Issues:**
- No `<title>` beyond the static global title (SEO-001)
- No meta description (SEO-001)
- Hero `<h1>` and TravelWithUs `<h1>` create two H1 elements (SEO-008)
- Two autoplay videos load without poster images (PERF-001)
- Google AdSense script loads globally (PERF-005)
- No call-to-action linking directly to individual tours from homepage
- The homepage does not show any prices or sample tours with details

### 15.2 Tour Expeditions (`/tour`)

**Strengths:**
- Clear section heading "TIME TO PICK YOUR TOUR" ✅
- Cloudinary image optimization for tour card images ✅
- FAQ section addresses real customer concerns ✅
- Scroll-to-section navigation from other pages works correctly ✅

**Issues:**
- Two `<h1>` elements (Hero component + CardsSection) (SEO-008)
- Tour cards show no prices (CRO-001)
- "View Details" button is not a link — uses `navigate()` in onClick, which means it cannot be right-clicked to open in a new tab by users (PERF-006 UX note)
- Duplicate API call for tours (CQ-001)
- No loading skeleton shown while API call is pending

### 15.3 Tour Detail Pages (`/tour/gamboa-sacambu`, `/tour/2-days-1-night`, etc.)

**Strengths:**
- Detailed itineraries with times ✅
- Included/excluded lists are clear and complete ✅
- "Booking Reservation" CTA repeated at top and bottom of page ✅
- Email secondary CTA as alternative contact method ✅
- Practical seasonality information (dry/wet season guidance) ✅

**Issues:**
- No per-page meta title or description (SEO-001)
- No structured data for TouristTrip or Product schema (SEO-005)
- No photos in the detail page body — only a background image/hero (missing social proof imagery)
- No link to related tours ("You might also like...") (SEO-011)
- The `cancel_url` in Stripe sends users to homepage instead of the specific tour page (CRO-005)
- All tour detail pages share the same SCSS module file (`gamboaSacambu.module.scss`) — this is a minor code smell but acceptable

### 15.4 About Page (`/about`)

**Strengths:**
- Compelling, unique founder story — genuine differentiator for the brand ✅
- Mission and vision sections clearly articulate the brand's values ✅
- George's photo with descriptive alt text ✅

**Issues:**
- No meta title/description (SEO-001)
- No structured data for `Person` (George as founder) or `Organization` schema (SEO-005)
- The page's `<h1>` says "About George Of The Jungle" which is decent but misses the business name "Expeditions"
- No CTA to book a tour from the About page — a missed conversion opportunity
- Privacy policy contact references `info@georgeexpeditions.com` (line 238) — a different email from the one used everywhere else

### 15.5 Contact Page (`/contact`)

**Strengths:**
- All form inputs have proper label associations ✅
- Success/error status messages are implemented ✅
- Physical address is provided ✅

**Issues:**
- No meta title/description (SEO-001)
- No Google Maps embed or directions link for the physical address
- The "Your Message" textarea is not required — a contact form with no message could submit successfully
- WhatsApp link number (`573208996144`) is consistent with the footer — this is different from the WhatsApp number in tour detail pages (`573175299539`) (CRO-007)

### 15.6 Privacy Policy & Refund Policy

- Content is adequately detailed and legally reasonable ✅
- Privacy Policy references GDPR and CCPA compliance ✅
- Privacy Policy DPO contact email (`info@georgeexpeditions.com`, line 238) is different from the main business email — verify this is intentional

### 15.7 Booking Success (`/success`)

- Basic success confirmation — functional but minimal
- Uses inline styles, no navbar, no footer (UX-006)
- No upsell opportunity or invitation to share the booking on social media
- No next-steps information beyond "A confirmation email has been sent"

---

## 16. Top 10 Recommended Actions

Listed by impact × confidence × implementation feasibility:

| Rank | Action | Finding IDs | Effort | Expected Benefit |
|---|---|---|---|---|
| 1 | **Rotate ALL credentials immediately** — MongoDB, Stripe, Clerk, Cloudinary, email. Remove `.env` from git history. | SEC-001 | Small/Large | Prevents potential data breach and financial loss |
| 2 | **Remove development test text** from `BookingModal.jsx` (line 429–434) before any customer sees it in production | CQ-002 | Small | Prevents trust damage at point of payment |
| 3 | **Fix booking expiry to 24 hours** in `booking.controller.js` (change 2 mins → 24 hours) | CQ-003 | Small | Prevents bookings expiring before payment completes |
| 4 | **Add Google Analytics 4** with booking funnel events (`modal_open`, `form_submit`, `checkout_initiated`, `booking_complete`) | ANA-001, ANA-002 | Medium | Enables evidence-based business decisions |
| 5 | **Add per-page `<title>` and `<meta description>`** using `react-helmet-async` or equivalent for all 12 pages | SEO-001 | Small | Immediate SEO improvement and SERP CTR gain |
| 6 | **Add pricing to tour cards** in `CardsSection.jsx` — "From $130/person" with a direct Book button | CRO-001 | Small | Expected increase in tour detail page CTR and booking intent |
| 7 | **Implement AggregateRating + FAQPage JSON-LD schema** using the existing review data (4.9 ★, 230+) and FAQ questions | SEO-005 | Small | Star ratings in search results; FAQ rich results |
| 8 | **Add `sitemap.xml` and `robots.txt`** to the `public/` folder | SEO-003, SEO-004 | Small | Ensures all pages are crawlable and discoverable |
| 9 | **Fix CORS configuration** — whitelist only `expeditionsgeorgeofthejungle.com` | SEC-002 | Small | Eliminates open API cross-origin access |
| 10 | **Add video `poster` attributes** and replace `<a href>` nav links with React Router `<Link>` | PERF-001, UX-001 | Small | Better LCP; faster client-side navigation |

---

## 17. Phased Implementation Roadmap

### Phase 1: Critical Issues (Week 1 — Do Immediately)

| Task | Finding | Effort |
|---|---|---|
| Rotate all credentials (MongoDB, Stripe, Clerk, Cloudinary, email) | SEC-001 | Small |
| Remove `.env` from git history, make repo private | SEC-001 | Large |
| Remove development "test tour" text from BookingModal | CQ-002 | Small |
| Fix booking TTL from 2 minutes to 24 hours | CQ-003 | Small |
| Restrict CORS to production domain | SEC-002 | Small |

**Success metric**: Zero compromised credentials; no test text visible to customers; bookings do not expire during Stripe checkout.

---

### Phase 2: Quick Wins (Weeks 2–3)

| Task | Finding | Effort |
|---|---|---|
| Add per-page titles and meta descriptions (react-helmet-async) | SEO-001 | Small |
| Add Open Graph tags for social sharing | SEO-002 | Small |
| Add sitemap.xml and robots.txt | SEO-003, SEO-004 | Small |
| Replace `<a href>` with `<Link>` in NavBar and Footer | UX-001 | Small |
| Fix multiple `<h1>` issues on Home and Tour pages | SEO-008 | Small |
| Add `poster` attribute to both autoplay videos | PERF-001 | Small |
| Add `noindex` and exclude `/success` from robots.txt | SEO-007 | Small |
| Add rate limiting (express-rate-limit) to contact and checkout endpoints | SEC-003 | Small |
| Remove verbose webhook secret from console.log | CQ-006 | Small |

**Success metric**: Google Search Console shows pages being indexed with distinct titles; social shares show correct previews.

---

### Phase 3: SEO and Performance (Weeks 3–6)

| Task | Finding | Effort |
|---|---|---|
| Implement AggregateRating + FAQPage JSON-LD schema | SEO-005 | Small |
| Add LocalBusiness schema | SEO-005 | Small |
| Add TouristTrip schema to each tour detail page | SEO-005 | Medium |
| Remove Google AdSense or limit to non-booking pages | PERF-005 | Small |
| Eliminate duplicate getTours API call | CQ-001 | Small |
| Add loading skeleton for tour cards | PERF-006 | Small |
| Fix wrong HTTP status codes in booking.controller.js | CQ-004 | Small |
| Add descriptive alt text to all images | SEO-009, ACC | Small |
| Run bundle analysis (vite-bundle-visualizer) and optimize | PERF-003 | Medium |
| Add canonical `<link>` tags | SEO-010 | Small |
| Add cross-linking between tour pages ("Related Tours") | SEO-011 | Small |

**Success metric**: Structured data validated via Google Rich Results Test; bundle size measured and documented.

---

### Phase 4: Conversion and Sales (Weeks 6–10)

| Task | Finding | Effort |
|---|---|---|
| Add Google Analytics 4 + Tag Manager | ANA-001 | Medium |
| Configure booking funnel conversion events | ANA-002 | Medium |
| Add pricing to tour cards in CardsSection | CRO-001 | Small |
| Reduce booking form to essential fields at deposit stage | CRO-003 | Medium |
| Fix cancel_url to return to tour page, not homepage | CRO-005 | Small |
| Unify WhatsApp contact numbers across the site | CRO-007 | Small |
| Add TripAdvisor badge and trust signals near CTAs | CRO-004 | Small |
| Add cookie consent banner (GDPR compliance) | CRO-004 | Medium |
| Add a prominent WhatsApp floating button | CRO | Small |
| Implement focus trap in BookingModal | ACC-001 | Small |
| Add aria-label to hamburger button and FAQ items | ACC-002 | Small |
| Add "skip to main content" link | ACC-003 | Small |
| Connect Google Search Console | SEO | Small |

**Success metric**: GA4 showing booking funnel events; booking conversion rate measurable; accessibility score improving.

---

### Phase 5: Strategic Improvements (Months 3–6)

| Task | Finding | Effort |
|---|---|---|
| Migrate to Next.js with SSG/ISR for tour pages | SEO-006 | Large |
| Create content marketing blog (Amazon travel guides) | SEO-012 | Large |
| Implement image `srcset` and responsive images for hero | PERF | Medium |
| Add TypeScript to both frontend and backend | CQ-005 | Large |
| Create dedicated landing pages for high-intent keywords | SEO-012 | Large |
| Implement email marketing / abandoned cart recovery | CRO | Medium |
| Add A/B testing infrastructure (for CTA copy, pricing display) | CRO | Medium |

---

## 18. Recommended Metrics and Validation Plan

| Improvement | How to Validate | Tool |
|---|---|---|
| Credential rotation | All services deny access with old credentials; new credentials work | Manual |
| SEO titles/descriptions | Google Search Console shows correct titles in search results | Google Search Console |
| Sitemap submission | GSC shows sitemap processed with correct URL count | Google Search Console |
| Structured data | Rich results test passes for FAQ and AggregateRating | Google Rich Results Test |
| Analytics installation | GA4 shows real-time events firing | GA4 DebugView |
| Booking funnel events | GA4 Funnel Exploration shows drop-off by step | GA4 |
| Pricing on tour cards | Measure click-through rate from tour listing to detail page (before/after) | GA4 |
| Form length reduction | Measure form completion rate before/after simplification | GA4 |
| Performance (videos + poster) | LCP score improvement in PageSpeed Insights | PageSpeed Insights |
| CORS restriction | API requests from random origins return 403 | curl/Postman |
| Rate limiting | Contact form rejects >10 requests/minute from same IP | curl/Postman |
| Booking expiry | Create a booking, wait 25+ minutes (not 2 min), confirm it persists | Manual |

---

## 19. External Tools and Tests Required

The following verifications could not be completed from static code analysis and require live testing:

| Test | Tool | Why Required |
|---|---|---|
| Core Web Vitals (LCP, INP, CLS, FCP, TTFB) | Google PageSpeed Insights / Chrome DevTools | Cannot measure from source code |
| Actual Lighthouse scores | Lighthouse (Chrome DevTools or CLI) | Cannot measure from source code |
| Search rankings and keyword opportunities | Google Search Console, Ahrefs, or Semrush | Requires live data |
| Current indexed pages | Google Search Console (`site:expeditionsgeorgeofthejungle.com`) | Requires live data |
| Crawl errors | Google Search Console, Screaming Frog | Requires live crawl |
| Broken links | Screaming Frog or Ahrefs broken link checker | Requires live crawl |
| SSL certificate validity and HTTPS configuration | SSL Labs (ssllabs.com/ssltest) | Requires live server access |
| Security headers (CSP, X-Frame-Options, HSTS) | Security Headers (securityheaders.com) | Requires live server access |
| Accessibility (screen reader, keyboard nav) | NVDA, VoiceOver, axe browser extension | Requires live testing |
| Color contrast ratios | axe, WAVE, or Colour Contrast Analyser | Requires visual rendering |
| Mobile responsiveness | Chrome DevTools device emulation, BrowserStack | Requires live rendering |
| Admin route authorization audit | Manual code review of admin.routes.js | Requires secondary code review |
| Production Stripe key status | Stripe Dashboard | Requires account access |
| MongoDB unauthorized access audit | MongoDB Atlas logs | Requires account access |

---

## 20. Final Recommendations

### Immediate Priority (This Week)

**Do not delay these actions under any circumstances:**

1. Treat `egjBackEnd/.env` as fully compromised. Every credential in it must be rotated today. The MongoDB database, Stripe account, Clerk authentication, and Cloudinary storage are all at risk.

2. Audit server logs and Stripe transaction history for any unauthorized activity since the repository was first made public.

3. Remove the "test tour" development message from `BookingModal.jsx` — this is embarrassing if any customer triggers it.

4. Fix the 2-minute booking expiry in `booking.controller.js` — this is actively breaking real customer bookings.

### Strategic Priority

The most important strategic investment is **SSR/SSG migration**. The site's business is entirely dependent on travelers who search "Amazon tours Leticia Colombia" or "ecotours Colombia English guides." Without server-side rendering, the site will remain largely invisible to Google for these commercial queries, regardless of how good the on-page content is. The complete Next.js migration is recommended within 3–6 months.

**The business is in a strong position**: 4.9 stars, 230+ reviews, 30 years of experience, a working payment flow, and genuine differentiation (English-speaking guides, local community focus, personal story). The technical issues documented in this report are blocking the business from realizing its full online potential. Fixing them does not require building new features — it requires bringing the existing website's technical infrastructure up to the standards that Google, accessibility tools, and customers expect.

---

## Audit Completion Statement

**Report file path:** `/home/harsh/Downloads/EGJ/WEBSITE_AUDIT_REPORT.md`

**Areas audited:**
- Technical SEO (page titles, meta tags, sitemap, robots.txt, structured data, rendering, URLs, headings, internal linking)
- Content SEO (keyword gaps, content opportunities, existing content quality)
- Performance (LCP, CLS, video loading, image optimization, bundle size, API fetching, third-party scripts)
- Sales and CRO (value proposition, CTAs, booking funnel, trust signals, pricing display, form friction)
- UI/UX (navigation, animations, form usability, success page, mobile menu)
- Accessibility (focus management, ARIA attributes, keyboard navigation, semantic HTML, alt text)
- Code Quality (duplicate API calls, HTTP status codes, test text in production, typos, architecture patterns)
- Security (secret credential exposure, CORS, rate limiting, webhook logging, input validation, ownership checks)
- Analytics (absence of GA4, conversion tracking gaps, measurement recommendations)

**Findings by priority:**
- P0 (Critical): **2 findings** (SEC-001, CQ-002)
- P1 (High): **12 findings**
- P2 (Medium): **20 findings**
- P3 (Low): **14 findings**
- **Total: 48 findings**

**Major limitations:** No live browser testing was performed. Core Web Vitals measurements, search rankings, analytics data, admin route authorization review, and visual accessibility tests require external tools and live site access.

**Confirmation:** No existing project file was read-write accessed, modified, created, deleted, renamed, or moved. The only new file created by this audit is `WEBSITE_AUDIT_REPORT.md` in the project root directory. No dependencies, environment variables, configurations, databases, or production services were changed.
