import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";


export default function ChangeUsername() {
  const { currentUser } = useAppContext();
  const [userData, setUserData] = useState({});

  const [formData, setFormData] = useState({
    loginUsername: "",
  });

  function clearForms() {
    setFormData({ loginUsername: "" });
  }

  async function handleUsernameUpdate(event) {
    event.preventDefault();
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          username: formData.loginUsername,
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
        loginUsername: currentUser.username,
      });
    }
  }, [currentUser]);

  return (
    <>
      <form className="mb-3 row" onSubmit={handleUsernameUpdate}>
        <label className="col-sm-3 col-form-label text-light">
          Change Username
        </label>
        <div className="col-sm-7">
          <input
            className="form-control"
            name="loginUsername"
            value={formData.loginUsername}
            type="text"
            placeholder={`change ${userData.username}`}
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