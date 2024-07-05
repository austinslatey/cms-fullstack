import { useEffect, useState } from "react";
import { useAppContext } from "../../../providers/AppProvider";
import DeleteAccountModal from "../../Modal/DeleteAccountModal";



export default function DeleteAccount() {
  const [userData, setUserData] = useState({});
  const { currentUser } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === "success") {
        // Redirect or perform any cleanup actions after deletion
        window.location.href = "/";
      }
    } catch (err) {
      console.error('Error deleting account:', err);
    }
    setShowDeleteModal(false);
  };


  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  async function handleDeleteA(event) {
    event.preventDefault();
    openDeleteModal();
  }

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);


  return (
    <>
      <div className="mb-3 row">
        <div className="mx-2 col-sm-12">
          <button className="btn btn-danger" onClick={handleDeleteA}>
            Delete Account
          </button>
        </div>
      </div>
      <DeleteAccountModal showDeleteModal={showDeleteModal} handleDeleteAccount={handleDeleteAccount} closeModal={closeDeleteModal} />
    </>
  )
}