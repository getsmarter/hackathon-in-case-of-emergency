import React from "react";
import { Button, Modal} from "react-bootstrap";

function DeleteMeetingAreaModal (props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Team
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete Team?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.delete}>Delete</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMeetingAreaModal;