import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Organizations from "./containers/Organizations";
import Teams from "./containers/Teams";
import MeetingAreas from "./containers/MeetingAreas";
import NewAlert from "./containers/NewAlert";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/">
        <Home />
      </AuthenticatedRoute>
	  <UnauthenticatedRoute exact path="/signin">
	    <Signin />
	  </UnauthenticatedRoute>
	  <UnauthenticatedRoute exact path="/signup">
	   <Signup />
	  </UnauthenticatedRoute>
	  <AuthenticatedRoute exact path="/organizations">
	   <Organizations />
	  </AuthenticatedRoute>
	  <AuthenticatedRoute exact path="/teams">
	   <Teams />
	  </AuthenticatedRoute> 
	  <AuthenticatedRoute exact path="/meetingareas">
	   <MeetingAreas />
	  </AuthenticatedRoute>	 	  
	  <AuthenticatedRoute exact path="/newalert">
	   <NewAlert />
	  </AuthenticatedRoute>	
      {/* Finally, catch all unmatched routes */}
      <Route>
		<NotFound />
	  </Route>
    </Switch>
  );
}