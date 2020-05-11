import React from "react";
import "./MeetingAreas.css";
import { Button} from "react-bootstrap";
import CreateMeetingAreaModal from "../components/CreateMeetingAreaModal";
import EditMeetingAreaModal from "../components/EditMeetingAreaModal";
import DeleteMeetingAreaModal from "../components/DeleteMeetingAreaModal";

export class Child extends React.Component {
    click = (orgid) => {
        this.props.handleOrgEdit(orgid);
    }

    clickDelete = (orgid) => {
        this.props.handleOrgDelete(orgid);
    }

    render() {
      return this.props.data.map((meetingarea) => 
        <tr key={meetingarea._id}>
          <td>{meetingarea.name}</td>
          <td>{meetingarea.parkingLot}</td>
          <td>{meetingarea.createdAt}</td>
          <td><button className="btn btn-primary" onClick={() => this.click(meetingarea._id)} meetingareaid={meetingarea._id}> Edit</button> <button className="btn btn-danger" onClick={() => this.clickDelete(meetingarea._id)} meetingareaid={meetingarea._id}>Delete</button></td>
        </tr>
      )
    }
}

class MeetingAreas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {modalShowEdit : false};
    this.state = {meetingareaname : ''};
    this.handleClick = this.handleClick.bind(this);
    this.state = {userid : null};
    this.state = {meetingareaid : null};
    this.state = {meetingAreas : []}
  }

  handleMeetingAreaNameChange(e) {
    this.setState({meetingareaname: e.target.value});
  }

  handleParkingLotNameChange(e) {
    this.setState({parkinglotname: e.target.value});
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

  handleOrgEdit(meetingareaId) {
    this.setState({modalShowEdit : true});
    this.setState({meetingareaid : meetingareaId});
  }

  handleOrgDelete(meetingareaId) {
    this.setState({modalShowDelete : true});
    this.setState({meetingareaid : meetingareaId});
  }

  setSelectedMeetingArea(e) {
    this.setState({
      selectedMeetingArea: e.target.value,
      validationError:
        e.target.value === ""
          ? "You must select a meeting area."
          : ""
    });
  }

   async getUserMeetingAreas() {
    const url = 'meeting-areas/organizations/'+this.state.organizationid;
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
      this.setState({meetingAreas: apiresponse})
    } catch (error) {
      console.error('Error', error);
    } 
   }

   async handleEdit() {
      const url = 'meeting-areas/'+this.state.meetingareaid;
      try {
        const response = await fetch(url, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.meetingareaname, parkingLot: this.state.parkinglotname, organizationId: this.state.organizationid })
        });
        const apiresponse = await response.json();
        console.log(apiresponse);
        this.getUserMeetingAreas();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowEdit: false});
   }

   async handleDelete() {
      const url = 'meeting-areas/'+this.state.meetingareaid;
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
        this.getUserMeetingAreas();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowDelete: false});
   }       
   async handleSave() {
      const url = 'meeting-areas';
      try {
        const response = await fetch(url, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.meetingareaname, parkingLot: this.state.parkinglotname, organizationId: this.state.organizationid })
        });
        const apiresponse = await response.json();
        this.getUserMeetingAreas();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShow: false});
   }
    async componentDidMount() {
     // alert(this.context.varname);
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let foo = params.get('organizationId');
      const url = "meeting-areas/organizations/"+foo
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
        this.setState({meetingAreas: apiresponse});
      } catch (error) {
        console.error('Error', error);
        this.setState({organizationid: null});
      }
  }

 render() {
  return (

        <div className="Home">
      <div className="lander">
        <h1>MeetingAreas <Button size="lg" onClick={this.handleClick} className="button2" variant="outline-dark">Create</Button></h1>
        <br/>
        <CreateMeetingAreaModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleSave.bind(this)}
        handleMeetingAreaNameChange={this.handleMeetingAreaNameChange.bind(this)}
        handleParkingLotNameChange={this.handleParkingLotNameChange.bind(this)}
        />
        <EditMeetingAreaModal
        show={this.state.modalShowEdit}
        onHide={this.handleHideEdit.bind(this)}
        edit={this.handleEdit.bind(this)}
        handleMeetingAreaNameChange={this.handleMeetingAreaNameChange.bind(this)}
        handleParkingLotNameChange={this.handleParkingLotNameChange.bind(this)}
        meetingareaname={this.state.meetingareaname}
        meetingareaid={this.state.meetingareaid}

        />
        <DeleteMeetingAreaModal
        show={this.state.modalShowDelete}
        onHide={this.handleHideDelete.bind(this)}
        delete={this.handleDelete.bind(this)}
        meetingareaname={this.state.meetingareaname}
        meetingareaid={this.state.meetingareaid}
        />        
        <div className="container">
            <div className="card">
              <div className="header">
              </div>
              <div className="content table-responsive table-full-width">
                <table className="table table-striped">
                    <thead>
                      <tr>
                      <th>Name</th>
                      <th>Parking Lot Area</th>
                      <th>Created At</th>
                      <th>Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {this.state.meetingAreas && (
                      <Child data={this.state.meetingAreas} handleOrgEdit={this.handleOrgEdit.bind(this)} handleOrgDelete={this.handleOrgDelete.bind(this)} />
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

export default MeetingAreas;