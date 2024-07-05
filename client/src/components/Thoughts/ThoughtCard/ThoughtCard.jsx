import { useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import UpdatePostModal from "../../Modal/UpdatePostModal";
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function ThoughtCard({ thought, onUpdate, onDelete }) {
  const { currentUser } = useAppContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  if (!thought || !currentUser) {
    // Or render a loading indicator/spinner
    return null;
  }

  const handleUpdate = (newTitle, newText) => {
    onUpdate(thought._id, newTitle, newText);
  };

  const viewProfile = () => {
    window.location.href = `/profile/${thought.username}`;
  };

  const followUser = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser._id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followId: thought.userId }), // Assuming thought has a userId field
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

  return (
    <div className="card bg-dark text-light my-2">
      <div className="row m-2 px-4 py-4 align-items-center">
        <div className="col-md-6">
          <p className="text-left">{thought.username} posted</p>
        </div>
        {currentUser.username !== thought.username && (
          <div className="col-md-6 d-flex justify-content-end">
            <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
              <Dropdown.Item onClick={viewProfile}>View Profile</Dropdown.Item>
              <Dropdown.Item onClick={followUser}>Follow {thought.username}</Dropdown.Item>
            </DropdownButton>
          </div>
        )}
        {currentUser && currentUser.username === thought.username && (
          <>
            <div className="col-md-6 d-flex justify-content-end ">
              <DropdownButton id="dropdown-basic-button" title="Options" variant="dark">
                <Dropdown.Item className="btn btn-warning p-2 text-center bg-warning" onClick={() => setShowUpdateModal(true)}>Update</Dropdown.Item>
                <Dropdown.Item className="btn btn-danger p-2 text-center bg-danger" onClick={() => onDelete(thought._id)}>Delete</Dropdown.Item>
              </DropdownButton>
            </div>
          </>
        )}
      </div>

      <h1 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h1>
      <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
      <p className="text-light text-center m-4">{thought.createdAt}</p>
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
