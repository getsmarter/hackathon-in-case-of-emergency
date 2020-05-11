import React from "react";
import { Button, Modal} from "react-bootstrap";

function CreateMeetingAreaModal (props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Meeting Area
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="meetingareaname" placeholder="Name" value={props.meetingareaname} onChange={props.handleMeetingAreaNameChange} />
        <input className="form-control" type="text" name="parkinglotname" placeholder="Parking Lot" value={props.parkinglotname} onChange={props.handleParkingLotNameChange} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.save}>Create</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateMeetingAreaModal;