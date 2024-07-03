import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserThoughts() {
      try {
        const response = await fetch(`/api/thoughts?username=${username}`);
        const data = await response.json();
        if (data.status === "success") {
          setThoughts(data.payload);
        }
      } catch (error) {
        console.error("Error fetching user thoughts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserThoughts();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (thoughts.length === 0) {
    return <div>No thoughts found for user {username}.</div>;
  }

  return (
    <div className="profile-page">
      <h1>{username}'s Profile</h1>
      {thoughts.map((thought) => (
        <div key={thought._id} className="card bg-dark text-light my-2">
          <h2 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h2>
          <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
          <p className="text-light text-center m-4">{thought.createdAt}</p>
          <div className="d-flex justify-content-center my-2">
            <button className="btn btn-primary m-2">Comment</button>
            <button className="btn btn-primary m-2">Like this</button>

          </div>
        </div>
      ))}
    </div>
  );
}
