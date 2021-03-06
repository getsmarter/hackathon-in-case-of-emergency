import React from "react";
import { Button, Modal } from "react-bootstrap";

    class CreateTeamModal extends React.Component { 
        constructor(props) {
          super(props);
          this.state = { }; // initialise state 
         this.handleChange = this.handleChange.bind(this);
     }

       handleChange(e) {
          const targetValue = e.target.value;
          this.props.handleMeetingAreaSelectChange(e);
        }
    // Make sure class has a render method 

    render () {
     return (
    <Modal
      show={this.props.show} onHide={this.props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Team
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="shortname" placeholder="Short Name" value={this.props.shortname} onChange={this.props.handleShortNameChange} />
        <input className="form-control" type="text" name="shortname" placeholder="Full Name" value={this.props.fullname} onChange={this.props.handleFullNameChange} />
          <select className="form-control"
          value={this.props.selectedMeetingArea}
          onChange={this.handleChange}
        >
          {this.props.meetingAreas.map(team => (
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
          {this.props.validationError}
        </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.save}>Create</Button>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );  
    }
 }

 export default CreateTeamModal;