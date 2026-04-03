function VideoCard({ video }) {
  return (
    <div className="video-card">
      
      {/* Thumbnail with duration */}
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt="thumbnail" />
        <span className="duration">10:23</span>
      </div>

      {/* Video info */}
      <div className="video-info">
        <div className="channel-avatar"></div>

        <div>
          <h4>{video.title}</h4>
          <p>{video.channel}</p>
          <p className="meta">
            {video.views} • {video.time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
