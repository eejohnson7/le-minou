import { useRef, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { BOOKABLE_SERVICES } from "../../data/services";
import { useCreateCareInquiry } from "../../hooks/useCreateCareInquiry";
import {
  CARE_INQUIRY_LIMITS,
  toCareInquiryRecord,
  validateCareInquiry
} from "../../utils/careInquiryValidation";
import FormSection from "./FormSection";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  neighborhoodOrZip: "",
  petType: "",
  petCount: "",
  petNames: "",
  services: [],
  timingType: "",
  startDate: "",
  endDate: "",
  recurringSchedule: "",
  petRoutineNotes: ""
};

const PET_TYPES = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "both", label: "Both" }
];

const TIMING_TYPES = [
  { value: "specific_dates", label: "Specific dates" },
  { value: "recurring", label: "Ongoing / recurring care" },
  { value: "not_sure", label: "Not sure yet" }
];

const displayServiceLabel = (label) => {
  const normalized = label.toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const formLabelSx = {
  color: "var(--ink)",
  fontSize: "0.96rem",
  fontWeight: 700,
  lineHeight: 1.5,
  mb: 1.25,
  "&.Mui-focused": { color: "var(--ink)" },
  "&.Mui-error": { color: "#a52345" }
};

export default function RequestCareForm({ onSuccess }) {
  const formRef = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const { createCareInquiry, loading, error: submissionError, clearError } = useCreateCareInquiry();

  const clearFieldErrors = (...fields) => {
    setErrors((current) => {
      const next = { ...current };
      fields.forEach((field) => delete next[field]);
      return next;
    });
  };

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    clearFieldErrors(field);
    clearError();
  };

  const updatePetType = (event) => {
    setValues((current) => ({ ...current, petType: event.target.value }));
    clearFieldErrors("petType");
    clearError();
  };

  const updateTimingType = (event) => {
    setValues((current) => ({ ...current, timingType: event.target.value }));
    clearFieldErrors("timingType", "startDate", "endDate", "recurringSchedule");
    clearError();
  };

  const toggleService = (serviceLabel) => {
    setValues((current) => ({
      ...current,
      services: current.services.includes(serviceLabel)
        ? current.services.filter((label) => label !== serviceLabel)
        : [...current.services, serviceLabel]
    }));
    clearFieldErrors("services");
    clearError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateCareInquiry(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      window.requestAnimationFrame(() => {
        const invalidField = formRef.current?.querySelector('[aria-invalid="true"]');
        const focusTarget = invalidField?.matches("input, textarea, select, button")
          ? invalidField
          : invalidField?.querySelector("input, textarea, select, button");
        focusTarget?.focus();
      });
      return;
    }

    const submitted = await createCareInquiry(toCareInquiryRecord(values));
    if (submitted) onSuccess(values.fullName.trim());
  };

  return (
    <Box
      ref={formRef}
      component="form"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      aria-label="Care inquiry"
      aria-busy={loading}
      sx={{ display: "grid", gap: { xs: 5.5, sm: 7 } }}
    >
      <FormSection number="01" id="contact-section-title" title="How can Erin reach you?">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2.25 }}>
          <TextField
            required
            label="Full name"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={updateField("fullName")}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
            slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.fullName } }}
            sx={{ gridColumn: { sm: "1 / -1" } }}
          />
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={updateField("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
            slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.email } }}
          />
          <TextField
            label="Phone (optional)"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={updateField("phone")}
            slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.phone } }}
          />
          <TextField
            required
            label="Neighborhood or ZIP code"
            name="neighborhoodOrZip"
            value={values.neighborhoodOrZip}
            onChange={updateField("neighborhoodOrZip")}
            error={Boolean(errors.neighborhoodOrZip)}
            helperText={errors.neighborhoodOrZip || "This helps Erin confirm whether the request is within the service area."}
            slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.neighborhoodOrZip } }}
            sx={{ gridColumn: { sm: "1 / -1" } }}
          />
        </Box>
      </FormSection>

      <FormSection number="02" id="pets-section-title" title="Who needs care?" description="A quick household overview is enough—full pet profiles can come later.">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) minmax(150px, 0.42fr)" }, gap: 2.25 }}>
          <FormControl required error={Boolean(errors.petType)} component="fieldset">
            <FormLabel component="legend" sx={formLabelSx}>What kind of pets?</FormLabel>
            <RadioGroup
              row
              name="petType"
              value={values.petType}
              onChange={updatePetType}
              aria-invalid={Boolean(errors.petType)}
              aria-describedby={errors.petType ? "pet-type-error" : undefined}
              sx={{ gap: { xs: 0.5, sm: 1.5 } }}
            >
              {PET_TYPES.map((petType) => (
                <FormControlLabel key={petType.value} value={petType.value} control={<Radio />} label={petType.label} />
              ))}
            </RadioGroup>
            {errors.petType && <FormHelperText id="pet-type-error">{errors.petType}</FormHelperText>}
          </FormControl>

          <TextField
            required
            label="How many pets?"
            name="petCount"
            type="number"
            value={values.petCount}
            onChange={updateField("petCount")}
            error={Boolean(errors.petCount)}
            helperText={errors.petCount}
            slotProps={{ htmlInput: { min: 1, max: CARE_INQUIRY_LIMITS.petCount, step: 1, inputMode: "numeric" } }}
          />

          <TextField
            label="Pet names (optional)"
            name="petNames"
            value={values.petNames}
            onChange={updateField("petNames")}
            placeholder="Miso and Olive"
            slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.petNames } }}
            sx={{ gridColumn: { sm: "1 / -1" } }}
          />
        </Box>
      </FormSection>

      <FormSection number="03" id="care-section-title" title="What care do you have in mind?">
        <Box sx={{ display: "grid", gap: 4 }}>
          <FormControl required error={Boolean(errors.services)} component="fieldset">
            <FormLabel component="legend" sx={formLabelSx}>Service</FormLabel>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.78rem", lineHeight: 1.55, mt: -0.75, mb: 1.25 }}>
              Choose all that apply.
            </Typography>
            <FormGroup
              aria-invalid={Boolean(errors.services)}
              aria-describedby={errors.services ? "services-error" : undefined}
              sx={{ borderBottom: "1px solid var(--plum-line-soft)" }}
            >
              {BOOKABLE_SERVICES.map((service) => (
                <FormControlLabel
                  key={service.label}
                  control={
                    <Checkbox
                      checked={values.services.includes(service.label)}
                      onChange={() => toggleService(service.label)}
                      name="services"
                      value={service.label}
                    />
                  }
                  label={displayServiceLabel(service.label)}
                  sx={{
                    m: 0,
                    py: 1.15,
                    borderTop: "1px solid var(--plum-line-soft)",
                    "& .MuiFormControlLabel-label": { color: "var(--ink)", fontWeight: 600 }
                  }}
                />
              ))}
            </FormGroup>
            {errors.services && <FormHelperText id="services-error">{errors.services}</FormHelperText>}
          </FormControl>

          <FormControl required error={Boolean(errors.timingType)} component="fieldset">
            <FormLabel component="legend" sx={formLabelSx}>When do you need care?</FormLabel>
            <RadioGroup
              name="timingType"
              value={values.timingType}
              onChange={updateTimingType}
              aria-invalid={Boolean(errors.timingType)}
              aria-describedby={errors.timingType ? "timing-type-error" : undefined}
              sx={{ gap: 0.25 }}
            >
              {TIMING_TYPES.map((timingType) => (
                <FormControlLabel key={timingType.value} value={timingType.value} control={<Radio />} label={timingType.label} />
              ))}
            </RadioGroup>
            {errors.timingType && <FormHelperText id="timing-type-error">{errors.timingType}</FormHelperText>}
          </FormControl>

          {values.timingType === "specific_dates" && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2.25 }}>
              <TextField
                required
                label="Start date"
                name="startDate"
                type="date"
                value={values.startDate}
                onChange={updateField("startDate")}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                required
                label="End date"
                name="endDate"
                type="date"
                value={values.endDate}
                onChange={updateField("endDate")}
                error={Boolean(errors.endDate)}
                helperText={errors.endDate}
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: values.startDate || undefined } }}
              />
            </Box>
          )}

          {values.timingType === "recurring" && (
            <TextField
              required
              label="What schedule do you have in mind?"
              name="recurringSchedule"
              value={values.recurringSchedule}
              onChange={updateField("recurringSchedule")}
              error={Boolean(errors.recurringSchedule)}
              helperText={errors.recurringSchedule || "For example: Weekdays around lunchtime."}
              slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.recurringSchedule } }}
            />
          )}
        </Box>
      </FormSection>

      <FormSection number="04" id="routine-section-title" title="Tell me about your pets and their routines">
        <TextField
          required
          multiline
          minRows={5}
          label="Pets and routines"
          name="petRoutineNotes"
          value={values.petRoutineNotes}
          onChange={updateField("petRoutineNotes")}
          error={Boolean(errors.petRoutineNotes)}
          helperText={errors.petRoutineNotes || "Share their usual routine, temperament, what they enjoy, and anything important Erin should know."}
          slotProps={{ htmlInput: { maxLength: CARE_INQUIRY_LIMITS.petRoutineNotes } }}
        />
      </FormSection>

      <Box sx={{ borderTop: "1px solid var(--plum-line)", pt: { xs: 3.5, sm: 4.5 } }}>
        {submissionError && (
          <Alert severity="error" role="alert" sx={{ mb: 2.5, bgcolor: "rgba(255, 236, 242, 0.72)", color: "var(--ink)" }}>
            {submissionError}
          </Alert>
        )}
        <Button
          type="submit"
          variant="plum-contained"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: 190 } }}
        >
          {loading ? "Sending request…" : "Send care request"}
        </Button>
        <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.8rem", lineHeight: 1.65, mt: 1.75, maxWidth: 560 }}>
          This sends an inquiry to Erin. It does not create an account, charge you, or confirm a booking.
        </Typography>
      </Box>
    </Box>
  );
}
