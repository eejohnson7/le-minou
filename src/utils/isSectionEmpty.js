export function isSectionEmpty(pet, keys) {
  return keys.every((key) => !pet[key] || pet[key].trim() === "");
}