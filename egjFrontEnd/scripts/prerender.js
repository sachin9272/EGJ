/* global process */
import { build } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROUTE_METADATA_MAP } from "../src/constants/routeMetadata.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");
const tempSsrDir = path.resolve(projectRoot, ".temp-ssr-build");

const PUBLIC_ROUTE_KEYS = [
  "/",
  "/about",
  "/tour",
  "/tour/gamboa-sacambu",
  "/tour/2-days-1-night",
  "/tour/3-days-2-nights",
  "/tour/4-days-3-nights",
  "/tour/5-days-4-nights",
  "/tour/ayahuasca",
  "/contact",
  "/refund-policy",
  "/privacy-policy",
];

const PUBLIC_ROUTES = PUBLIC_ROUTE_KEYS.map((key) => {
  const meta = ROUTE_METADATA_MAP[key];
  if (!meta) {
    throw new Error(`Missing route metadata configuration for key: ${key}`);
  }
  const relativeSubpath =
    key === "/" ? "index.html" : path.join(key.slice(1), "index.html");
  return {
    path: key,
    outputPath: path.join(distDir, relativeSubpath),
    meta,
  };
});

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
