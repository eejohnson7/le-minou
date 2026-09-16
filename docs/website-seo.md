# Public website SEO

The build emits separate HTML heads for Home, Services, About, and Request Care, so link preview crawlers receive metadata without running JavaScript. React updates that metadata during public page navigation. Existing visible content is unchanged.

The existing cat logo is served at `/social-preview.png` and as a 64px `/favicon.png`.

## Configure the domain

Once the public domain is configured, set `VITE_SITE_URL` to its HTTPS origin in the deployment environment, then rebuild and deploy. Use only the origin, with no path, query, or hash. This adds canonical URLs, absolute Open Graph and Twitter image URLs, and a sitemap listing only the four public pages. The generated robots.txt links to the sitemap.

Until the domain is configured, the build deliberately omits those URLs and the sitemap. Social image previews will need that configuration to work fully.

`vercel.json` serves the generated public HTML files and uses `private.html` as the SPA fallback. Other hosting providers must use equivalent routing, preserve static assets, and serve `private.html` for private or unknown paths. Avoid falling back to the public Home HTML for private paths.

The fallback HTML has `noindex, nofollow`, including for `/admin`, account, profile, and booking routes. robots.txt permits crawling so search engines can read these directives. This controls indexing; access protection remains the responsibility of authentication.
