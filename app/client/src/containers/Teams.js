import React from "react";
import "./Teams.css";
import { Button} from "react-bootstrap";
import CreateTeamModal from "../components/CreateTeamModal";
import EditTeamModal from "../components/EditTeamModal";
import DeleteTeamModal from "../components/DeleteTeamModal";

export class Child extends React.Component {
    click = (teamid) => {
        this.props.handleTeamEdit(teamid);
    }

    clickDelete = (teamid) => {
        this.props.handleTeamDelete(teamid);
    }

    render() {
      return this.props.data.map((team) => 
        <tr key={team._id}>
          <td>{team.fullName}</td>
          <td>{team.createdAt}</td>
          <td><button className="btn btn-primary" onClick={() => this.click(team._id)} teamid={team._id}> Edit</button> <button className="btn btn-danger" onClick={() => this.clickDelete(team._id)} teamid={team._id}>Delete</button></td>
        </tr>
      )
    }
}

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {modalShowEdit : false};
    this.state = {teamname : ''};
    this.handleClick = this.handleClick.bind(this);
    this.state = {userid : null};
    this.state = {teamid : null};
    this.state = {meetingAreas : []}
  }

  handleTeamNameChange(e) {
    this.setState({teamname: e.target.value});
  }
  handleShortNameChange(e) {
    this.setState({shortname: e.target.value});
  }
  handleFullNameChange(e) {
    this.setState({fullname: e.target.value});
  }

  handleClick(e) {
    this.setState({modalShow : true});
  }

  handleHide() {
    this.setState({modalShow: false});
  }

  handleHideEdit() {
    this.setState({modalShowEdit: false});
  }

  handleHideDelete() {
    this.setState({modalShowDelete: false});
  }  

  handleTeamEdit(teamId) {
    this.setState({modalShowEdit : true});
    this.setState({teamid : teamId});
  }

  handleTeamDelete(teamId) {
    this.setState({modalShowDelete : true});
    this.setState({teamid : teamId});
  }

  setSelectedMeetingArea(e) {
    console.log(e);
    this.setState({
      selectedMeetingArea: e.target.value,
      validationError:
        e.target.value === ""
          ? "You must select a meeting area."
          : ""
    });
  }

  handleMeetingAreaSelectChange = (e) => {
    this.setState({
      selectedMeetingArea: e.target.value,
      validationError:
        e.target.value === ""
          ? "You must select a meeting area."
          : ""
    });
  }

  

   async getUserTeams() {
    const url = 'teams/organizations/'+this.state.organizationid;
    try {
      const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const apiresponse = await response.json();
      this.setState({teams: apiresponse})
    } catch (error) {
      console.error('Error', error);
    } 
   }

   async handleEdit() {
      const url = 'teams/'+this.state.teamid;
      try {
        const response = await fetch(url, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({ shortName: this.state.shortname, fullName: this.state.fullname, meetingAreaId: this.state.selectedMeetingArea })
        });
        const apiresponse = await response.json();
        console.log(apiresponse);
        this.getUserTeams();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowEdit: false});
   }

   async handleDelete() {
      const url = 'teams/'+this.state.teamid;
      try {
        const response = await fetch(url, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const apiresponse = await response.json();
        console.log(apiresponse);
        this.getUserTeams();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowDelete: false});
   }       
   async handleSave() {
      const url = 'teams';
      try {
        const response = await fetch(url, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ shortName: this.state.shortname, fullName: this.state.fullname, organizationId: this.state.organizationid, meetingAreaId: this.state.selectedMeetingArea })
        });
        const apiresponse = await response.json();
        console.log(apiresponse);
        this.getUserTeams()
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShow: false});
   }

   async getMeetingAreas() {

    fetch(
      "meeting-areas/organizations/"+this.state.organizationid
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let meetingAreasFromApi = data.map(meetingAreas => {
          return { value: meetingAreas._id, display: meetingAreas.name };
        });
        this.setState({
          meetingAreas: [
            {
              value: "",
              display:
                "(Select teams Meeting area)"
            }
          ].concat(meetingAreasFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
   }

    async componentDidMount() {
     // alert(this.context.varname);
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let foo = params.get('organizationId');
      const url = "teams/organizations/"+foo
      try {
        const response = await fetch(url, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const apiresponse = await response.json();
        console.log(apiresponse);
        this.setState({organizationid: foo});
        this.setState({teams: apiresponse})
        this.getMeetingAreas();
      } catch (error) {
        console.error('Error', error);
        this.setState({organizationid: null});
      }
  }

 render() {
  return (

        <div className="Home">
      <div className="lander">
        <h1>Teams <Button size="lg" onClick={this.handleClick} className="button2" variant="outline-dark">Create</Button></h1>
        <br/>
        <CreateTeamModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleSave.bind(this)}
        setSelectedMeetingArea={this.setSelectedMeetingArea.bind(this)}
        selectedMeetingArea={this.state.selectedMeetingArea}
        meetingAreas={this.state.meetingAreas}
        validationError={this.validationError}
        setMeetingAreas={this.setSelectedMeetingArea.bind(this)}
        handleShortNameChange={this.handleShortNameChange.bind(this)}
        handleFullNameChange={this.handleFullNameChange.bind(this)}
        handleMeetingAreaSelectChange={this.handleMeetingAreaSelectChange}

        />
        <EditTeamModal
        show={this.state.modalShowEdit}
        onHide={this.handleHideEdit.bind(this)}
        edit={this.handleEdit.bind(this)}
        setSelectedMeetingArea={this.setSelectedMeetingArea.bind(this)}
        selectedMeetingArea={this.state.selectedMeetingArea}
        meetingAreas={this.state.meetingAreas}
        validationError={this.validationError}
        handleShortNameChange={this.handleShortNameChange.bind(this)}
        handleFullNameChange={this.handleFullNameChange.bind(this)}

        />
        <DeleteTeamModal
        show={this.state.modalShowDelete}
        onHide={this.handleHideDelete.bind(this)}
        delete={this.handleDelete.bind(this)}
        handleTeamNameChange={this.handleTeamNameChange.bind(this)}
        teamname={this.state.teamname}
        teamid={this.state.teamid}
        />        
        <div className="container">
            <div className="card">
              <div className="header">
              </div>
              <div className="content table-responsive table-full-width">
                <table className="table table-striped">
                    <thead>
                      <tr><th>Name</th>
                      <th>Created At</th>
                      <th>Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {this.state.teams && (
                      <Child data={this.state.teams} handleTeamEdit={this.handleTeamEdit.bind(this)} handleTeamDelete={this.handleTeamDelete.bind(this)} />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
}

export default Teams;