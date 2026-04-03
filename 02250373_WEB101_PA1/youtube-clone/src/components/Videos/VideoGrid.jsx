import { videos } from "../../data/videos";
import VideoCard from "./VideoCard";
import "./Video.css";

function VideoGrid() {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;
