import { useState, useEffect } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import UpdatePostModal from "../../Modal/UpdatePostModal";
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function ThoughtCard({ thought, onUpdate, onDelete }) {
  const { currentUser } = useAppContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser && thought && thought.user_id) {
      setIsFollowing(currentUser.following.includes(thought.user_id._id));
    }
  }, [currentUser, thought]);

  if (!thought || !currentUser) {
    return null;
  }

  const handleUpdate = async (newTitle, newText) => {
    try {
      const response = await fetch(`/api/thoughts/${thought._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Ensure username is passed correctly
          username: currentUser.username,
          thoughtTitle: newTitle,
          thoughtText: newText,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        onUpdate(data.payload._id, data.payload.thoughtTitle, data.payload.thoughtText);
        // Close the modal after successful update
        setShowUpdateModal(false);
      } else {
        // Log error message if update fails
        console.error("Update request failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };


  // View Others profiles
  const viewProfile = () => {
    window.location.href = `/profile/${thought.user_id.username}`;
  };

  const followUser = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser.username}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followUsername: thought.user_id.username }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Friend added successfully');
        setIsFollowing(true); // Update isFollowing state
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const unfollowUser = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser.username}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unfollowUsername: thought.user_id.username }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Friend unfollowed successfully');
        setIsFollowing(false); // Update isFollowing state
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error unfollowing friend:', error);
    }
  };

  return (
    <div className="card bg-dark text-light my-2 container">
      <div className="row m-2 px-4 py-4 align-items-center">
        <div className="col-md-6">
          <p className="text-left">{thought.user_id.username} posted</p>
        </div>
        {currentUser.username !== thought.user_id.username && (
          <div className="col-md-6 d-flex justify-content-end">
            <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
              <Dropdown.Item onClick={viewProfile}>View Profile</Dropdown.Item>
              {isFollowing ? (
                <Dropdown.Item onClick={unfollowUser}>Unfollow {thought.user_id.username}</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={followUser}>Follow {thought.user_id.username}</Dropdown.Item>
              )}
            </DropdownButton>
          </div>
        )}
        {currentUser && currentUser.username === thought.user_id.username && (
          <div className="col-md-6 d-flex justify-content-end ">
            <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
              <Dropdown.Item className="btn btn-warning p-2 text-center bg-warning" onClick={() => setShowUpdateModal(true)}>Update</Dropdown.Item>
              <Dropdown.Item className="btn btn-danger p-2 text-center bg-danger" onClick={() => onDelete(thought._id)}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        )}
      </div>

      <h1 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h1>
      <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
      <p className="text-light text-center m-4">{new Date(thought.createdAt).toLocaleString()}</p>
      <div className="d-flex justify-content-center my-2">
        <button className="btn btn-primary m-2">Comment</button>
        <button className="btn btn-primary m-2">Like this</button>
      </div>
      <UpdatePostModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdate={handleUpdate}
        initialTitle={thought.thoughtTitle}
        initialText={thought.thoughtText}
      />
    </div>
  );
}
