# Expeditions George of the Jungle (EGJ) — Website & SEO Architecture

Official web platform for **Expeditions George of the Jungle**, an ecotourism and adventure expedition operator based in Leticia, Amazonas, Colombia.

---

## 1. Project Overview & Technology Stack

- **Frontend:** React 19.1.0, Vite 7.0.4, React Router DOM 7.7.1
- **Styling:** Tailwind CSS, Sass (SCSS Modules)
- **Authentication:** Clerk React (`@clerk/clerk-react`)
- **Payments & Checkout:** Stripe API integration
- **Hosting & Infrastructure:** Hostinger Ubuntu VPS with Nginx (`nginx/1.28.0`)
- **Backend API:** Node.js / Express API running behind reverse proxy at `https://api.expeditionsgeorgeofthejungle.com/api/v1/`
- **Domain:** `https://www.expeditionsgeorgeofthejungle.com`

---

## 2. Implemented Features & Technical SEO Architecture

### A. Static Pre-Rendering (SSG) Engine
To solve client-side rendering (CSR) limitations where search crawlers received an empty `<div id="root"></div>`, a native pre-rendering engine was implemented without migrating to Next.js or disrupting existing React 19 / Vite architecture:

1. **Dedicated SSR Entry Point (`src/prerender-entry.jsx`):**
   - Uses `renderToString` from `react-dom/server`.
   - Wraps the app in `StaticRouter` and `ClerkProvider` in a guest state.
   - Evaluates safely in Node without executing client-only `window` or `document` calls.
2. **Automated Pre-rendering Script (`scripts/prerender.js`):**
   - Compiles a temporary SSR bundle via Vite's programmatic build API.
   - Pre-renders all 12 confirmed public indexable routes.
   - Injects the server-rendered DOM directly into the HTML `#root` container.
   - Injects unique `<title>`, `<meta name="description">`, canonical `<link>`, Open Graph, Twitter cards, and JSON-LD schema.
   - Automatically cleans up temporary build files in a `finally` block.
3. **Dedicated Build Command (`npm run build:prerender`):**
   - Automatically compiles Vite client assets and executes `scripts/prerender.js`.
   - Generates fully populated, independent HTML files in `dist/`.

---

### B. Pre-rendered Routes & Metadata Matrix

All 12 public routes generate standalone static HTML files with unique, verified metadata:

| Route | Generated Static File | `<title>` | Schema.org Type | Initial HTML Content |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `dist/index.html` (45 KB) | `Expeditions George of the Jungle \| Amazon Tours Leticia Colombia` | `@graph[TravelAgency, WebSite]` | Hero, TravelWithUs, Community, Footer |
| `/about` | `dist/about/index.html` (20 KB) | `About Us \| Expeditions George of the Jungle \| Leticia Amazonas` | `AboutPage` | Founder story, 30+ years experience, Mission, Vision |
| `/tour` | `dist/tour/index.html` (24 KB) | `Amazon Jungle Tours & Expeditions \| Expeditions George of the Jungle` | `CollectionPage` (`ItemList`) | Hero, 6 Tour Cards with Links, All 8 FAQs, Footer |
| `/tour/gamboa-sacambu` | `dist/tour/gamboa-sacambu/index.html` (32 KB) | `Gamboa & Sacambu Full Day Amazon Tour \| Expeditions George of the Jungle` | `TouristTrip` ($130 USD) | Full day itinerary, dolphin cruise, ceiba trek |
| `/tour/2-days-1-night` | `dist/tour/2-days-1-night/index.html` (32 KB) | `2 Days & 1 Night Amazon Jungle Expedition \| Expeditions George of the Jungle` | `TouristTrip` ($210 USD) | 2D/1N itinerary, caiman encounter, night walk |
| `/tour/3-days-2-nights` | `dist/tour/3-days-2-nights/index.html` (33 KB) | `3 Days & 2 Nights Amazon Jungle Expedition \| Expeditions George of the Jungle` | `TouristTrip` ($310 USD) | 3D/2N itinerary, flooded forest canoe, plants |
| `/tour/4-days-3-nights` | `dist/tour/4-days-3-nights/index.html` (34 KB) | `4 Days & 3 Nights Amazon Jungle Expedition \| Expeditions George of the Jungle` | `TouristTrip` ($410 USD) | 4D/3N itinerary, deep jungle tracking, survival |
| `/tour/5-days-4-nights` | `dist/tour/5-days-4-nights/index.html` (34 KB) | `5 Days & 4 Nights Ultimate Amazon Jungle Expedition \| Expeditions George of the Jungle` | `TouristTrip` ($510 USD) | 5D/4N itinerary, remote lakes, indigenous culture |
| `/tour/ayahuasca` | `dist/tour/ayahuasca/index.html` (34 KB) | `Ayahuasca Experience & Healing Ceremony \| Expeditions George of the Jungle` | `TouristTrip` ($110 USD) | Shaman-guided ceremony, preparation steps |
| `/contact` | `dist/contact/index.html` (19 KB) | `Contact Us \| Expeditions George of the Jungle \| Leticia Colombia` | `ContactPage` | Cra 9 #8-37 Leticia address, WhatsApp, Form |
| `/refund-policy` | `dist/refund-policy/index.html` (17 KB) | `Refund Policy & Terms \| Expeditions George of the Jungle` | `WebPage` | 30% deposit terms, Colombian tourism law |
| `/privacy-policy` | `dist/privacy-policy/index.html` (22 KB) | `Privacy Policy \| Expeditions George of the Jungle` | `WebPage` | GDPR & CCPA disclosures, data protection |

