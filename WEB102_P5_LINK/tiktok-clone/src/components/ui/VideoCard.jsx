const getFullVideoUrl = (url) => {
  if (!url) return '';
  // Supabase URLs are already full URLs
  if (url.startsWith('http')) return url;
  // Fallback for old local URLs
  return `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
};