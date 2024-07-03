import { useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import UpdatePostModal from "../../Modal/UpdatePostModal";

export default function ThoughtCard({ thought, onUpdate, onDelete }) {
  const { currentUser } = useAppContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = (newTitle, newText) => {
    onUpdate(thought._id, newTitle, newText);
  };

  return (
    <div className="card bg-dark text-light my-2">
      <p className="text-left m-2 px-4 py-4">{thought.username} posted</p>
      <h1 className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtTitle}</h1>
      <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
      <p className="text-light text-center m-4">{thought.createdAt}</p>
      <div className="d-flex justify-content-center my-2">
        <button className="btn btn-primary m-2">Comment</button>
        <button className="btn btn-primary m-2">Like this</button>
        {currentUser && currentUser.username === thought.username && (
          <>
            <button className="btn btn-warning m-2" onClick={() => setShowUpdateModal(true)}>Update</button>
            <button className="btn btn-danger m-2" onClick={() => onDelete(thought._id)}>Delete</button>
          </>
        )}
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
