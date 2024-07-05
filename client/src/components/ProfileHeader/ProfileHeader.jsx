import React, { useEffect, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
// import defaultAvatar from "./default-avatar.png"; // Replace with your default avatar image

export default function ProfileHeader() {
  const { currentUser } = useAppContext();
  const [followersCount, setFollowersCount] = useState(0); // Example: replace with actual follower count state
  const [followingCount, setFollowingCount] = useState(0); // Example: replace with actual following count state

  useEffect(() => {
    async function fetchFollowersCount() {
      try {
        const response = await fetch(`/api/users/${currentUser._id}/followers`);
        const data = await response.json();
        if (data.status === "success") {
          setFollowersCount(data.payload.length);
        }
      } catch (error) {
        console.error("Error fetching followers count:", error);
      }
    }

    async function fetchFollowingCount() {
      try {
        const response = await fetch(`/api/users/${currentUser._id}/following`);
        const data = await response.json();
        if (data.status === "success") {
          setFollowingCount(data.payload.length);
        }
      } catch (error) {
        console.error("Error fetching following count:", error);
      }
    }

    fetchFollowersCount();
    fetchFollowingCount();
  }, [currentUser]);

  return (
    <div className="profile-header bg-dark text-light text-center py-5">
      <img
        // src={currentUser.avatar || defaultAvatar}
        alt="Profile"
        className="profile-avatar rounded-circle mb-3"
      />
      <h1 className="mb-3">{currentUser?.username}</h1>
      <p className="text-secondary mb-3">{currentUser?.bio || "No bio provided"}</p>
      <div className="profile-counts mb-3">
        <span className="me-3">
          <strong>{followersCount}</strong> Followers
        </span>
        <span>
          <strong>{followingCount}</strong> Following
        </span>
      </div>
    </div>
  );
}
