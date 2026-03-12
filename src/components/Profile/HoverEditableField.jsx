import { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import HoverPencil from "../HoverPencil";

export default function HoverEditableField({
  value,
  onSave,
  placeholder = "—",
  renderDisplay,
  type = "text",
  fields,              // optional array for multi-field mode
  textAlign = "center" // "left" or "center"
}) {
  const [editing, setEditing] = useState(false);

  // Single-field draft
  const [draft, setDraft] = useState(value ?? "");

  // Multi-field drafts
  const [drafts, setDrafts] = useState(
    fields ? fields.map((f) => f.value ?? "") : []
  );

  const containerRef = useRef(null);

  // Keep drafts synced when not editing
  useEffect(() => {
    if (!editing) {
      setDraft(value ?? "");
      if (fields) {
        setDrafts(fields.map((f) => f.value ?? ""));
      }
    }
  }, [value, fields, editing]);

  // Click outside to commit
  useEffect(() => {
    if (!editing) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        commit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing, drafts, draft]);

  const commit = () => {
    if (fields) {
      fields.forEach((f, i) => f.onSave(drafts[i]));
    } else {
      onSave(draft);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value ?? "");
    if (fields) {
      setDrafts(fields.map((f) => f.value ?? ""));
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        "&:hover .edit-icon": { opacity: 1 }
      }}
    >
      {editing ? (
        fields ? (
          // MULTI-FIELD MODE
          <Box sx={{ display: "flex", gap: "0.5rem", width: "100%", justifyContent: "center" }}>
            {fields.map((f, i) => (
              <TextField
                key={i}
                label={f.label}
                value={drafts[i]}
                onChange={(e) => {
                  const next = [...drafts];
                  next[i] = e.target.value;
                  setDrafts(next);
                }}
                onKeyDown={handleKeyDown}
                autoFocus={i === 0}
                sx={{
                  width: f.width || "100px",
                  "& .MuiInputBase-input": { textAlign }
                }}
              />
            ))}
          </Box>
        ) : (
          // SINGLE-FIELD MODE
          <TextField
            fullWidth
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            sx={{
              "& .MuiInputBase-input": { textAlign }
            }}
          />
        )
      ) : (
        // DISPLAY MODE
        <Box
          sx={{
            width: "100%",
            cursor: "pointer",
            minHeight: "2.25rem",
            position: "relative"
          }}
          onClick={() => setEditing(true)}
        >
          <Box
            sx={{
              display: "inline-block",
              position: "relative",
              width: "auto",        // ← key fix
              pr: "0.35rem"         // ← subtle breathing room
            }}
          >
            {renderDisplay ? (
              fields ? renderDisplay(drafts) : renderDisplay(value)
            ) : (
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  textAlign,
                  display: "inline-block",
                  whiteSpace: "pre-wrap"
                }}
              >
                {fields ? renderDisplay(drafts) : value || placeholder}
              </Typography>
            )}

            {!editing && (
              <Box
                className="edit-icon"
                sx={{
                  position: "absolute",
                  bottom: "-0.25rem",
                  right: "-0.35rem",   // ← perfect inline pencil alignment
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <HoverPencil onClick={() => setEditing(true)} />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}