import { useState } from 'react';
import { useAppContext } from "../../providers/AppProvider";


const Likes = ({ thought }) => {
  const { currentUser } = useAppContext();
  const [likes, setLikes] = useState(thought.likes);
  const [liked, setLiked] = useState(thought.likedBy.includes(currentUser._id));

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/thoughts/${thought._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: currentUser.username})
      });

      if (!response.ok) {
        throw new Error('Failed to like the thought');
      }

      const result = await response.json();
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error('Error liking the thought:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/thoughts/${thought._id}/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: currentUser.username})
      });

      if (!response.ok) {
        throw new Error('Failed to unlike the thought');
      }

      const result = await response.json();
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error('Error unliking the thought:', error);
    }
  };

  return (
    <div>
      {liked ? (
        <button onClick={handleUnlike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
      <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </div>
  );
};

export default Likes;
