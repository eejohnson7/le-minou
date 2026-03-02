import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function usePrivateImage({ bucket, filePath }) {
  const [signedUrl, setSignedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate signed URL whenever filePath changes
  useEffect(() => {
    const loadUrl = async () => {
      if (!filePath) {
        setSignedUrl(null);
        return;
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, 60 * 60); // 1 hour

      if (!error) setSignedUrl(data.signedUrl);
    };

    loadUrl();
  }, [bucket, filePath]);

  // Upload a new file and return the new file path
  const uploadFile = async (file, targetPath) => {
    setLoading(true);
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(targetPath, file, { upsert: true });

      if (error) throw error;

      return targetPath;
    } finally {
      setLoading(false);
    }
  };

  return {
    signedUrl,
    uploadFile,
    loading
  };
}