import { useState, useEffect } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import ThoughtList from "../../Thoughts/ThoughtList/ThoughtList";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import "./About.css";

export default function About() {
  const { currentUser } = useAppContext();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      if (currentUser && currentUser.username) {
        try {
          const response = await fetch(`/api/thoughts?username=${currentUser.username}`);
          const data = await response.json();
          console.log("Fetched user posts:", data);
          if (data.status === "success") {
            setUserPosts(data.payload);
          } else {
            console.error("Failed to fetch user posts:", data.message);
          }
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      } else {
        console.log("Current user is not defined");
      }
    }

    fetchUserPosts();
  }, [currentUser]);

  const handleUpdate = async (id, newTitle, newText) => {
    try {
      const response = await fetch(`/api/thoughts/${id}`, {
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
        setUserPosts(userPosts.map((post) => (post._id === id ? data.payload : post)));
      } else {
        console.error("Failed to update post:", data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/thoughts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: currentUser.username }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setUserPosts(userPosts.filter((post) => post._id !== id));
      } else {
        console.error("Failed to delete post:", data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="about-page border-top">
      {currentUser && (
        <ProfileHeader
          username={currentUser.username}
          bio={currentUser.bio}
          avatar={currentUser.avatar}
          _id={currentUser._id}
          isCurrentUser={true}
        />
      )}
      <div className="container">
        {userPosts.length > 0 ? (
          <ThoughtList thoughts={userPosts} onUpdate={handleUpdate} onDelete={handleDelete} />
        ) : (
          <p className="text-center mt-3 text-light">No posts available.</p>
        )}
      </div>
    </div>
  );
}
