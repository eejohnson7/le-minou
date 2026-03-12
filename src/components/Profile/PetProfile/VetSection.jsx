import { Box, Typography } from "@mui/material";
import HoverEditableField from "../HoverEditableField";

export default function VetSection({ pet, updateVet }) {
  const vet = pet?.vet ?? {};

  const placeholder = (text) => (
    <Typography sx={{ fontSize: "1.25rem", opacity: 0.4 }}>
      {text}
    </Typography>
  );

  const display = (text) => (
    <Typography sx={{ fontSize: "1.25rem", opacity: 0.8 }}>
      {text}
    </Typography>
  );

  return (
    <Box
      sx={{
        minWidth: "260px",
        border: "2px solid #980061",
        borderRadius: "12px",
        padding: "1.25rem",
        backgroundColor: "#FFDBE9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        color: "#980061",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.5rem",
      }}
    >
      <Typography sx={{ fontSize: "2.75rem" }}>
        Veterinarian
      </Typography>

      {/* Vet Name */}
      <HoverEditableField
        value={vet.vet_name}
        placeholder="Vet name"
        onSave={(val) => updateVet("vet_name", val)}
        renderDisplay={(val) => (val ? display(val) : placeholder("Vet name"))}
      />

      {/* Clinic Name */}
      <HoverEditableField
        value={vet.clinic_name}
        placeholder="Clinic name"
        onSave={(val) => updateVet("clinic_name", val)}
        renderDisplay={(val) =>
          val ? display(val) : placeholder("Clinic name")
        }
      />

      {/* Phone */}
      <HoverEditableField
        value={vet.phone}
        placeholder="Phone"
        onSave={(val) => updateVet("phone", val)}
        renderDisplay={(val) => (val ? display(val) : placeholder("Phone"))}
      />

      {/* ADDRESS — matches ProfileSidebar */}
      {/* Street Line 1 */}
      <HoverEditableField
        value={vet.street_line_1}
        placeholder="Street address"
        onSave={(val) => updateVet("street_line_1", val)}
        renderDisplay={(val) =>
          val ? display(val) : placeholder("Street address")
        }
      />

      {/* Street Line 2 */}
      <HoverEditableField
        value={vet.street_line_2}
        placeholder="Apt, suite, etc."
        onSave={(val) => updateVet("street_line_2", val)}
        renderDisplay={(val) =>
          val ? display(val) : placeholder("Apt, suite, etc.")
        }
      />

      {/* City, State ZIP — multi-field like ProfileSidebar */}
      <HoverEditableField
        fields={[
          {
            label: "City",
            value: vet.city,
            onSave: (v) => updateVet("city", v),
            width: "120px",
          },
          {
            label: "State",
            value: vet.state,
            onSave: (v) => updateVet("state", v),
            width: "80px",
          },
          {
            label: "ZIP",
            value: vet.postal_code,
            onSave: (v) => updateVet("postal_code", v),
            width: "90px",
          },
        ]}
        renderDisplay={([city, state, zip]) => {
          const hasAny = city || state || zip;

          if (!hasAny) {
            return placeholder("City, State ZIP");
          }

          return display(
            `${city ?? ""}${city && state ? ", " : ""}${state ?? ""}${
              zip ? ` ${zip}` : ""
            }`
          );
        }}
      />
    </Box>
  );
}