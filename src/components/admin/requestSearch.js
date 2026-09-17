// Quote the value so punctuation cannot become PostgREST filter syntax.
export function requestSearchFilter(value) {
  const term = value.trim();
  if (!term) return "";
  const pattern = `%${term.replace(/[\\%_]/g, "\\$&")}%`;
  const quoted = JSON.stringify(pattern);
  return `full_name.ilike.${quoted},email.ilike.${quoted},pet_names.ilike.${quoted}`;
}
