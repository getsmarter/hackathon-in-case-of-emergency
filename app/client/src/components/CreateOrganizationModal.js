import React from "react";
import { Button, Modal} from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

function CreateOrganizationModal (props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Organization
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="organizationname" placeholder="Name" value={props.organizationname} onChange={props.handleOrgNameChange} />
                <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={props.handleFileChange} type="file" />
        </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.save}>Create</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateOrganizationModal;