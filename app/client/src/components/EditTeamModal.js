import React from "react";
import { Button, Modal} from "react-bootstrap";

function EditTeamModal (props) {
  return (
    <Modal
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Team
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="shortname" placeholder="Short Name" value={props.shortname} onChange={props.handleShortNameChange} />
        <input className="form-control" type="text" name="shortname" placeholder="Full Name" value={props.fullname} onChange={props.handleFullNameChange} />
          <select className="form-control"
          value={props.selectedMeetingArea}
          onChange={e =>
            props.setSelectedMeetingArea
          }
        >
          {props.meetingAreas.map(team => (
            <option
              key={team.value}
              value={team.value}
            >
              {team.display}
            </option>
          ))}
        </select>
        <div
          style={{
            color: "red",
            marginTop: "5px"
          }}
        >
          {props.validationError}
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.edit}>Edit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTeamModal;