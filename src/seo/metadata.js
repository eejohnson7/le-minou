export const publicPages = {
  "/": {
    title: "Le Minou | Cat Sitting & Dog Walking in Lakeview East",
    description: "In-home cat sitting and dog walking with Erin in Lakeview East, Chicago. Keep your pet’s routine familiar and get updates while you’re away."
  },
  "/services": {
    title: "Lakeview East Pet Care Pricing | Le Minou",
    description: "See Le Minou’s cat sitting and dog walking rates for Lakeview East, Chicago, including 30- and 60-minute appointments."
  },
  "/about": {
    title: "Meet Erin, Lakeview East Pet Sitter | Le Minou",
    description: "Meet Erin, the owner of Le Minou and the person who handles every cat visit and dog walk in Lakeview East, Chicago."
  },
  "/request-care": {
    title: "Request Pet Care in Lakeview East | Le Minou",
    description: "Request cat sitting or dog walking in Lakeview East, Chicago. Tell Erin what your pet needs and she’ll email you about availability."
  }
};

export function siteOrigin(value) {
  const url = new URL(value || "https://leminou-chi.com");
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("VITE_SITE_URL must be a public HTTPS origin, without a path, credentials, query, or hash.");
  }
  return url.origin;
}

export function pageMetadata(pathname, origin = "") {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = publicPages[path];
  if (!page) return { title: "Le Minou", robots: "noindex, nofollow" };
  return {
    ...page,
    robots: "index, follow",
    "og:type": "website",
    "og:site_name": "Le Minou",
    "og:locale": "en_US",
    "og:title": page.title,
    "og:description": page.description,
    "og:image:alt": "Le Minou cat sitting and dog walking in Lakeview East, Chicago",
    "og:image:type": "image/jpeg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "twitter:card": "summary_large_image",
    "twitter:title": page.title,
    "twitter:description": page.description,
    "twitter:image:alt": "Le Minou cat sitting and dog walking in Lakeview East, Chicago",
    ...(origin ? {
      canonical: `${origin}${path}`,
      "og:url": `${origin}${path}`,
      "og:image": `${origin}/social-preview-lakeview-east.jpg`,
      "twitter:image": `${origin}/social-preview-lakeview-east.jpg`
    } : {})
  };
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

export function metadataHtml(metadata) {
  return Object.entries(metadata).map(([key, value]) => {
    const content = escapeHtml(value);
    if (key === "title") return `<title data-seo>${content}</title>`;
    if (key === "canonical") return `<link data-seo rel="canonical" href="${content}" />`;
    return `<meta data-seo ${key.startsWith("og:") ? "property" : "name"}="${key}" content="${content}" />`;
  }).join("\n    ");
}
