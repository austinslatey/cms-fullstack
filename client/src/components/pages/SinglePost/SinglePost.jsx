import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import AddReaction from '../../Reactions/Reactions';
import defaultImg from "../../../assets/avi.png";


export default function SinglePostPage() {
  const { id } = useParams();
  const [thought, setThought] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const response = await fetch(`/api/thoughts/${id}`);
        const data = await response.json();
        if (data.status === 'success') {
          setThought(data.payload);
          if (data.payload.user_id.avatar && data.payload.user_id.avatar.data) {
            const buffer = Buffer.from(data.payload.user_id.avatar.data);
            const base64String = buffer.toString('base64');
            const avatarUrl = `data:${data.payload.user_id.avatar.contentType};base64,${base64String}`;
            setAvatarUrl(avatarUrl);
          } else {
            setAvatarUrl(defaultImg);
          }
        } else {
          console.error("Failed to fetch thought:", data.message);
        }
      } catch (error) {
        console.error("Error fetching thought:", error);
      }
    };

    fetchThought();
  }, [id]);

  if (!thought) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-post-page">
      <div className="card bg-dark text-light my-2 container">
        <div className="row m-2 px-4 py-4 align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="profile-avatar rounded-circle mb-3"
              />
            ) : (
              <img
                src={defaultImg}
                alt="Default Profile"
                className="profile-avatar rounded-circle mb-3"
              />
            )}
            <p className="px-2">{thought.user_id.username} posted</p>
          </div>
        </div>

        <h1 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h1>
        <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
        <p className="text-light text-center m-4">{thought.createdAt}</p>
        <div className="d-flex justify-content-between align-items-center">
          <AddReaction thoughtId={thought._id} />
          <button className="btn btn-primary">Like</button>
        </div>
        {thought.reactions.map((reaction, index) => (
          <div key={index} className="comment-card text-center border py-2">
            <p><strong>{reaction.username}</strong>: {reaction.reactionBody}</p>
            <p>{reaction.createdAt}</p>
          </div>
        ))}
      </div>

      {/* Comments Section */}
      <div className="comments-section bg-dark text-light ">

      </div>
    </div>
  );
}
