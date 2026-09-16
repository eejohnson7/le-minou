export const publicPages = {
  "/": {
    title: "Le Minou | Cat Care & Dog Walking in North Side Chicago",
    description: "Cat visits and dog walks with Erin on Chicago’s North Side. Thoughtful pet care at home, with familiar routines and updates while you’re away."
  },
  "/services": {
    title: "Services & Pricing | Le Minou",
    description: "Explore Le Minou’s cat visits, dog walks, pricing, and extra charges. Find the right care for your pet with Erin."
  },
  "/about": {
    title: "About Erin | Le Minou",
    description: "Meet Erin, the owner and caregiver behind Le Minou. Personal cat care and dog walking on Chicago’s North Side, with every visit handled by Erin."
  },
  "/request-care": {
    title: "Request Cat Care or Dog Walking | Le Minou",
    description: "Tell Erin what your pet needs and request care from Le Minou. No account needed; Erin will email you about availability."
  }
};

export function siteOrigin(value) {
  if (!value) return "";
  const url = new URL(value);
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
    "og:image:alt": "Le Minou’s plum cat logo",
    "og:image:width": "1080",
    "og:image:height": "1080",
    "twitter:card": "summary_large_image",
    "twitter:title": page.title,
    "twitter:description": page.description,
    "twitter:image:alt": "Le Minou’s plum cat logo",
    ...(origin ? {
      canonical: `${origin}${path}`,
      "og:url": `${origin}${path}`,
      "og:image": `${origin}/social-preview.png`,
      "twitter:image": `${origin}/social-preview.png`
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
