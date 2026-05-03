import supabase from '@/lib/supabase';

export const uploadToSupabase = async (file, bucket) => {
  const filePath = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(filePath, file);
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
};