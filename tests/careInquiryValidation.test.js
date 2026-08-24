import assert from "node:assert/strict";
import test from "node:test";
import {
  toCareInquiryRecord,
  validateCareInquiry
} from "../src/utils/careInquiryValidation.js";

const validInquiry = {
  fullName: "  Erin Johnson  ",
  email: "  ERIN@example.com ",
  phone: "",
  neighborhoodOrZip: "Rogers Park",
  petType: "cat",
  petCount: "2",
  petNames: "Miso and Olive",
  services: ["30-MINUTE VISIT"],
  timingType: "specific_dates",
  startDate: "2026-09-10",
  endDate: "2026-09-12",
  recurringSchedule: "",
  petRoutineNotes: "Breakfast at eight and dinner at six."
};

test("accepts a complete care inquiry", () => {
  assert.deepEqual(validateCareInquiry(validInquiry), {});
});

test("reports required fields and invalid pet counts", () => {
  const errors = validateCareInquiry({
    ...validInquiry,
    fullName: "",
    email: "not-an-email",
    neighborhoodOrZip: "",
    petType: "",
    petCount: "2.5",
    services: [],
    timingType: "",
    petRoutineNotes: ""
  });

  assert.deepEqual(Object.keys(errors).sort(), [
    "email",
    "fullName",
    "neighborhoodOrZip",
    "petCount",
    "petRoutineNotes",
    "petType",
    "services",
    "timingType"
  ]);
});

test("rejects reversed dates and requires recurring details", () => {
  const dateErrors = validateCareInquiry({
    ...validInquiry,
    startDate: "2026-09-12",
    endDate: "2026-09-10"
  });
  assert.equal(dateErrors.endDate, "End date must be on or after the start date.");

  const recurringErrors = validateCareInquiry({
    ...validInquiry,
    timingType: "recurring",
    startDate: "",
    endDate: "",
    recurringSchedule: ""
  });
  assert.equal(recurringErrors.recurringSchedule, "Please describe the schedule you have in mind.");
});

test("normalizes inquiry data before submission", () => {
  assert.deepEqual(toCareInquiryRecord(validInquiry), {
    full_name: "Erin Johnson",
    email: "erin@example.com",
    phone: null,
    neighborhood_or_zip: "Rogers Park",
    pet_type: "cat",
    pet_count: 2,
    pet_names: "Miso and Olive",
    services: ["30-MINUTE VISIT"],
    timing_type: "specific_dates",
    start_date: "2026-09-10",
    end_date: "2026-09-12",
    recurring_schedule: null,
    pet_routine_notes: "Breakfast at eight and dinner at six."
  });
});
