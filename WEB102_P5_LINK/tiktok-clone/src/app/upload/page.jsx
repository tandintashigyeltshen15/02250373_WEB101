import { uploadToSupabase } from '@/services/uploadService';

// Before submitting to your API:
const { url: videoUrl, path: videoPath } = await uploadToSupabase(videoFile, 'videos');
const { url: thumbUrl, path: thumbPath } = await uploadToSupabase(thumbnailFile, 'thumbnails');

// Then send only the URLs/paths to your backend API (not the files):
await axios.post('/api/videos', {
  caption,
  videoUrl,
  thumbnailUrl: thumbUrl,
  videoStoragePath: videoPath,
  thumbnailStoragePath: thumbPath,
});