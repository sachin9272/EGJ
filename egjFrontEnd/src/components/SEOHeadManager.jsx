import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE_METADATA_MAP } from "../constants/routeMetadata";

function setOrCreateMetaTag(attributeName, attributeValue, contentValue) {
  if (typeof document === "undefined") return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", contentValue);
}

function setOrCreateLinkTag(relValue, hrefValue) {
  if (typeof document === "undefined") return;

  let element = document.querySelector(`link[rel="${relValue}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", relValue);
    document.head.appendChild(element);
  }
  element.setAttribute("href", hrefValue);
}

function removeMetaTag(attributeName, attributeValue) {
  if (typeof document === "undefined") return;

  const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (element) {
    element.parentNode.removeChild(element);
  }
}

/**
 * SEOHeadManager synchronizes document.title and critical head tags
 * during client-side SPA navigation, ensuring parity with pre-rendered HTML.
 */
export default function SEOHeadManager() {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const normalizedPath = location.pathname.endsWith("/") && location.pathname.length > 1
      ? location.pathname.slice(0, -1)
      : location.pathname;

    const currentMeta =
      ROUTE_METADATA_MAP[normalizedPath] ||
      ROUTE_METADATA_MAP[location.pathname] ||
      ROUTE_METADATA_MAP["404"];

    if (!currentMeta) return;

    // 1. Sync Document Title
    if (currentMeta.title && document.title !== currentMeta.title) {
      document.title = currentMeta.title;
    }

    // 2. Sync Meta Description
    if (currentMeta.description) {
      setOrCreateMetaTag("name", "description", currentMeta.description);
    }

    // 3. Sync Canonical Link
    if (currentMeta.canonical) {
      setOrCreateLinkTag("canonical", currentMeta.canonical);
    }

    // 4. Sync Robots Directives (e.g. noindex for /success or 404)
    if (currentMeta.robots) {
      setOrCreateMetaTag("name", "robots", currentMeta.robots);
    } else {
      removeMetaTag("name", "robots");
    }

    // 5. Sync Open Graph Tags
    if (currentMeta.ogTitle) {
      setOrCreateMetaTag("property", "og:title", currentMeta.ogTitle);
      setOrCreateMetaTag("name", "twitter:title", currentMeta.ogTitle);
    }
    if (currentMeta.ogDescription) {
      setOrCreateMetaTag("property", "og:description", currentMeta.ogDescription);
      setOrCreateMetaTag("name", "twitter:description", currentMeta.ogDescription);
    }
    if (currentMeta.ogUrl) {
      setOrCreateMetaTag("property", "og:url", currentMeta.ogUrl);
    }
    if (currentMeta.ogImage) {
      setOrCreateMetaTag("property", "og:image", currentMeta.ogImage);
      setOrCreateMetaTag("name", "twitter:image", currentMeta.ogImage);
    }
    if (currentMeta.ogType) {
      setOrCreateMetaTag("property", "og:type", currentMeta.ogType);
    }
    if (currentMeta.ogSiteName) {
      setOrCreateMetaTag("property", "og:site_name", currentMeta.ogSiteName);
    }
    if (currentMeta.twitterCard) {
      setOrCreateMetaTag("name", "twitter:card", currentMeta.twitterCard);
    }
  }, [location.pathname]);

  return null;
}
