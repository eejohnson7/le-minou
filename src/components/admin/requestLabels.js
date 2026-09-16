export const STATUSES = ["new", "contacted", "confirmed", "declined"];
export const titleCase = value => value.charAt(0).toUpperCase() + value.slice(1);
export const petLabel = value => ({ cat: "Cat", dog: "Dog", both: "Cat & dog" })[value] || value;
export function dateLabel(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
export function timingLabel(request) {
  if (request.timing_type === "recurring") return request.recurring_schedule;
  if (request.timing_type === "specific_dates") {
    return request.start_date === request.end_date ? dateLabel(request.start_date)
      : `${dateLabel(request.start_date)} – ${dateLabel(request.end_date)}`;
  }
  return "Dates undecided";
}
