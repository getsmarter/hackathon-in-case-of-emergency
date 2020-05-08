import React from "react";
import "./Organizations.css";
import { Button} from "react-bootstrap";
import { setState } from "react";
import CreateOrganizationModal from "../components/CreateOrganizationModal";

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {organizationname : ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleOrgNameChange(e) {
    this.setState({organizationname: e.target.value});
  }

 handleClick(e) {
    this.setState({modalShow : true});
 }

 handleHide() {
  this.setState({modalShow: false});
 }

 async handleSave() {
    const url = '/api/organizations';
    //const data = {username:this.state.userName, password:this.state.password, action:this.state.act};
    try {
      const response = await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.organizationname, title: this.state.organizationname })
      });
      const apiresponse = await response.text();
      console.log(apiresponse);
    } catch (error) {
      console.error('Error', error);
    }
    this.setState({modalShow: false});
 }

 render() {
  const mod = this.state.modal;
  return (

  	    <div className="Home">
      <div className="lander">
        <h1>Organizations</h1>
        <p><Button size="lg" onClick={this.handleClick} className="button2" variant="outline-dark">Create</Button>
        <CreateOrganizationModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleSave.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        organizationname={this.state.organizationname}
        /></p>
      </div>
    </div>
  );
}
}

export default Organizations;