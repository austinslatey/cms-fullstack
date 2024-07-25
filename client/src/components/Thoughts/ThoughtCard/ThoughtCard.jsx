import { useState, useEffect } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import { Buffer } from 'buffer';
import UpdatePostModal from "../../Modal/UpdatePostModal";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import AddReaction from "../../Reactions/Reactions";
import Likes from "../../Likes/Likes";
import defaultImg from "../../../assets/avi.png";
import "./ThoughtCard.css";

export default function ThoughtCard({ thought, onUpdate, onDelete }) {
  const { currentUser } = useAppContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (currentUser && thought && thought.user_id) {
      setIsFollowing(currentUser.following.includes(thought.user_id._id));
      if (thought.user_id.avatar && thought.user_id.avatar.data) {
        const buffer = Buffer.from(thought.user_id.avatar.data);
        const base64String = buffer.toString('base64');
        const avatarUrl = `data:${thought.user_id.avatar.contentType};base64,${base64String}`;
        setAvatarUrl(avatarUrl);
      } else {
        setAvatarUrl(defaultImg);
      }
    }
  }, [currentUser, thought]);

  if (!thought || !currentUser || !thought.user_id) {
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
          username: currentUser.username,
          thoughtTitle: newTitle,
          thoughtText: newText,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        onUpdate(data.payload._id, data.payload.thoughtTitle, data.payload.thoughtText);
        setShowUpdateModal(false);
      } else {
        console.error("Update request failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const viewProfile = (e) => {
    e.stopPropagation();
    window.location.href = `/profile/${thought.user_id.username}`;
  };

  const followUser = async (e) => {
    e.stopPropagation();
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
        setIsFollowing(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const unfollowUser = async (e) => {
    e.stopPropagation();
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
        setIsFollowing(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error unfollowing friend:', error);
    }
  };

  const goToPostPage = (e) => {
    const ignoredClasses = ["btn", "dropdown-item", "dropdown-toggle", "profile-avatar"];
    const ignoredElements = ["BUTTON", "IMG"];
    if (
      ignoredClasses.some((cls) => e.target.classList.contains(cls)) ||
      ignoredElements.includes(e.target.tagName)
    ) {
      return;
    }
    window.location.href = `/thought/${thought._id}`;
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(thought._id);
  };

  return (
    <div className="card bg-dark text-light my-2 container" onClick={goToPostPage}>
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
          <div className="col-md-6 d-flex justify-content-end">
            <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
              <Dropdown.Item className="btn btn-warning p-2 text-center bg-warning" onClick={handleUpdateClick}>Update</Dropdown.Item>
              <Dropdown.Item className="btn btn-danger p-2 text-center bg-danger" onClick={handleDeleteClick}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        )}
      </div>

      <h1 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h1>
      <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
      <p className="text-light text-center m-4">{thought.createdAt}</p>
      <div className="d-flex justify-content-between align-items-center" onClick={(e) => e.stopPropagation()}>
        <AddReaction thought={thought}/>
        <Likes thought={thought} currentUser={currentUser} />
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
