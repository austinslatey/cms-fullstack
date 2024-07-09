import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";


export default function ChangeBio() {
  const { currentUser } = useAppContext();
  const [userData, setUserData] = useState({});

  const [formData, setFormData] = useState({
    bio: "",
  });

  function clearForms() {
    setFormData({ bio: "" });
  }

  async function handleBioUpdate(event) {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          bio: formData.bio,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === "success") {
        window.location.href = "/usersettings";
      }
      clearForms();
    } catch (err) {
      console.log(err);
    }
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
      setFormData({
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser]);

  return (
    <>
      <form className="mb-3 row" onSubmit={handleBioUpdate}>
        <label className="col-sm-3 col-form-label text-light">
          Change Bio
        </label>
        <div className="col-sm-7">
          <input
            className="form-control"
            name="bio"
            value={formData.bio}
            type="text"
            placeholder={`${userData.bio ? userData.bio : "create your bio"}`}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-secondary mt-2">
            Send
          </button>
        </div>
      </form>
    </>
  )
}