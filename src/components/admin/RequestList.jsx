import { useEffect, useState } from "react";
import { Alert, Box, Button, ButtonBase, Chip, CircularProgress, Typography } from "@mui/material";
import { supabase } from "../../utils/supabase";
import { STATUSES, petLabel, receivedLabel, timingLabel, titleCase } from "./requestLabels";
import RequestDetail from "./RequestDetail";

const PAGE_SIZE = 25;
export default function RequestList() {
  const [filter, setFilter] = useState("new");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState({ loading: true, rows: [], more: false, error: "" });
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data, error } = await supabase.from("care_inquiry")
          .select("id,full_name,pet_type,timing_type,start_date,end_date,recurring_schedule,status,created_at")
          .eq("status", filter).order("created_at", { ascending: false }).order("id", { ascending: false })
          .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
        if (error) throw error;
        if (active) setResult({ loading: false, rows: data.slice(0, PAGE_SIZE), more: data.length > PAGE_SIZE, error: "" });
      } catch {
        if (active) setResult({ loading: false, rows: [], more: false, error: "Couldn’t load requests." });
      }
    }
    load();
    return () => { active = false; };
  }, [filter, page, refresh]);
  function reload() { setResult({ loading: true, rows: [], more: false, error: "" }); setRefresh(value => value + 1); }
  function changePage(next) { setResult({ loading: true, rows: [], more: false, error: "" }); setPage(next); }
  return (
    <>
      <Typography component="h1" variant="h3" sx={{ mb: 3 }}>Care requests</Typography>
      <Box role="group" aria-label="Filter requests" sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {STATUSES.map(value => <Button key={value} aria-pressed={filter === value}
          variant={filter === value ? "plum-contained" : "plum-outlined"}
          onClick={() => { if (value === filter) return; setNotice(""); setResult({ loading: true, rows: [], more: false, error: "" }); setPage(0); setFilter(value); }}>
          {titleCase(value)}
        </Button>)}
      </Box>
      {notice && <Alert severity="success" sx={{ mb: 2 }}>{notice}</Alert>}
      {result.loading ? <Box role="status"><CircularProgress size={24} sx={{ mr: 2 }} />Loading requests…</Box>
        : result.error ? <Alert severity="error" action={<Button onClick={reload}>Try again</Button>}>{result.error}</Alert>
        : !result.rows.length ? <Typography color="text.secondary">No {filter} requests{page ? " on this page" : " yet"}.</Typography>
        : <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, borderTop: "1px solid var(--plum-line)" }}>
          {result.rows.map(request => <Box component="li" key={request.id} sx={{ borderBottom: "1px solid var(--plum-line)" }}>
            <ButtonBase onClick={() => setSelected(request.id)} aria-label={`Open request from ${request.full_name}`}
              sx={{ width: "100%", textAlign: "left", p: { xs: 2, sm: 3 }, display: "grid", gap: 1,
                gridTemplateColumns: { xs: "1fr", sm: "1fr auto" }, bgcolor: "var(--paper)",
                "&:hover": { bgcolor: "var(--blush)" }, "&.Mui-focusVisible": { outline: "3px solid var(--plum)", outlineOffset: -3 } }}>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>{request.full_name}</Typography>
                <Typography color="text.secondary">{petLabel(request.pet_type)}</Typography>
                <Typography color="text.secondary" sx={{ overflowWrap: "anywhere" }}>{timingLabel(request)}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: "0.85rem", mt: 0.75 }}>
                  Received {receivedLabel(request.created_at)}
                </Typography>
              </Box>
              <Chip label={titleCase(request.status)} size="small" sx={{ justifySelf: "start", bgcolor: "var(--soft-pink)" }} />
            </ButtonBase>
          </Box>)}
        </Box>}
      <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
        {page > 0 && <Button disabled={result.loading} onClick={() => changePage(page - 1)}>Previous</Button>}
        {result.more && <Button disabled={result.loading} onClick={() => changePage(page + 1)}>Next</Button>}
      </Box>
      {selected && <RequestDetail key={selected} id={selected} onClose={() => setSelected(null)} onSaved={() => {
        setSelected(null); setNotice("Status saved."); setPage(0); reload();
      }} />}
    </>
  );
}
