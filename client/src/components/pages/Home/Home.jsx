import { useEffect, useState } from "react";
import ThoughtContainer from "../../Thoughts/ThoughtContainer/ThoughtContainer";
import ThoughtList from "../../Thoughts/ThoughtList/ThoughtList";
import LoginBlocker from "../Login/LoginBlocked";
import { useAppContext } from "../../../providers/AppProvider"
import "./Home.css";

export default function Home() {
  const [thoughts, setThoughts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser } = useAppContext();

  useEffect(() => {
    async function fetchThoughts() {
      try {
        const response = await fetch("/api/thoughts");
        if (!response.ok) {
          throw new Error("Failed to fetch thoughts.");
        }
        const data = await response.json();
        if (data.status === "success") {
          setThoughts(data.payload);
        } else {
          throw new Error("Failed to fetch thoughts.");
        }
      } catch (error) {
        console.error("Error fetching thoughts:", error);
      }
    }

    fetchThoughts();
  }, []);

  useEffect(() => {
    currentUser && setLoggedIn(true);
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
        setThoughts(thoughts.map(post => post._id === id ? data.payload : post));
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
        setThoughts(thoughts.filter(post => post._id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-secondary">
      {!loggedIn ? (
        <LoginBlocker />
      ) : (
        <ThoughtContainer />
      )}
      <div className="container">
        <ThoughtList thoughts={thoughts} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
}
