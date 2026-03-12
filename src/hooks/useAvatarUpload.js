import { supabase } from "../utils/supabase";

export function useAvatarUpload() {
  const uploadAvatar = async (file) => {
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from("user")
      .update({ photo_path: filePath })
      .eq("id", user.id);

    if (updateError) throw updateError;

    return filePath;
  };

  return uploadAvatar;
}