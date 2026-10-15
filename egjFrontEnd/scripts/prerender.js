import { build } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");
const tempSsrDir = path.resolve(projectRoot, ".temp-ssr-build");

const BASE_URL = "https://www.expeditionsgeorgeofthejungle.com";
const DEFAULT_IMAGE = `${BASE_URL}/Logo.webp`;

const ORGANIZATION_ENTITY = {
  "@type": "TravelAgency",
  "@id": `${BASE_URL}/#organization`,
  name: "Expeditions George of the Jungle",
  url: `${BASE_URL}/`,
  logo: DEFAULT_IMAGE,
  image: DEFAULT_IMAGE,
  telephone: "+573208996144",
  email: "expeditionsgeorgeofthejungle@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio Centro, Cra 9 #8-37",
    addressLocality: "Leticia",
    addressRegion: "Amazonas",
    addressCountry: "CO",
  },
};

// All 12 verified public indexable routes with unique metadata
const PUBLIC_ROUTES = [
  {
    path: "/",
    outputPath: path.join(distDir, "index.html"),
    meta: {
      title: "Expeditions George of the Jungle | Amazon Tours Leticia Colombia",
      description:
        "Reconnect with nature on our Amazon Rainforest tours from Leticia, Colombia with expert English-speaking guides. All-inclusive expeditions, wildlife treks, and river adventures.",
      canonical: `${BASE_URL}/`,
      ogTitle:
        "Expeditions George of the Jungle | Amazon Tours Leticia Colombia",
      ogDescription:
        "Reconnect with nature on our Amazon Rainforest tours from Leticia, Colombia with expert English-speaking guides. All-inclusive expeditions, wildlife treks, and river adventures.",
      ogUrl: `${BASE_URL}/`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          ORGANIZATION_ENTITY,
          {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            url: `${BASE_URL}/`,
            name: "Expeditions George of the Jungle",
            publisher: {
              "@id": `${BASE_URL}/#organization`,
            },
          },
        ],
      },
    },
  },
  {
    path: "/about",
    outputPath: path.join(distDir, "about", "index.html"),
    meta: {
      title: "About Us | Expeditions George of the Jungle | Leticia Amazonas",
      description:
        "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
      canonical: `${BASE_URL}/about`,
      ogTitle:
        "About Us | Expeditions George of the Jungle | Leticia Amazonas",
      ogDescription:
        "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
      ogUrl: `${BASE_URL}/about`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Expeditions George of the Jungle",
        url: `${BASE_URL}/about`,
        description:
          "Learn about George of the Jungle, founded with over 30 years of Amazon tourism experience in Leticia, Colombia. Our mission: sustainable ecotourism, conservation, and indigenous community connection.",
        mainEntity: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
    },
  },
  {
    path: "/tour",
    outputPath: path.join(distDir, "tour", "index.html"),
    meta: {
      title:
        "Amazon Jungle Tours & Expeditions | Expeditions George of the Jungle",
      description:
        "Explore all-inclusive Amazon rainforest tours from Leticia, Colombia. Choose from 1 to 5-day expeditions, Ayahuasca ceremonies, and jungle treks with expert English-speaking guides.",
      canonical: `${BASE_URL}/tour`,
      ogTitle:
        "Amazon Jungle Tours & Expeditions | Expeditions George of the Jungle",
      ogDescription:
        "Explore all-inclusive Amazon rainforest tours from Leticia, Colombia. Choose from 1 to 5-day expeditions, Ayahuasca ceremonies, and jungle treks with expert English-speaking guides.",
      ogUrl: `${BASE_URL}/tour`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Amazon Jungle Tours & Expeditions",
        url: `${BASE_URL}/tour`,
        description:
          "Explore all-inclusive Amazon rainforest tours from Leticia, Colombia. Choose from 1 to 5-day expeditions, Ayahuasca ceremonies, and jungle treks with expert English-speaking guides.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Gamboa & Sacambu Full Day",
              url: `${BASE_URL}/tour/gamboa-sacambu`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "2 Days & 1 Night Amazon Jungle Expedition",
              url: `${BASE_URL}/tour/2-days-1-night`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "3 Days & 2 Nights Amazon Jungle Expedition",
              url: `${BASE_URL}/tour/3-days-2-nights`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "4 Days & 3 Nights Amazon Jungle Expedition",
              url: `${BASE_URL}/tour/4-days-3-nights`,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: "5 Days & 4 Nights Ultimate Amazon Jungle Expedition",
              url: `${BASE_URL}/tour/5-days-4-nights`,
            },
            {
              "@type": "ListItem",
              position: 6,
              name: "Ayahuasca Experience",
              url: `${BASE_URL}/tour/ayahuasca`,
            },
          ],
        },
      },
    },
  },
  {
    path: "/tour/gamboa-sacambu",
    outputPath: path.join(distDir, "tour", "gamboa-sacambu", "index.html"),
    meta: {
      title:
        "Gamboa & Sacambu Full Day Amazon Tour | Expeditions George of the Jungle",
      description:
        "A full day Amazon adventure from Leticia: scenic river cruise into a Peruvian indigenous community, two-hour jungle trek, local community lunch, and pink dolphin sightings.",
      canonical: `${BASE_URL}/tour/gamboa-sacambu`,
      ogTitle:
        "Gamboa & Sacambu Full Day Amazon Tour | Expeditions George of the Jungle",
      ogDescription:
        "A full day Amazon adventure from Leticia: scenic river cruise into a Peruvian indigenous community, two-hour jungle trek, local community lunch, and pink dolphin sightings.",
      ogUrl: `${BASE_URL}/tour/gamboa-sacambu`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "Gamboa & Sacambu Full Day Amazon Tour",
        description:
          "A full day Amazon adventure from Leticia: scenic river cruise into a Peruvian indigenous community, two-hour jungle trek, local community lunch, and pink dolphin sightings.",
        touristType: ["Eco-tourists", "Adventure travellers", "Families"],
        offers: {
          "@type": "Offer",
          price: "130",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/tour/2-days-1-night",
    outputPath: path.join(distDir, "tour", "2-days-1-night", "index.html"),
    meta: {
      title:
        "2 Days & 1 Night Amazon Jungle Expedition | Expeditions George of the Jungle",
      description:
        "A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters from Leticia.",
      canonical: `${BASE_URL}/tour/2-days-1-night`,
      ogTitle:
        "2 Days & 1 Night Amazon Jungle Expedition | Expeditions George of the Jungle",
      ogDescription:
        "A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters from Leticia.",
      ogUrl: `${BASE_URL}/tour/2-days-1-night`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "2 Days & 1 Night Amazon Jungle Expedition",
        description:
          "A two-day Amazon stay shaped around jungle trekking, river wildlife, bird-watching, caiman spotting, night exploration, and a peaceful return through dolphin waters.",
        touristType: ["Eco-tourists", "Adventure travellers"],
        offers: {
          "@type": "Offer",
          price: "210",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/tour/3-days-2-nights",
    outputPath: path.join(distDir, "tour", "3-days-2-nights", "index.html"),
    meta: {
      title:
        "3 Days & 2 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
      description:
        "Experience a 3-day Amazon immersion from Leticia: deep rainforest treks, medicinal plant knowledge, survival techniques, nocturnal caiman spotting, and flooded forest canoeing.",
      canonical: `${BASE_URL}/tour/3-days-2-nights`,
      ogTitle:
        "3 Days & 2 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
      ogDescription:
        "Experience a 3-day Amazon immersion from Leticia: deep rainforest treks, medicinal plant knowledge, survival techniques, nocturnal caiman spotting, and flooded forest canoeing.",
      ogUrl: `${BASE_URL}/tour/3-days-2-nights`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "3 Days & 2 Nights Amazon Jungle Expedition",
        description:
          "Experience a 3-day Amazon immersion from Leticia: deep rainforest treks, medicinal plant knowledge, survival techniques, nocturnal caiman spotting, and flooded forest canoeing.",
        touristType: ["Eco-tourists", "Adventure travellers"],
        offers: {
          "@type": "Offer",
          price: "310",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/tour/4-days-3-nights",
    outputPath: path.join(distDir, "tour", "4-days-3-nights", "index.html"),
    meta: {
      title:
        "4 Days & 3 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
      description:
        "Extended 4-day Amazon expedition from Leticia. Deep canopy trekking, wildlife tracking, survival skills, caiman spotting, remote lake navigation, and cultural connection in Gamboa.",
      canonical: `${BASE_URL}/tour/4-days-3-nights`,
      ogTitle:
        "4 Days & 3 Nights Amazon Jungle Expedition | Expeditions George of the Jungle",
      ogDescription:
        "Extended 4-day Amazon expedition from Leticia. Deep canopy trekking, wildlife tracking, survival skills, caiman spotting, remote lake navigation, and cultural connection in Gamboa.",
      ogUrl: `${BASE_URL}/tour/4-days-3-nights`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "4 Days & 3 Nights Amazon Jungle Expedition",
        description:
          "Extended 4-day Amazon expedition from Leticia. Deep canopy trekking, wildlife tracking, survival skills, caiman spotting, remote lake navigation, and cultural connection in Gamboa.",
        touristType: ["Eco-tourists", "Adventure travellers"],
        offers: {
          "@type": "Offer",
          price: "410",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/tour/5-days-4-nights",
    outputPath: path.join(distDir, "tour", "5-days-4-nights", "index.html"),
    meta: {
      title:
        "5 Days & 4 Nights Ultimate Amazon Jungle Expedition | Expeditions George of the Jungle",
      description:
        "Our most complete 5-day Amazon expedition from Leticia. Remote jungle exploration, extensive wildlife tracking, nocturnal safaris, canoe navigation, and rich indigenous cultural exchange.",
      canonical: `${BASE_URL}/tour/5-days-4-nights`,
      ogTitle:
        "5 Days & 4 Nights Ultimate Amazon Jungle Expedition | Expeditions George of the Jungle",
      ogDescription:
        "Our most complete 5-day Amazon expedition from Leticia. Remote jungle exploration, extensive wildlife tracking, nocturnal safaris, canoe navigation, and rich indigenous cultural exchange.",
      ogUrl: `${BASE_URL}/tour/5-days-4-nights`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "5 Days & 4 Nights Ultimate Amazon Jungle Expedition",
        description:
          "Our most complete 5-day Amazon expedition from Leticia. Remote jungle exploration, extensive wildlife tracking, nocturnal safaris, canoe navigation, and rich indigenous cultural exchange.",
        touristType: ["Eco-tourists", "Adventure travellers"],
        offers: {
          "@type": "Offer",
          price: "510",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/tour/ayahuasca",
    outputPath: path.join(distDir, "tour", "ayahuasca", "index.html"),
    meta: {
      title:
        "Ayahuasca Experience & Healing Ceremony | Expeditions George of the Jungle",
      description:
        "A traditional Amazonian healing ceremony guided by an experienced shaman in Leticia, Colombia. Created for spiritual, emotional, and personal reflection in a safe, respectful setting.",
      canonical: `${BASE_URL}/tour/ayahuasca`,
      ogTitle:
        "Ayahuasca Experience & Healing Ceremony | Expeditions George of the Jungle",
      ogDescription:
        "A traditional Amazonian healing ceremony guided by an experienced shaman in Leticia, Colombia. Created for spiritual, emotional, and personal reflection in a safe, respectful setting.",
      ogUrl: `${BASE_URL}/tour/ayahuasca`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: "Ayahuasca Experience & Healing Ceremony",
        description:
          "A traditional Amazonian healing ceremony guided by an experienced shaman in Leticia, Colombia. Created for spiritual, emotional, and personal reflection in a safe, respectful setting.",
        touristType: ["Spiritual seekers", "Cultural travellers"],
        offers: {
          "@type": "Offer",
          price: "110",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: {
          "@type": "TravelAgency",
          name: "Expeditions George of the Jungle",
          url: `${BASE_URL}/`,
        },
      },
    },
  },
  {
    path: "/contact",
    outputPath: path.join(distDir, "contact", "index.html"),
    meta: {
      title: "Contact Us | Expeditions George of the Jungle | Leticia Colombia",
      description:
        "Get in touch with Expeditions George of the Jungle in Leticia, Amazonas, Colombia. Contact us via WhatsApp (+57 320 899-6144) or email to plan and book your Amazon adventure.",
      canonical: `${BASE_URL}/contact`,
      ogTitle:
        "Contact Us | Expeditions George of the Jungle | Leticia Colombia",
      ogDescription:
        "Get in touch with Expeditions George of the Jungle in Leticia, Amazonas, Colombia. Contact us via WhatsApp (+57 320 899-6144) or email to plan and book your Amazon adventure.",
      ogUrl: `${BASE_URL}/contact`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Expeditions George of the Jungle",
        url: `${BASE_URL}/contact`,
        description:
          "Get in touch with Expeditions George of the Jungle in Leticia, Amazonas, Colombia. Contact us via WhatsApp (+57 320 899-6144) or email to plan and book your Amazon adventure.",
        mainEntity: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
    },
  },
  {
    path: "/refund-policy",
    outputPath: path.join(distDir, "refund-policy", "index.html"),
    meta: {
      title: "Refund Policy & Terms | Expeditions George of the Jungle",
      description:
        "Read the official refund policy and terms of service for Expeditions George of the Jungle, registered tourism operator in Leticia, Amazonas, Colombia.",
      canonical: `${BASE_URL}/refund-policy`,
      ogTitle: "Refund Policy & Terms | Expeditions George of the Jungle",
      ogDescription:
        "Read the official refund policy and terms of service for Expeditions George of the Jungle, registered tourism operator in Leticia, Amazonas, Colombia.",
      ogUrl: `${BASE_URL}/refund-policy`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Refund Policy & Terms | Expeditions George of the Jungle",
        url: `${BASE_URL}/refund-policy`,
        description:
          "Read the official refund policy and terms of service for Expeditions George of the Jungle, registered tourism operator in Leticia, Amazonas, Colombia.",
      },
    },
  },
  {
    path: "/privacy-policy",
    outputPath: path.join(distDir, "privacy-policy", "index.html"),
    meta: {
      title: "Privacy Policy | Expeditions George of the Jungle",
      description:
        "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
      canonical: `${BASE_URL}/privacy-policy`,
      ogTitle: "Privacy Policy | Expeditions George of the Jungle",
      ogDescription:
        "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
      ogUrl: `${BASE_URL}/privacy-policy`,
      ogImage: DEFAULT_IMAGE,
      ogType: "website",
      ogSiteName: "Expeditions George of the Jungle",
      twitterCard: "summary_large_image",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy | Expeditions George of the Jungle",
        url: `${BASE_URL}/privacy-policy`,
        description:
          "Privacy policy for Expeditions George of the Jungle. Learn how we collect, protect, and handle personal information for our Amazon tours and website visitors.",
      },
    },
  },
];

function injectMetadata(html, meta) {
  let updated = html;

  // Replace default title
  if (meta.title) {
    updated = updated.replace(
      /<title>.*?<\/title>/i,
      `<title>${meta.title}</title>`
    );
  }

  // Strip any existing SEO/meta tags to prevent duplicates
  updated = updated.replace(/\s*<meta name="description"[^>]*>/gi, "");
  updated = updated.replace(/\s*<link rel="canonical"[^>]*>/gi, "");
  updated = updated.replace(/\s*<meta property="og:[^>]*>/gi, "");
  updated = updated.replace(/\s*<meta name="twitter:[^>]*>/gi, "");
  updated = updated.replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
    ""
  );

  // Construct structured tags
  const tags = [
    meta.description
      ? `  <meta name="description" content="${meta.description}" />`
      : "",
    meta.canonical
      ? `  <link rel="canonical" href="${meta.canonical}" />`
      : "",
    meta.ogTitle
      ? `  <meta property="og:title" content="${meta.ogTitle}" />`
      : "",
    meta.ogDescription
      ? `  <meta property="og:description" content="${meta.ogDescription}" />`
      : "",
    meta.ogUrl ? `  <meta property="og:url" content="${meta.ogUrl}" />` : "",
    meta.ogType
      ? `  <meta property="og:type" content="${meta.ogType}" />`
      : "",
    meta.ogImage
      ? `  <meta property="og:image" content="${meta.ogImage}" />`
      : "",
    meta.ogSiteName
      ? `  <meta property="og:site_name" content="${meta.ogSiteName}" />`
      : "",
    meta.twitterCard
      ? `  <meta name="twitter:card" content="${meta.twitterCard}" />`
      : "",
    meta.ogTitle
      ? `  <meta name="twitter:title" content="${meta.ogTitle}" />`
      : "",
    meta.ogDescription
      ? `  <meta name="twitter:description" content="${meta.ogDescription}" />`
      : "",
    meta.ogImage
      ? `  <meta name="twitter:image" content="${meta.ogImage}" />`
      : "",
    meta.schema
      ? `  <script type="application/ld+json">\n${JSON.stringify(
          meta.schema,
          null,
          2
        )}\n  </script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Inject metadata tags right before closing </head>
  updated = updated.replace("</head>", `${tags}\n</head>`);
  return updated;
}

async function prerender() {
  console.log("=== Starting Stage 2 SEO Pre-rendering ===");

  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      "Client build not found. Run 'vite build' before pre-rendering."
    );
  }

  const baseTemplate = fs.readFileSync(templatePath, "utf-8");

  try {
    // Step 1: Build temporary SSR bundle
    console.log("Compiling SSR bundle for pre-rendering...");
    await build({
      root: projectRoot,
      build: {
        ssr: true,
        outDir: tempSsrDir,
        emptyOutDir: true,
        rollupOptions: {
          input: path.resolve(projectRoot, "src", "prerender-entry.jsx"),
        },
      },
      ssr: {
        noExternal: true,
      },
      logLevel: "warn",
    });

    const ssrBundlePath = path.join(tempSsrDir, "prerender-entry.js");
    const { render } = await import(`file://${ssrBundlePath}`);

    // Step 2: Render each verified public route
    let generatedCount = 0;
    for (const route of PUBLIC_ROUTES) {
      console.log(`Pre-rendering route: ${route.path}`);
      let appHtml;
      try {
        appHtml = render(route.path);
      } catch (renderError) {
        throw new Error(
          `Failed rendering route '${route.path}': ${renderError.message}`
        );
      }

      // Inject app body markup reliably, whether template is empty shell or previous pre-render
      let finalHtml = baseTemplate.replace(
        /<div id="root">[\s\S]*<\/div>\s*<\/body>/i,
        () => `<div id="root">${appHtml}</div>\n</body>`
      );

      // Inject route metadata, Open Graph, and JSON-LD
      finalHtml = injectMetadata(finalHtml, route.meta);

      // Ensure output directory exists and write file
      const targetDir = path.dirname(route.outputPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(route.outputPath, finalHtml, "utf-8");
      generatedCount++;
      console.log(
        `✓ Generated: ${path.relative(projectRoot, route.outputPath)} (${(
          finalHtml.length / 1024
        ).toFixed(1)} KB)`
      );
    }

    console.log(
      `\n=== Stage 2 Pre-rendering complete! Successfully generated ${generatedCount}/${PUBLIC_ROUTES.length} routes. ===`
    );
  } finally {
    // Step 3: Clean up temporary SSR bundle in all cases
    if (fs.existsSync(tempSsrDir)) {
      console.log("Cleaning up temporary SSR build files...");
      fs.rmSync(tempSsrDir, { recursive: true, force: true });
    }
  }
}

prerender().catch((err) => {
  console.error("Pre-rendering failed:", err);
  process.exit(1);
});
