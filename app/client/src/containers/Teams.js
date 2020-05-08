import React from "react";
import "./Teams.css";
import { Button} from "react-bootstrap";
import { setState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {teamname : ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleOrgNameChange(e) {
    this.setState({teamname: e.target.value});
  }

 handleClick(e) {
    this.setState({modalShow : true});
 }

 handleHide() {
  this.setState({modalShow: false});
 }

 async handleSave() {
    const url = '/api/Teams';
    //const data = {username:this.state.userName, password:this.state.password, action:this.state.act};
    try {
      const response = await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.teamname, title: this.state.teamname })
      });
      const apiresponse = await response.text();
      console.log(apiresponse);
    } catch (error) {
      console.error('Error', error);
    }
    this.setState({modalShow: false});
 }

  async getTeams() {
    const url = '/api/Teams';
    //const data = {username:this.state.userName, password:this.state.password, action:this.state.act};
    try {
      const response = await fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.teamname, title: this.state.teamname })
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
        <h1>Teams</h1>
        <p><Button size="lg" onClick={this.handleClick} className="button2" variant="outline-dark">Create</Button>
        <CreateTeamModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleSave.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        teamname={this.state.teamname}
        /></p>
      </div>
    </div>
  );
}
}

export default Teams;