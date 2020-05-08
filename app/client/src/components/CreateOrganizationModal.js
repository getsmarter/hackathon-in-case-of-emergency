import React from "react";
import { Button, Modal, Row, Col, Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";


function CreateOrganizationModal (props) {
    const [fields, handleFieldChange] = useFormFields({
    organizationname: "",
  });

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