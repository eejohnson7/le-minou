export const DEFAULT_AUTH_DESTINATION = "/profile";
export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROTECTED_PATH_PATTERNS = [
  /^\/profile\/?$/,
  /^\/add-pet\/?$/,
  /^\/pet\/[^/]+\/?$/,
  /^\/book(?:\/.*)?$/
];

export function validateEmail(value) {
  const email = value.trim();

  if (!email) return "Enter your email address.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  return "";
}

export function getSafeAuthReturnPath(from) {
  const pathname = from?.pathname;

  if (
    typeof pathname !== "string" ||
    !pathname.startsWith("/") ||
    pathname.startsWith("//") ||
    !PROTECTED_PATH_PATTERNS.some((pattern) => pattern.test(pathname))
  ) {
    return DEFAULT_AUTH_DESTINATION;
  }

  const search = typeof from.search === "string" && from.search.startsWith("?")
    ? from.search
    : "";
  const hash = typeof from.hash === "string" && from.hash.startsWith("#")
    ? from.hash
    : "";

  return `${pathname}${search}${hash}`;
}
