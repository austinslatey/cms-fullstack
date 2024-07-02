import { useEffect, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";

export default function ThoughtContainer() {
  const { currentUser } = useAppContext();

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    thoughtTitle: "",
    thoughtText: ""
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
    event.preventDefault();
    try {
      const response = await fetch("/api/thoughts", {
        method: "POST",
        body: JSON.stringify({
          thoughtTitle: formData.thoughtTitle,
          thoughtText: formData.thoughtText,
          username: userData.username
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      clearForms();
      if (result.status === "success") {
        console.log("Thought created successfully!");
      } else {
        console.error("Failed to create thought:", result.error);
      }
    } catch (err) {
      console.error("Error creating thought!", err.message);
    }
  }

  return (
    <div className="border mx-4 mb-2 bg-dark p-2 text-center text-light">
      <h1>Create a new post {userData.username}!</h1>
      <form onSubmit={handleThoughts} className="mb-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="thoughtTitle" className="form-label text-light">
                Title
              </label>
              <input
                id="thoughtTitle"
                className="form-control"
                name="thoughtTitle"
                value={formData.thoughtTitle}
                type="text"
                placeholder="Enter a post title"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="thoughtText" className="form-label text-light">
                Description
              </label>
              <input
                id="thoughtText"
                className="form-control"
                name="thoughtText"
                value={formData.thoughtText}
                type="text"
                placeholder="Enter a post description"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <button type="submit" className="btn btn-secondary mt-2">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
