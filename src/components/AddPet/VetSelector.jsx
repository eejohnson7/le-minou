import { useState, useEffect } from "react";
import { useVets } from "../../hooks/useVets";
import { useVetForm } from "../../hooks/useVetForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, TextField, MenuItem } from "@mui/material";

export default function VetSelector({ user, onChange }) {
  const userId = user.id;

  const { vets: existingVets, loading: loadingVets } = useVets(userId);

  const [useExistingVet, setUseExistingVet] = useState(true);
  const [selectedVetId, setSelectedVetId] = useState("");

  const { fields, setters, newVet, reset } = useVetForm();

  useEffect(() => {
    if (existingVets.length === 0 && useExistingVet !== false) {
      setUseExistingVet(false);
    }
  }, [existingVets, useExistingVet]);

  useEffect(() => {
    if (useExistingVet) {
      onChange({ vetId: selectedVetId });
    } else {
      onChange({ newVet });
    }
  }, [
    useExistingVet,
    selectedVetId,
    newVet,
    onChange
  ]);

  if (!userId) {
    return (
      <Typography sx={{ textAlign: "left", mt: "4rem", color: "#980061", paddingBottom: "1rem", fontSize: "1.25rem" }}>
        Loading account...
      </Typography>
    );
  }

  if (loadingVets) {
    return (
      <Typography sx={{ textAlign: "left", mt: "4rem", color: "#980061", paddingBottom: "1rem", fontSize: "1.25rem" }}>
        Loading veterinarian info ...
      </Typography>
    );
  }

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Typography sx={{fontSize: "1.75rem"}}>
        Veterinarian
      </Typography>

      {existingVets.length > 0 && (
        <Box sx={{ marginBottom: "1rem" }}>
          <Box sx={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <Button
              variant={useExistingVet ? "plum-contained" : "plum-outlined"}
              onClick={() => {
                setUseExistingVet(true);
                reset();
              }}
            >
              Use Existing Vet
            </Button>

            <Button
              variant={!useExistingVet ? "plum-contained" : "plum-outlined"}
              onClick={() => {
                setUseExistingVet(false);
                setSelectedVetId("");
              }}
            >
              Add New Vet
            </Button>
          </Box>

          {useExistingVet && (
            <TextField
              label="Select A Veterinarian"
              value={selectedVetId}
              onChange={(e) => setSelectedVetId(e.target.value)}
              select
            >
              <MenuItem value=""></MenuItem>

              {existingVets.map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.vet_name} — {v.clinic_name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
      )}

      {!useExistingVet && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField label="Vet Name" value={fields.vetName} onChange={(e) => setters.setVetName(e.target.value)} />
          <TextField label="Clinic Name" value={fields.clinicName} onChange={(e) => setters.setClinicName(e.target.value)} />
          <TextField label="Street Line 1" value={fields.street1} onChange={(e) => setters.setStreet1(e.target.value)} />
          <TextField label="Street Line 2" value={fields.street2} onChange={(e) => setters.setStreet2(e.target.value)} />
          <TextField label="City" value={fields.city} onChange={(e) => setters.setCity(e.target.value)} />
          <TextField label="State" value={fields.state} onChange={(e) => setters.setState(e.target.value)} />
          <TextField label="Postal Code" value={fields.postalCode} onChange={(e) => setters.setPostalCode(e.target.value)} />
          <TextField label="Phone" value={fields.phone} onChange={(e) => setters.setPhone(e.target.value)} />
        </Box>
      )}
    </Box>
  );
}