// CommentModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CommentModal({ show, handleClose, thought, handleComment, commentText, setCommentText }) {
  if (!thought) {
    return null; // or some fallback UI
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title ></Modal.Title>
      </Modal.Header>
      <Modal.Body className="card bg-dark text-light my-2 container">
        <h1 className="text-center border border-secondary m-2 p-4 rounded">{thought.thoughtTitle}</h1>
        <p className="border border-secondary m-2 p-4 rounded text-center">{thought.thoughtText}</p>
        <Form>
          <Form.Group controlId="commentTextarea">
            <Form.Label>Write your comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleComment}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
