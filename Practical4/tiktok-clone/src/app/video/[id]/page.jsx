"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getVideoById, getVideoComments, addComment } from "../../../services/videoService";
import { useAuth } from "../../../contexts/authContext";
import toast from "react-hot-toast";

export default function VideoPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await getVideoById(id);
        setVideo(videoData);
        const commentData = await getVideoComments(id);
        setComments(commentData.comments || []);
      } catch (error) {
        toast.error("Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in to comment");
      return;
    }
    if (!newComment.trim()) return;

    try {
      const comment = await addComment(id, newComment);
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  if (loading) return <div className="flex justify-center py-10">Loading...</div>;
  if (!video) return <div className="text-center py-10">Video not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <video
          src={video.videoUrl}
          controls
          className="w-full rounded-lg bg-black"
          style={{ maxHeight: "500px" }}
        />
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-lg">{video.user?.username}</h2>
        <p>{video.caption}</p>
      </div>

      {/* Comment form */}
      <form onSubmit={handleComment} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {comment.user?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{comment.user?.username}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}