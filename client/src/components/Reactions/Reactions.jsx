import { useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import CommentModal from "../Modal/CommentModal";
import "./Reaction.css";

export default function AddReaction({ thought }) {
  const { currentUser } = useAppContext();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [reactionText, setReactionText] = useState("");

  const handleComment = async () => {
    if (reactionText.trim() === "") {
      alert("Reaction cannot be empty");
      return;
    }

    try {
      const response = await fetch(`/api/thoughts/${thought._id}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: currentUser.username,
          reactionBody: reactionText,
          user_id: currentUser._id
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Reaction added successfully');
        setReactionText("");
        setIsCommentModalOpen(false);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <>
      <button className="btn btn-primary m-2" onClick={() => setIsCommentModalOpen(true)}>
        Comment
      </button>

      <CommentModal
        show={isCommentModalOpen}
        handleClose={() => setIsCommentModalOpen(false)}
        thought={thought}
        handleComment={handleComment}
        commentText={reactionText}
        setCommentText={setReactionText}
      />
    </>
  );
}
