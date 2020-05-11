import React from "react";
import { Button, Modal} from "react-bootstrap";

function EditOrganizationModal (props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Organization
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="organizationname" placeholder="Name" value={props.organizationname} onChange={props.handleOrgNameChange} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.edit}>Edit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditOrganizationModal;