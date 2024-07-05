import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import SignOutModal from '../../Modal/SignOutModal';


export default function ChangeEmail() {
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
    loginEmail: "",
  });

  function clearForms() {
    setFormData({ loginEmail: "" });
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
    handleSignOut();
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
        loginEmail: currentUser.email,
      });
    }
  }, [currentUser]);

  return (
    <>
      <form className="mb-3 row" onSubmit={handleEmailUpdate}>
        <label className="col-sm-3 col-form-label text-light">Change Email</label>
        <div className="col-sm-7">
          <input
            className="form-control"
            name="loginEmail"
            value={formData.loginEmail}
            type="text"
            placeholder={`change ${userData.email}`}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-secondary mt-2"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
      <SignOutModal showModal={showModal} handleSignOut={confirmEmailChange} closeModal={closeModal} />
    </>
  )
}