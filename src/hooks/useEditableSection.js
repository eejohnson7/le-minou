// hooks/useEditableSection.js
import { useState } from "react";
import { supabase } from "../utils/supabase";

export function useEditableSection(initial, table, idField, idValue) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initial);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => setForm(initial);

  const save = async () => {
    const { error } = await supabase
      .from(table)
      .update(form)
      .eq(idField, idValue);

    if (error) throw error;
    setEditing(false);
  };

  return {
    editing,
    setEditing,
    form,
    handleChange,
    updateField,
    reset,
    save
  };
}