import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Buffer } from 'buffer';
import defaultImg from "../../assets/react.svg";

export default function ProfileHeader({ username, bio, avatar = {}, _id, isCurrentUser }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    async function fetchFollowersCount() {
      try {
        const response = await fetch(`/api/users/${_id}/followers`);
        const data = await response.json();
        if (data.status === "success") {
          setFollowersCount(data.payload.length);
        } else {
          console.error("Failed to fetch followers count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching followers count:", error);
      }
    }

    async function fetchFollowingCount() {
      try {
        const response = await fetch(`/api/users/${_id}/following`);
        const data = await response.json();
        if (data.status === "success") {
          setFollowingCount(data.payload.length);
        } else {
          console.error("Failed to fetch following count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching following count:", error);
      }
    }

    if (_id) {
      fetchFollowersCount();
      fetchFollowingCount();
    }
  }, [_id]);

  const handleEditProfile = () => {
    window.location.href = "/usersettings";
  };

  return (
    <div className="profile-header bg-dark text-light text-center py-5">
      {avatar.data && avatar.contentType ? (
        <img
          src={`data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`}
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
      <h1 className="mb-3">{username}</h1>
      <p className="text-secondary mb-3">{bio || "No bio provided"}</p>
      <div className="profile-counts mb-3">
        <span className="me-3">
          <strong>{followersCount}</strong> Followers
        </span>
        <span>
          <strong>{followingCount}</strong> Following
        </span>
      </div>
      {isCurrentUser && (
        <button className="btn btn-secondary mt-3" onClick={handleEditProfile}>
          Edit Profile
        </button>
      )}
    </div>
  );
}

ProfileHeader.propTypes = {
  username: PropTypes.string.isRequired,
  bio: PropTypes.string,
  avatar: PropTypes.shape({
    data: PropTypes.oneOfType([
      PropTypes.instanceOf(Buffer),
      PropTypes.array,
    ]),
    contentType: PropTypes.string,
  }),
  _id: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};
