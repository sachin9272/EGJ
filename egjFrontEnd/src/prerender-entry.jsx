import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";

// Public key used for rendering the unauthenticated public shell during SSG
const PUBLISHABLE_KEY =
  process.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_dWx0aW1hdGUtc3BhbmllbC00Ny5jbGVyay5hY2NvdW50cy5kZXYk";

/**
 * Server-side pre-render function for public static routes.
 * Renders the application in an unauthenticated guest state with StaticRouter.
 *
 * @param {string} url - The route path to render (e.g. "/" or "/tour/2-days-1-night")
 * @returns {string} Pre-rendered HTML string of the React app tree
 */
export function render(url) {
  return renderToString(
    React.createElement(
      ClerkProvider,
      { publishableKey: PUBLISHABLE_KEY },
      React.createElement(
        StaticRouter,
        { location: url },
        React.createElement(App)
      )
    )
  );
}
