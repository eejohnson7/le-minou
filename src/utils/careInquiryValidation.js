const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CARE_INQUIRY_LIMITS = {
  fullName: 120,
  email: 254,
  phone: 40,
  neighborhoodOrZip: 120,
  petCount: 20,
  petNames: 250,
  recurringSchedule: 500,
  petRoutineNotes: 4000
};

export function validateCareInquiry(values) {
  const errors = {};
  const petCount = Number(values.petCount);

  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.neighborhoodOrZip.trim()) errors.neighborhoodOrZip = "Please share your neighborhood or ZIP code.";
  if (!values.petType) errors.petType = "Please choose the kind of pets in your home.";

  if (!values.petCount) {
    errors.petCount = "Please enter the number of pets.";
  } else if (!Number.isInteger(petCount) || petCount < 1 || petCount > CARE_INQUIRY_LIMITS.petCount) {
    errors.petCount = `Please enter a whole number from 1 to ${CARE_INQUIRY_LIMITS.petCount}.`;
  }

  if (values.services.length === 0) errors.services = "Please choose at least one service.";
  if (!values.timingType) errors.timingType = "Please choose the timing that fits best.";

  if (values.timingType === "specific_dates") {
    if (!values.startDate) errors.startDate = "Please choose a start date.";
    if (!values.endDate) errors.endDate = "Please choose an end date.";
    if (values.startDate && values.endDate && values.endDate < values.startDate) {
      errors.endDate = "End date must be on or after the start date.";
    }
  }

  if (values.timingType === "recurring" && !values.recurringSchedule.trim()) {
    errors.recurringSchedule = "Please describe the schedule you have in mind.";
  }

  if (!values.petRoutineNotes.trim()) {
    errors.petRoutineNotes = "Please tell Erin a little about your pets and their routine.";
  }

  return errors;
}

export function toCareInquiryRecord(values) {
  return {
    full_name: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim() || null,
    neighborhood_or_zip: values.neighborhoodOrZip.trim(),
    pet_type: values.petType,
    pet_count: Number(values.petCount),
    pet_names: values.petNames.trim() || null,
    services: values.services,
    timing_type: values.timingType,
    start_date: values.timingType === "specific_dates" ? values.startDate : null,
    end_date: values.timingType === "specific_dates" ? values.endDate : null,
    recurring_schedule: values.timingType === "recurring" ? values.recurringSchedule.trim() : null,
    pet_routine_notes: values.petRoutineNotes.trim()
  };
}
