# Planning

Whenever there is an incident at work regarding emergency services, people tend to be confused as to what they should be doing, who they should be contacting and what their responsibilities are when an emergency arises.

We’ve had scenarios where the fire alarm goes off and people are not sure if it’s a drill, if it’s a false alarm or if it’s an actual fire.


## What we could solve:
1. Alerting, based on a situation that is happening (fire alarms etc) (real time notifications).
1. Information during an “emergency” event: Where to meet up, checkin if you are safe, or are at home, or at DH/WQ and not in the office. Who your point of contact is during an emergency.
1. First aider information (who is avail in the office for the day)
1. Fire representatives.
1. Emergency contacts: police, ambulance etc.
1. Incident occurs: roof collapses, dripping of pipes, (alerts Crew)


## Tech stack:
1. Backend: node.js using express
1. Frontend: React
1. Database: mongoDB (potentially DocumentDB)

## Devision of labour:
1. Backend: [Ife Ologbese](https://github.com/iologbese2u) & [Kurvin Hendricks](https://github.com/kurvinh)
1. Frontend: [Rumano Balie](https://github.com/rumanod)
1. Infrastructure & Documentation: [Adam Healy](https://github.com/adamhealy)

# Design
## User Stories:
1. As a visitor I should be able to sign up to the application
1. As a visitor I should be able to login to the application
1. As a user I should be able to create an organization
1. As an admin User I should be able to invite people to join my organization
1. As an invitee I should be able to click the invite link and sign up to belong to an organization
1. As an admin I should be able to assign roles to users
1. As an admin I should be able to create teams for my organization
1. As an admin I should be able to edit/update teams for my organization
1. As an admin I should be able to create a meeting area for my organization
1. As an admin I should be able to edit a meeting area for my organization
1. As an admin I should be able to assign meeting areas to a team
1. As a admin of an organization I should be able to create an incident for an organization
1. As a admin of an organization I should be able to update an incident for an organization
1. As a admin of an organization I should be able to delete an incident for an organization
1. As a user I should be able to create an alert for an organization
1. As a user I should be able to check in to a meeting area, or specify if i'm out of office for an alert
1. As an admin I should be able to end an alert for an organization
1. As a user I should receive a notification for an alert
1. As an admin I should be able to create emergency contacts
1. As an admin, I should be able to create crew members


## Requirements:

### Story 1:
* Front-end:
  * Link to signup / signup
  * Signup form - capture and validate user credentials
  * Check if organization id is present in url
* Back-end:
  * Api /users/signup : receive user signup payload and create a new user account, add usee to organization if org id is present.

### Story 2: 
* Front-end:
  * Link to signin /signin
  * Sign in form - Capture username, password and validate.
* Back-end:
  * Api /users/signin : receive user signin payload and create a new user account (Auth: jwt)

### Story 3: 
* Front-end:
  * Link to create organization: /organizations/new
  * New organization form - Capture organization details
* Back-end:
  * Api [post] /organizations : receive organization payload and create it.

### Story 4: 
* Front-end:
  * Link to invite to organization: /organizations/invite
  * Provide sharable link to join organization Copy button that copies link with organization id
* Back-end:
  * N/A

### Story 5:
* Handled in 1 & 4

### Story 6: 
* Front-end:
  * Link to display all users in organizations /organizations/{id}/users
  * Radio button: on: admin, off: normal user.
* Back-end:
  * Api /organizations/{id}/users [get]
  * Api /organizations/make-admin [post]
    * Payload org_id, userid, true/false

### Story 8/11: 
* Front-end:
  * Link to display teams (no teams, create new team button.), add new team (modal). For each team edit button, opens modal to edit.  /organizations/{id}/teams
* Back-end:
  * Api /organizations/teams/{id} [put]
    * Payload: org_id, team name, meeting area

### Story 9/10: 
* Front-end:
  * Link to display meeting areas (no areas, create new button) add new meeting area (moda). For each meeting area, edit button opens modal to edit.  /organizations/{id}/meeting-areas
* Back-end:
  * Api /organizations/{id}/meeting-areas [get]
  * Api /organizations/meeting-areas [post]
    * Payload: meeting-area name
  * Api /organizations/meeting-areas/{id} [put]

### Story 12: 
* Front-end:
  * Link to create an incident /organization/{id}/incidents
    * Form to enter name and level
* Back-end:
  * Api /organizations/incidents [post]
    * Payload: org id, name, level

### Story 13: 
* Front-end:
  * Link to show incidents /organization/{id}/incidents
    * Click edit button, modal opens for editing.
* Back-end:
  * Api /organizations/{id}/incidents{id} [put]
    * Payload: name, level

### Story 14: 
* Front-end:
  * Link to show incidents /organization/{id}/incidents
    * Click delete button, modal with confirmations
* Back-end:
  * Api: /organizations{id}/incidents/{id} [delete]

### Story 15: 
* Front-end:
  * Link to show Current (ongoing) alerts, with a create new alert button. /organizations/{id}/alerts
    * Click create, modal asking: incident type, message
* Back-end:
  * Api /organizations/{id}/alerts [get]
  * Api: /organizations/alerts [post]
    * Payload: org_id, user_id, incident_id, message

### Story 16: 
* Front-end:
  * Link to show Current (ongoing) alerts, with a create new alert button. /organizations/{id}/alerts
    * Click checkin, modal asking: Safe at designated meeting area, Out of office, other [message]
* Back-end:
  * Api: /organizations/alerts/checkin [post]
    * Payload: org_id, user_id, enum status

### Story 17: 
* Front-end:
  * Link to show Current (ongoing) alerts, with an end alert button. /organizations/{id}/alerts
    * Click end, modal for confirmation
* Back-end:
  * Api: /organizations/{id}/alerts/{id}/end [put]

### Story 18: 
* Front-end:
  * Users will subscribe to a channel notifications/{user_id} (socket io client)
  * on receiving a notification object from the socket subscription, based on the alert incident level, a notification banner and sound will be triggered on the front to display and 

### Story 19: 
* Front-end:
  * Link to display emergency contacts (no ec’s, create new ec button.), add new ec (modal). /organizations/{id}/emergency-contacts
* Back-end:
  * Api /organizations/{id}/emergency-contacts [get]
  * Api /organizations/emergency-contacts [post]
    * Payload: org_id, userid

### Story 20: 
* Front-end:
  * Link to display crew members (no cm’s, create new cm button.), add new cm (modal). /organizations/{id}/crew-members
* Back-end:
  * Api /organizations/{id}/crew-members [get]
  * Api /organizations/crew-members[post]
    * Payload: org_id, userid
