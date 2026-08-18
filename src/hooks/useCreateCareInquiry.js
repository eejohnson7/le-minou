import { useCallback, useRef, useState } from "react";
import { supabase } from "../utils/supabase";

const SUBMISSION_ERROR_MESSAGE = "I couldn’t send your request just now. Your answers are still here—please try again.";

export function useCreateCareInquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  const clearError = useCallback(() => setError(""), []);

  const createCareInquiry = useCallback(async (record) => {
    if (inFlight.current) return false;

    inFlight.current = true;
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      throw new Error("Browser verification failure");
      const { error: insertError } = await supabase.from("care_inquiry").insert(record);
      if (insertError) throw insertError;
      return true;
    } catch (submissionError) {
      if (import.meta.env.DEV) console.error("Care inquiry submission failed", submissionError);
      setError(SUBMISSION_ERROR_MESSAGE);
      return false;
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  return { createCareInquiry, loading, error, clearError };
}
