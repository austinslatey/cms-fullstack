import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import ThoughtList from "../../Thoughts/ThoughtList/ThoughtList";
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
          if (data.status === "success") {
            setUserPosts(data.payload);
          }
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    }

    fetchUserPosts();
  }, [currentUser]);

  return (
    <div className="about-page">
      <h1>About {currentUser?.username}</h1>
      {userPosts.length > 0 ? (
        <ThoughtList thoughts={userPosts} />
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}