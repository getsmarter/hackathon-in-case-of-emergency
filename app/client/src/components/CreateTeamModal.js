import React from "react";
import { Button, Modal, Row, Col, Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";


function CreateTeamModal (props) {
    const [fields, handleFieldChange] = useFormFields({
    teamname: "",
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
        <input type="text" name="teamname" placeholder="Name" value={props.teamname} onChange={props.handleOrgNameChange} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.save}>Create</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTeamModal;