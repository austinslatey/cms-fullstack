import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import SignOutModal from '../../Modal/SignOutModal';

export default function UserSettings() {
  const { currentUser } = useAppContext();
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    console.log('Signing out...');
    // Your sign-out logic goes here
    setShowModal(false);
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    loginUsername: userData.username, loginEmail: userData.email,
  });

  function clearForms() {
    setFormData({ loginUsername: "", loginEmail: "" });
  }

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
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

  async function handleEmailUpdate(event) {
    event.preventDefault();
    openModal();
  }

  async function confirmEmailChange() {
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: formData.loginEmail,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === "success") {
        window.location.href = "/login";
      }
      clearForms();
    } catch (err) {
      console.log(err);
    }
    closeModal();
  }

  const deleteAccount = async () => {
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === "success") {
        // Redirect or perform any cleanup actions after deletion
        window.location.href = "/goodbye"; // Example redirect
      }
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  }


  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
      setFormData({
        loginUsername: currentUser.username,
        loginEmail: currentUser.email
      });
    }
  }, [currentUser]);

  return (
    <>
      <div className="profile-header bg-dark text-light text-center min-vh-100">
        <div className="container">
          <h1>{userData.username}'s Profile</h1>
          <div className="row">
            <nav className="col-md-3">
              <div className="list-group">
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Public Profile</li>
                </div>
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Appearance</li>
                </div>
                <div className="mb-5 btn btn-secondary d-flex align-items-center justify-content-center">
                  <li className="list-group-item bg-dark text-light border p-4">Accessibility</li>
                </div>
              </div>
            </nav>
            <div className="col-md-9">
              <div className="container public-profile border">
                <h2 className="text-light">Profile Settings</h2>

                {/* Profile settings content */}
                <form
                  className="mb-3 row"
                  onSubmit={handleUsernameUpdate}
                >
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
                <form
                  className="mb-3 row"
                  onSubmit={handleEmailUpdate}
                >
                  <label className="col-sm-3 col-form-label text-light">Change Email</label>
                  <div className="col-sm-7">
                    <input className="form-control"
                      name="loginEmail"
                      value={formData.loginEmail}
                      type="text"
                      placeholder={`change ${userData.email}`}
                      onChange={handleInputChange} />
                    <button
                      className="btn btn-secondary mt-2"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label text-light">Change Bio</label>
                  <div className="col-sm-7">
                    <input className="form-control" type="text" placeholder="Enter a new bio" />
                    <button className="btn btn-secondary mt-2">Send</button>
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-10">
                    <button className="btn btn-danger" onClick={deleteAccount}>
                      Delete Account
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div >
      <SignOutModal showModal={showModal} handleSignOut={confirmEmailChange} closeModal={closeModal} />
    </>
  )
}