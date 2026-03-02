import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { plumButton } from "../../styles/buttonStyles";

export default function VetSelector({ user, onChange }) {
  const [existingVets, setExistingVets] = useState([]);
  const [useExistingVet, setUseExistingVet] = useState(true);
  const [selectedVetId, setSelectedVetId] = useState("");

  // New vet fields
  const [vetName, setVetName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadVets = async () => {
      const { data, error } = await supabase
        .from("veterinarian")
        .select("*")
        .eq("user_id", user.id)
        .order("vet_name");

      if (!error) {
        setExistingVets(data);
        if (data.length === 0) {
          setUseExistingVet(false);
        }
      }
    };

    loadVets();
  }, [user]);

  // Notify parent whenever selection changes
  useEffect(() => {
    if (useExistingVet) {
      onChange({ vetId: selectedVetId });
    } else {
      onChange({
        newVet: {
          vet_name: vetName,
          clinic_name: clinicName,
          street_line_1: street1,
          street_line_2: street2 || null,
          city,
          state,
          postal_code: postalCode,
          phone
        }
      });
    }
  }, [
    useExistingVet,
    selectedVetId,
    vetName,
    clinicName,
    street1,
    street2,
    city,
    state,
    postalCode,
    phone,
    onChange
  ]);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Typography variant="h6" sx={{ color: "#980061", marginBottom: "1rem" }}>
        Veterinarian
      </Typography>

      {existingVets.length > 0 && (
        <Box sx={{ marginBottom: "1rem" }}>
          <Box sx={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <Button
              variant={useExistingVet ? "contained" : "outlined"}
              onClick={() => setUseExistingVet(true)}
              sx={plumButton(useExistingVet)}
            >
              Use Existing Vet
            </Button>

            <Button
              variant={!useExistingVet ? "contained" : "outlined"}
              onClick={() => setUseExistingVet(false)}
              sx={plumButton(!useExistingVet)}
            >
              Add New Vet
            </Button>
          </Box>

          {useExistingVet && (
            <TextField
              select
              fullWidth
              label="Select A Veterinarian"
              value={selectedVetId}
              onChange={(e) => setSelectedVetId(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              {existingVets.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.vet_name} — {v.clinic_name}
                </option>
              ))}
            </TextField>
          )}
        </Box>
      )}

      {!useExistingVet && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField label="Vet Name" value={vetName} onChange={(e) => setVetName(e.target.value)} required />
          <TextField label="Clinic Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
          <TextField label="Street Line 1" value={street1} onChange={(e) => setStreet1(e.target.value)} required />
          <TextField label="Street Line 2" value={street2} onChange={(e) => setStreet2(e.target.value)} />
          <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <TextField label="State" value={state} onChange={(e) => setState(e.target.value)} required />
          <TextField label="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </Box>
      )}
    </Box>
  );
}