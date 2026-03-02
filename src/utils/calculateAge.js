export function calculateAge(birthdate) {
  if (!birthdate) return null;

  const birth = new Date(birthdate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (years < 0) return null;
  if (years === 0 && months === 0) return "<1 month";
  if (years === 0) return `${months} month${months > 1 ? "s" : ""}`;
  if (months === 0) return `${years} year${years > 1 ? "s" : ""}`;

  return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
}