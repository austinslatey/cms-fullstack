import { Modal, Button } from 'react-bootstrap';

function SignOutModal({ showModal, handleSignOut, closeModal }) {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to sign out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSignOut}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignOutModal;
