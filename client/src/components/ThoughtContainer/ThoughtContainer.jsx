import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";

export default function ThoughtContainer() {
  const { currentUser } = useAppContext();

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    thoughtTitle: "", thoughtText: ""
  });

  function clearForms() {
    setFormData({ thoughtTitle: "", thoughtText: "" });
  }

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  async function handleThoughts(event) {
    event.preventDefault()
    try {
      const response = await fetch("/api/thoughts", {
        method: 'POST',
        body: JSON.stringify({
          thoughtTitle: formData.thoughtTitle,
          text: formData.thoughtText,
          username: userData.username
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json()
      clearForms()
      if (result.status === 'success') {
        // window.location.href = "/";
        console.log("Thought created successfully!");
      }
      else {
        // Handle failure (show error message or retry)
        console.error("Failed to create thought:", result.error);
      }
    } catch (err) {
      console.error("Error creating thought!", err.message)
    }
  }


  return (
    <>
      <div>
        <h1>thought container</h1>
        <form
          onSubmit={handleThoughts}
          className="mb-3 row"
        >
          <label className="col-sm-3 col-form-label text-light">
            Change Username
          </label>
          <div className="col-sm-7">
            <input
              className="form-control"
              name="thoughtTitle"
              value={formData.thoughtTitle}
              type="text"
              placeholder={`create a post heading`}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-sm-7">
            <input
              className="form-control"
              name="thoughtText"
              value={formData.text}
              type="text"
              placeholder={`create a post description`}
              onChange={handleInputChange}
            />
          </div>
          <p>{userData.username}</p>
          <button
            type="submit"
            className="btn btn-secondary mt-2">
            Create
          </button>

        </form>
      </div>
    </>
  );
}


