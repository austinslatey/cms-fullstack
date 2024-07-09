import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";

export default function ChangeAvatar() {
  const { currentUser } = useAppContext();
  const [userData, setUserData] = useState({});

  const [formData, setFormData] = useState({
    avatar: "",
  });

  function clearForms() {
    setFormData({ avatar: "" });
  }

  async function handleAvatarUpdate(event) {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('avatar', formData.avatar);

    try {
      const response = await fetch(`/api/users/${userData._id}/avatar`, {
        method: 'PUT',
        body: formDataObj,
      });
      const result = await response.json();
      console.log(`Server response: ${JSON.stringify(result)}`); // Log server response
      if (result.status === "success") {
        window.location.href = "/usersettings";
      } else {
        console.error(`Server error: ${result.msg}`); // Log server error
      }
      clearForms();
    } catch (err) {
      console.error(`Fetch error: ${err.message}`); // Log fetch error
    }
  }


  function handleInputChange(event) {
    setFormData({
      ...formData,
      avatar: event.target.files[0]
    });
  }

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
      setFormData({
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  return (
    <>
      <form className="mb-3 row" onSubmit={handleAvatarUpdate}>
        <label className="col-sm-3 col-form-label text-light">
          Change Avatar
        </label>
        <div className="col-sm-7">
          <input
            className="form-control"
            name="avatar"
            type="file"
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
