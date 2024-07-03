import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdatePostModal({ show, handleClose, handleUpdate, initialTitle, initialText }) {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);

  const handleSubmit = () => {
    handleUpdate(title, text);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdatePostModal;
