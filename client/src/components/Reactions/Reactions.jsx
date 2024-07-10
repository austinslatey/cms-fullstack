import { useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import "./Reaction.css";

export default function AddReaction({ thoughtId }) {
  const { currentUser } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reactionText, setReactionText] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (e) => {
    setReactionText(e.target.value);
  };

  const addReaction = async () => {
    if (reactionText.trim() === "") {
      alert("Reaction cannot be empty");
      return;
    }

    try {
      const response = await fetch(`/api/thoughts/${thoughtId}/reactions`, {
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
        setIsDropdownOpen(false);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <>
      <button className="btn btn-primary m-2" onClick={toggleDropdown}>
        {isDropdownOpen ? "Cancel" : "Comment"}
      </button>

      {isDropdownOpen && (
        <div className="reaction-dropdown">
          <textarea
            value={reactionText}
            onChange={handleChange}
            placeholder="Write your reaction..."
            className="form-control"
          />
          <button className="btn btn-success mt-2" onClick={addReaction}>
            Send
          </button>
        </div>
      )}
    </>
  );
}
