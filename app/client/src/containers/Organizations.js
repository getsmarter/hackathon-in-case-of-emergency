import React from "react";
import "./Organizations.css";
import { Button} from "react-bootstrap";
import CreateOrganizationModal from "../components/CreateOrganizationModal";
import EditOrganizationModal from "../components/EditOrganizationModal";
import DeleteOrganizationModal from "../components/DeleteOrganizationModal";
import { Auth } from "aws-amplify";
import { Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export class Child extends React.Component {
    click = (orgid) => {
        this.props.handleOrgEdit(orgid);
    }

    clickDelete = (orgid) => {
        this.props.handleOrgDelete(orgid);
    }

    clickTeams = (orgid) => {
        this.props.handleTeams(orgid);
    }

    render() {
      return this.props.data.map((organization) => 
        <tr key={organization._id}>
          <td>{organization.name}</td>
          <td><a className="btn btn-success" href={"teams?organizationId=" + organization._id} > View</a></td>
          <td><a className="btn btn-success" href={"meetingareas?organizationId=" + organization._id} > View</a></td>
          <td><a className="btn btn-success" href={"incidents?organizationId=" + organization._id} > View</a></td>
          <td>{organization.createdAt}</td>
          <td><button className="btn btn-warning" onClick={() => this.click(organization._id)} organizationid={organization._id}> Edit</button> <button className="btn btn-danger" onClick={() => this.clickDelete(organization._id)} organizationid={organization._id}>Delete</button></td>
        </tr>
      )
    }
}

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {modalShowEdit : false};
    this.state = {organizationname : ''};
    this.handleClick = this.handleClick.bind(this);
    this.state = {userid : null};
    this.state = {organizationid : null};
    this.file = React.createRef(null);
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

  handleHideEdit() {
    this.setState({modalShowEdit: false});
  }

  handleHideDelete() {
    this.setState({modalShowDelete: false});
  }  

  handleOrgEdit(orgId) {
    this.setState({modalShowEdit : true});
    this.setState({organizationid : orgId});
  }

  handleOrgDelete(orgId) {
    this.setState({modalShowDelete : true});
    this.setState({organizationid : orgId});
  }

  handleTeams(orgId) {
      this.navigation.navigate('Wherever you want to navigate')
  }

  handleFileChange(event) {
    
    this.file.current = event.target.files[0];
  }

   async getUserOrganizations() {
    const url = 'organizations?userId='+this.state.userid;
    try {
      const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const apiresponse = await response.json();
      this.setState({organizations: apiresponse});
    } catch (error) {
      console.error('Error', error);
    } 
   }

   async handleEdit() {
      const url = 'organizations/'+this.state.organizationid;
      try {
        const response = await fetch(url, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.organizationname})
        });
        const apiresponse = await response.json();
        this.getUserOrganizations();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowEdit: false});
   }

   async handleDelete() {
      const url = 'organizations/'+this.state.organizationid;
      try {
        const response = await fetch(url, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const apiresponse = await response.json();

        this.getUserOrganizations();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowDelete: false});
   }       

   async handleSave() {

        if (!this.file.current) {
          alert(
            `Please upload image.`
          );
          return;
        }
      const url = 'organizations?userId='+this.state.userid;
      try {
        const response = await fetch(url, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.organizationname})
        });
        const apiresponse = await response.json();
        const filename = apiresponse._id;
            try {
              const attachment = this.file.current ? await s3Upload(this.file.current, filename) : null;
            } catch (e) {

            }

        this.getUserOrganizations();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShow: false});
   }

    async componentDidMount() {
     // alert(this.context.varname);
      var user = await Auth.currentUserInfo();
      const url = 'users?email='+user.attributes.email;
      try {
        const response = await fetch(url, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const apiresponse = await response.json();

        this.setState({userid: apiresponse[0]._id});
        this.getUserOrganizations();
      } catch (error) {
        console.error('Error', error);
        this.setState({userid: null});
      }
  }

 render() {
  return (

  	    <div className="Home">
      <div className="lander">
        <h1>Organizations <Button size="lg" onClick={this.handleClick} className="btn btn-info btn-fill btn-wd" variant="outline-dark">Create</Button></h1>
        <br/>
        <CreateOrganizationModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleSave.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        organizationname={this.state.organizationname}
        handleFileChange={this.handleFileChange.bind(this)}
        />
        <EditOrganizationModal
        show={this.state.modalShowEdit}
        onHide={this.handleHideEdit.bind(this)}
        edit={this.handleEdit.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        organizationname={this.state.organizationname}
        organizationid={this.state.organizationid}
        />
        <DeleteOrganizationModal
        show={this.state.modalShowDelete}
        onHide={this.handleHideDelete.bind(this)}
        delete={this.handleDelete.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        organizationname={this.state.organizationname}
        organizationid={this.state.organizationid}
        />        
        <div className="container">
            <div className="card">
              <div className="header">
              </div>
              <div className="content table-responsive table-full-width">
                <table className="table table-striped">
                    <thead>
                      <tr><th>Name</th>
                      <th>Teams</th>
                      <th>Meeting Areas</th>
                      <th>Incidents</th>
                      <th>Created At</th>
                      <th>Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {this.state.organizations && (
                      <Child data={this.state.organizations} handleOrgEdit={this.handleOrgEdit.bind(this)} handleOrgDelete={this.handleOrgDelete.bind(this)} handleTeams={this.handleTeams.bind(this)} />
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

export default Organizations;