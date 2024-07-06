import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useAppContext } from "../../../providers/AppProvider";

export default function Profile(thought) {
  const { username } = useParams();
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAppContext();

  useEffect(() => {
    async function fetchUserThoughts() {
      try {
        const response = await fetch(`/api/thoughts?username=${username}`);
        const data = await response.json();
        if (response.ok) {
          if (data.status === "success") {
            setThoughts(data.payload);
          } else {
            console.error("Failed to fetch user thoughts:", data.message);
          }
        } else {
          throw new Error("Failed to fetch user thoughts.");
        }
      } catch (error) {
        console.error("Error fetching user thoughts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserThoughts();
  }, [username]);

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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

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
        <div key={thought._id} className="card bg-dark text-light my-2 container">
          <div className="row m-2 px-4 py-4 align-items-center">
            <div className="col-md-6">
              <p className="text-left">{thought.user_id.username} posted</p>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
                <Dropdown.Item onClick={followUser}>Follow {thought.user_id.username}</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
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
