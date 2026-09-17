import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import { supabase } from "../../utils/supabase";
import { STATUSES, petLabel, receivedLabel, timingLabel, titleCase } from "./requestLabels";

const serviceLabels = { "30-MINUTE VISIT": "30-min cat visit", "60-MINUTE VISIT": "60-min cat visit", "DOG WALK": "30-min dog walk", "60-MINUTE DOG WALK": "60-min dog walk" };
export default function RequestDetail({ id, onClose, onSaved }) {
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const alive = useRef(true);
  const inFlight = useRef(false);
  useEffect(() => {
    alive.current = true;
    let active = true;
    async function load() {
      try {
        const { data, error } = await supabase.from("care_inquiry").select("*").eq("id", id).single();
        if (error) throw error;
        if (active) { setRequest(data); setStatus(data.status); }
      } catch { if (active) setError("Couldn’t open this request."); }
    }
    load();
    return () => { active = false; alive.current = false; };
  }, [id, attempt]);
  async function save() {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError("");
    try {
      const { data, error } = await supabase.from("care_inquiry").update({ status }).eq("id", id)
        .eq("status", request.status).select("id,status").single();
      if (error || !data) throw error || new Error("No update");
      if (alive.current) onSaved();
    } catch { if (alive.current) setError("Couldn’t save. Reopen the request and try again."); }
    finally { inFlight.current = false; if (alive.current) setBusy(false); }
  }
  const details = request ? [
    ["Received", receivedLabel(request.created_at)],
    ["Email", request.email], ["Phone", request.phone], ["Area", request.neighborhood_or_zip],
    ["Pets", `${petLabel(request.pet_type)} · ${request.pet_count}`], ["Pet names", request.pet_names],
    ["Care", request.services.map(value => serviceLabels[value] || value).join(", ")],
    ["When", timingLabel(request)], ["About their pets", request.pet_routine_notes]
  ] : [];
  return (
    <Dialog open fullWidth maxWidth="sm" onClose={busy ? undefined : onClose} aria-labelledby="request-detail-title">
      <DialogTitle id="request-detail-title" sx={{ fontFamily: "var(--font-display)" }}>{request?.full_name || "Care request"}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {!request && !error && <CircularProgress aria-label="Loading request" />}
        {!request && error && <Button onClick={() => { setError(""); setAttempt(value => value + 1); }}>Try again</Button>}
        {request && <>
          <Box component="dl" sx={{ m: 0, mb: 3 }}>
            {details.filter(([, value]) => value).map(([label, value]) => <Box key={label} sx={{ mb: 2 }}>
              <Typography component="dt" sx={{ fontWeight: 700 }}>{label}</Typography>
              <Typography component="dd" sx={{ m: 0, color: "text.secondary", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{value}</Typography>
            </Box>)}
          </Box>
          <TextField select label="Status" value={status} onChange={event => setStatus(event.target.value)} disabled={busy}>
            {STATUSES.map(value => <MenuItem key={value} value={value}>{titleCase(value)}</MenuItem>)}
          </TextField>
        </>}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={busy}>Close</Button>
        {request && <Button variant="plum-contained" onClick={save} disabled={busy || status === request.status}>{busy ? "Saving…" : "Save status"}</Button>}
      </DialogActions>
    </Dialog>
  );
}
