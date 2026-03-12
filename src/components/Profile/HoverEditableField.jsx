import { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import HoverPencil from "../HoverPencil";

export default function HoverEditableField({
  value,
  onSave,
  placeholder = "—",
  renderDisplay,
  renderEditor,        // single-field custom editor
  type = "text",
  fields,               // multi-field mode
  textAlign = "center"
}) {
  const [editing, setEditing] = useState(false);

  // Single-field draft
  const [draft, setDraft] = useState(value ?? "");

  // Multi-field drafts
  const [drafts, setDrafts] = useState(
    fields ? fields.map((f) => f.value ?? "") : []
  );

  const containerRef = useRef(null);

  // Sync drafts when not editing
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
          // 🌸 MULTI-FIELD MODE (supports per-field custom editors)
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              width: "100%",
              justifyContent: "center"
            }}
          >
            {fields.map((f, i) => {
              const value = drafts[i];
              const setValue = (v) => {
                const next = [...drafts];
                next[i] = v;
                setDrafts(next);
              };

              return (
                <Box key={i} sx={{ width: f.width || "100px" }}>
                  {f.renderEditor ? (
                    f.renderEditor({
                      value,
                      setValue,
                      commit,
                      cancel
                    })
                  ) : (
                    <TextField
                      label={f.label}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus={i === 0}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": { textAlign }
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        ) : (
          // 🌸 SINGLE-FIELD MODE (supports custom editor)
          renderEditor ? (
            renderEditor({
              value: draft,
              setValue: setDraft,
              commit,
              cancel
            })
          ) : (
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
        )
      ) : (
        // 🌸 DISPLAY MODE
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
              width: "auto",
              pr: "0.35rem"
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
                  right: "-0.35rem",
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