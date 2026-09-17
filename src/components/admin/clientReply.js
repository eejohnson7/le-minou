export function clientReplyUrl(email) {
  const address = email?.trim();
  if (!address || !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(address)) return "";
  return `mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent("Your Le Minou care request")}`;
}
