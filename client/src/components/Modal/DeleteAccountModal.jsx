import { Modal, Button } from 'react-bootstrap';

export default function DeleteAccountModal({ showDeleteModal, handleDeleteAccount, closeModal }) {

  return (
    <Modal show={showDeleteModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <svg
          className="text-danger"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <div className='display-6 text-center'>
          This will remove your account permanently
        </div>
        <div className='display-6 text-center'>
          Are you sure you want to continue?
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
