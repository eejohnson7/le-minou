import { loadEnv } from "vite";
import { metadataHtml, pageMetadata, publicPages, siteOrigin } from "../src/seo/metadata.js";

// Emit real HTML heads for crawlers and social preview bots that do not run React.
export default function seoPlugin() {
  let origin = "";
  return {
    name: "public-page-seo",
    configResolved(config) {
      origin = siteOrigin(loadEnv(config.mode, config.envDir, "VITE_").VITE_SITE_URL);

    },
    transformIndexHtml() {
      return [{ tag: "meta", attrs: { "data-seo": "", name: "robots", content: "noindex, nofollow" }, injectTo: "head" }];
    },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
      const index = bundle["index.html"];
      if (!index) throw new Error("Missing index.html for SEO generation.");
      const template = String(index.source).replace(/\s*<(?:title|meta|link)\b[^>]*data-seo[^>]*(?:>[^<]*<\/title>|\/?>)/g, "");
      // The SPA fallback is deliberately private; only these four routes are indexable.
      this.emitFile({ type: "asset", fileName: "private.html", source: index.source });
      for (const path of Object.keys(publicPages)) {
        const html = template.replace("</head>", `${metadataHtml(pageMetadata(path, origin))}\n  </head>`);
        if (path === "/") index.source = html;
        else this.emitFile({ type: "asset", fileName: `${path.slice(1)}/index.html`, source: html });
      }
      if (origin) this.emitFile({ type: "asset", fileName: "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(publicPages).map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}\n</urlset>\n` });
      // Allow crawling so search engines can see private routes’ noindex directives.
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}` });
      }
    }
  };
}
