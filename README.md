# Hackathon: In case of emergency

Whenever there is an incident at work regarding emergency services, people tend to be confused as to what they should be doing, who they should be contacting and what their responsibilities are when an emergency arises.

The ICE app provides information on what to do and who to contact, alerting during emergencies, and a checkin fucntionality to indicate you are safe.


# Installation

## Development
Install node.js

```bash
cd app && npm install
cd client && npm install
cd ..
touch .env
echo "<mongodb connection string>" >> .env
npm run dev
```

Where `"<mongodb connection string>"` is `"DB = 'mongodb+srv://\<username>:\<password>@\<hostname>/ice-app?retryWrites=true&w=majority'"`

Navigate to http://localhost:3000/ in your browser.

## Production
Currently running on a one click install MERN stack via AWS lightsail.

# Design process

Please see this [README.md](documentation/README.md)
