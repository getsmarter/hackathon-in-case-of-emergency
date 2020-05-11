import React from "react";
import { Button, Modal } from "react-bootstrap";

    class CreateAlertModal extends React.Component { 
        constructor(props) {
          super(props);
          this.state = { }; // initialise state 
         this.handleChange = this.handleChange.bind(this);
     }

       handleChange(e) {
          const targetValue = e.target.value;
          this.props.handleOrganizationSelectChange(e);
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
          Create Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
        <input className="form-control" type="text" name="alertname" placeholder="Name" value={this.props.alertname} onChange={this.props.handleAlertNameChange} />
        <input className="form-control" type="text" name="alertmessage" placeholder="Message" value={this.props.alertmessage} onChange={this.props.handleAlertMessageChange} />
          <select className="form-control"
          value={this.props.selectOrganization}
          onChange={this.handleChange}
        >
          {this.props.organizationsselect.map(organization => (
            <option
              key={organization.value}
              value={organization.value}
            >
              {organization.display}
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

 export default CreateAlertModal;