*Note: `/success` (post-payment booking confirmation) is deliberately excluded from static generation, omitted from `sitemap.xml`, and blocked from crawling in `robots.txt`.*

---

### C. Tour Catalog Static Pre-rendering (`/tour`)
- **Initial State Catalog (`src/constants/verifiedTours.js`):** Created a verified tour catalog containing all six tours, descriptions, Cloudinary images, detail links, and prices derived directly from `src/constants/tourPricing.js`.
- **Hydration & Resiliency (`src/components/tourExpeditions/CardsSection.jsx`):**
  - Initial state renders all 6 cards directly into the raw HTML.
  - When mounted in the browser, `useEffect` queries `getTours()`.
  - On API success, live data updates the view without duplicating cards.
  - On API error/offline state, valid static cards are never erased.

---

### D. Production API Safeguards
- **Production URL Fallback (`src/config/api.js`):**
  - Production builds automatically default to `https://api.expeditionsgeorgeofthejungle.com/api/v1/`.
  - Production builds are strictly prevented from ever falling back to `http://localhost:5001/api/v1/`.
  - Local development environments continue to support `localhost` without breaking developer workflows.
- **Build-Time Validation (`vite.config.js`):**
  - Detects if `VITE_API_BASE_URL` contains `localhost` in a production CI/deployment build and halts execution with an actionable error.

---

### E. Search Engine Crawling & Verification
- **XML Sitemap (`public/sitemap.xml`):** Contains 12 canonical production URLs with proper priority and change frequency. Automatically bundled to `dist/sitemap.xml`.
- **Robots Configuration (`public/robots.txt`):** Allows public routes, explicitly disallows `/success`, and references `https://www.expeditionsgeorgeofthejungle.com/sitemap.xml`.
- **Google Search Console Verification:** Included `public/googlebbc66ba8fce775ed.html` so Vite automatically bundles the verification token to `dist/`.

---

### F. Legal & Content Polish
- **Refund Policy Cleanup (`src/pages/RefundPolicy.jsx`):** Removed unrelated web-hosting boilerplate (`"Sitelock 911 - Trustee Fees"`). Preserved legitimate ecotourism deposit and force majeure cancellation terms.
- **Guide Certification Accuracy:** Updated metadata claims from unverified "certified guides" to verified "expert English-speaking guides".
- **Structured Data Compliance:** Removed self-serving `aggregateRating` markup from `TravelAgency` JSON-LD to comply with Google Search rich snippet guidelines, while maintaining the real interactive Google reviews carousel on the frontend.

---

## 3. Server Configuration (Hostinger Ubuntu VPS + Nginx)

