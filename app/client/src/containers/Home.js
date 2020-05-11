import React from "react";
import { Button} from "react-bootstrap";
import CreateAlertModal from "../components/CreateAlertModal";
import { Auth } from "aws-amplify";
import { Storage } from "aws-amplify";

export class OrgAlertsChild extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.organizationalerts = [];
    this.organizationmemcount = 0;
    this.state = {
    	organizationmemcount: 0
  	};
  	this.state = {
    	organizationbackground: ''
  	};
  }


  closeAlert = (alertid) => {
    this.props.closeAlert(alertid);
  }

  async componentDidMount() {
    const url = 'alerts/organizations/'+this.props.organizationid;
    try {
      const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const apiresponse = await response.json();
      if (apiresponse && apiresponse.length) {
     	this.organizationalerts = apiresponse;
	  }
    } catch (error) {
      console.error('Error', error);
    }

	  const urlorgusers = 'organizations/'+this.props.organizationid+'/users';
	    try {
	      const response = await fetch(urlorgusers, 
	      {
	        method: 'GET',
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      });
	    const apiresponse = await response.json();
  		this.setState({ organizationmemcount: apiresponse.length });

	    } catch (error) {
	      console.error('Error', error);
	    }
   }
  
     render() {
    	
      return this.organizationalerts.map((alert) =>
		<div key={alert._id} className="col-md-4 col-sm-12"><div className="card card-user">
                            <div className="image">
                                <img src="https://2u.com/static/552d9fb8091d67ace4078627cef00b06/9ccf4/2u-logo.png" alt="..."/>
                            </div>
                            <div className="content">
                                <div className="author">
                                  <h4 className="title">{alert.name}<br/>
                                     <a href="#">{this.props.organizationname}</a>
                                  </h4>
                                </div>
                                <p className="description text-center">
									{alert.message}
                                </p>
                                <p className="description text-center">
									<Button size="lg" onClick={this.closeAlert(alert._id)} className="btn btn-sm btn-success btn-icon" variant="outline-dark">Close</Button>
                                </p>
                            </div>
                            <hr/>
                            <div className="text-center">
                                <div className="row">
                                    <div className="col-md-3 col-md-offset-1">
									  {(() => {
								        if (alert._closedAt) {
								          return (
								            <div> <h5>Closed<br/><small>Status</small></h5></div>
								          )
								        }else {
								          return (
								             <div> <h5>Open<br/><small>Status</small></h5></div>
								          )
								        }
								      })()}
                                    </div>
                                    <div className="col-md-4">
                                        <h5>{this.state.organizationmemcount}<br/><small>Members</small></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>0<br/><small>Safe</small></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>	
      )
    }
}

export class OrgChild extends React.Component {
	constructor(props) {
    	super(props);
    	this.props = props;

      this.closeAlert = this.closeAlert.bind(this);
  	}	
    click = (orgid) => {
        this.props.handleOrgEdit(orgid);
    }

    clickDelete = (orgid) => {
        this.props.handleOrgDelete(orgid);
    }

    closeAlert = (e) => {
    	this.props.closeAlert(e);
    }

    render() {
      return this.props.data.map((org) =>
      <div key={org._id}>
		<OrgAlertsChild alertidtoclose={this.closeAlert} closeAlert={() => this.closeAlert} organizationusers={this.organizationusers} organizationname={org.name} organizationid={org._id}/>
	  </div>	
      )
    }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalShow : false};
    this.state = {modalShowEdit : false};
    this.state = {alertname : ''};
    this.handleClick = this.handleClick.bind(this);
    this.state = {userid : null};
    this.state = {alertid : null};
    this.state = {alertidtoclose : null};
    this.state = {organizations : []}
    this.state = {organizationsselect : []}
  }

  handleOrgNameChange(e) {
    this.setState({alertname: e.target.value});
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
    this.setState({alertid : orgId});
  }

  handleOrgDelete(orgId) {
    this.setState({modalShowDelete : true});
    this.setState({alertid : orgId});
  }

  handleTeams(orgId) {
      this.navigation.navigate('Wherever you want to navigate')
  }

  closeAlert = (alertid) => {
    alert(alertid);
  }

  handleAlertNameChange(e){
    this.setState({alertname: e.target.value});
  }

  handleAlertMessageChange(e) {
    this.setState({alertmessage: e.target.value});
  }

  handleOrganizationSelectChange = (e) => {
    this.setState({
      selectedOrganization: e.target.value,
      validationError:
        e.target.value === ""
          ? "You must select an organization."
          : ""
    });
  }

   async getUserHome() {
    const url = 'alerts?userId='+this.state.userid;
    try {
      const response = await fetch(url, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const apiresponse = await response.json();
      
      this.setState({alerts: apiresponse})
    } catch (error) {
      console.error('Error', error);
    } 
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
      this.setState({organizations: apiresponse})
      this.getUserHome();
      let organizationsFromApi = apiresponse.map(organizations => {
          return { value: organizations._id, display: organizations.name };
      });
      this.setState({
          organizationsselect: [
            {
              value: "",
              display:
                "(Select organization)"
            }
          ].concat(organizationsFromApi)
        });
    } catch (error) {
      console.error('Error', error);
    } 
   }

   async handleEdit() {
      const url = 'alerts/'+this.state.alertid;
      try {
        const response = await fetch(url, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.alertname})
        });
        const apiresponse = await response.json();
        this.getUserHome();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowEdit: false});
   }

   async handleDelete() {
      const url = 'alerts/'+this.state.alertid;
      try {
        const response = await fetch(url, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const apiresponse = await response.json();
        this.getUserHome();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShowDelete: false});
   }       

   async handleSave() {
      const url = 'alerts?userId='+this.state.userid;
      try {
        const response = await fetch(url, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.alertname})
        });
        const apiresponse = await response.json();
        this.getUserHome();
      } catch (error) {
        console.error('Error', error);
      }
      this.setState({modalShow: false});
   }

   async handleAlertSave() {
      const url = 'alerts';
      try {
        const response = await fetch(url, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.state.alertname, message: this.state.alertmessage, userid: this.state.userid, organizationid: this.state.selectedOrganization})
        });
        const apiresponse = await response.json();
        this.getUserHome();
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
        <h1>Alerts <Button size="lg" onClick={this.handleClick} className="btn btn-info btn-fill btn-wd" variant="outline-dark">Create</Button></h1>
        <br/>
        <CreateAlertModal
        show={this.state.modalShow}
        onHide={this.handleHide.bind(this)}
        save={this.handleAlertSave.bind(this)}
        handleOrgNameChange={this.handleOrgNameChange.bind(this)}
        alertname={this.state.alertname}
        alertmessage={this.state.alertmessage}
        organizationsselect={this.state.organizationsselect}
        selectedOrganization={this.state.selectedOrganization}
        handleAlertNameChange={this.handleAlertNameChange.bind(this)}
        handleAlertMessageChange={this.handleAlertMessageChange.bind(this)}
        validationError={this.validationError}
        handleOrganizationSelectChange={this.handleOrganizationSelectChange}
        />     
        <div className="container">
              <div className="content table-responsive table-full-width">
                    {this.state.organizations && (
                      <OrgChild data={this.state.organizations} closeAlert={this.closeAlert.bind(this)} alertidtoclose={this.state.alertidtoclose} />
                    )}
            </div>
          </div>
        </div>
      </div>
  );
}
}

export default Home;