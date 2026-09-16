import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metadataHtml, pageMetadata, siteOrigin } from "./metadata";

const origin = siteOrigin(import.meta.env.VITE_SITE_URL);

function updateHead(pathname) {
  document.head.querySelectorAll("[data-seo]").forEach((element) => element.remove());
  document.head.insertAdjacentHTML("beforeend", metadataHtml(pageMetadata(pathname, origin)));
}

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    updateHead(pathname);
    return () => updateHead("/private");
  }, [pathname]);
  return null;
}