The live production site runs on Nginx. Pre-rendered HTML directories are served directly with the following configuration:

### Nginx Site Block (`/etc/nginx/sites-available/expeditionsgeorgeofthejungle.com`)
```nginx
server {
    server_name expeditionsgeorgeofthejungle.com www.expeditionsgeorgeofthejungle.com;
    root /var/www/html/EGJ/egjFrontEnd/dist;
    index index.html;

    client_max_body_size 100M;

    # Gzip compression for high Core Web Vitals performance
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Hashed static assets (CSS, JS)
    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Images and webp assets
    location ~* \.(ico|png|webp|svg)$ {
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Robots, sitemap, and Google site verification
    location ~* ^/(robots\.txt|sitemap\.xml|google[a-z0-9]+\.html)$ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=3600";
    }

    # SPA Shell: Never cache root index.html so code updates apply immediately
    location = /index.html {
        try_files $uri =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Serves pre-rendered HTML files first, falls back to SPA router
    location / {
        try_files $uri $uri/index.html $uri/ /index.html;
    }

    listen 443 ssl; # Managed by Certbot
    ssl_certificate /etc/letsencrypt/live/expeditionsgeorgeofthejungle.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/expeditionsgeorgeofthejungle.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name expeditionsgeorgeofthejungle.com www.expeditionsgeorgeofthejungle.com;
    return 301 https://$host$request_uri;
}
```

---

## 4. How to Build & Deploy to Hostinger VPS

Whenever changes are made to the codebase, follow these steps to deploy:

### 1. Locally: Commit and push changes
```bash
git add .
git commit -m "feat: your update description"
git push origin main
```

### 2. On your VPS Server (`ssh root@srv1207816`):
```bash
# Navigate to project repository
cd /var/www/html/EGJ

# Pull latest code
git pull origin main

# Build the pre-rendered application
cd egjFrontEnd
npm run build:prerender

# (Optional) Reload Nginx if nginx.conf changed
nginx -t && systemctl reload nginx
```

---

## 5. Live Verification Commands

You can verify the production deployment at any time by running:

```bash
# 1. Verify 2D/1N tour returns pre-rendered title and itinerary
curl -s https://www.expeditionsgeorgeofthejungle.com/tour/2-days-1-night | grep "<title>"

# 2. Verify all 6 tour cards are present in raw HTML on /tour
curl -s https://www.expeditionsgeorgeofthejungle.com/tour | grep -o "card_individual_container" | wc -l
# Expected output: 6

# 3. Verify sitemap and robots.txt headers
curl -s -I https://www.expeditionsgeorgeofthejungle.com/sitemap.xml
curl -s -I https://www.expeditionsgeorgeofthejungle.com/robots.txt
```

---

## 6. Remaining Strategic Roadmap (Post-Deployment)

From the [**`WEBSITE_AUDIT_REPORT.md`**](WEBSITE_AUDIT_REPORT.md):

1. **Google Search Console Indexing:**
   - Submit `sitemap.xml` under **Sitemaps**.
   - Request indexing for `/`, `/tour`, and `/tour/2-days-1-night` via the **URL Inspection Tool**.
2. **Colombian Tourism Registry (RNT Number):**
   - Confirm the official Colombian National Tourism Registry (RNT) number with the business owner and add it to `RefundPolicy.jsx` and `Footer.jsx` as mandated by Colombian Law 300 / Decree 229.
3. **Backend Security & Bug Fixes:**
   - Rotate MongoDB, Stripe, and Clerk credentials that were previously in Git history.
   - Fix booking TTL in `egjBackEnd/controllers/booking.controller.js` from `2 minutes` to `24 hours`.
   - Whitelist CORS origin in `egjBackEnd` to `https://www.expeditionsgeorgeofthejungle.com`.
4. **Conversion Rate Optimization:**
   - Add visible starting prices (e.g. *"From $130 / person"*) on the tour cards in `CardsSection.jsx`.
   - Unify WhatsApp phone numbers across Header, Footer, and Tour detail pages.
   - Configure Google Analytics 4 (GA4) with booking funnel conversion events (`modal_open`, `checkout_initiated`, `booking_success`).
