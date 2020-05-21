import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from "react-bootstrap";
import io from 'socket.io-client';
import { useAppContext } from "../libs/contextLib";
const player = require('play-sound')();

let notificationSocket = null;

export class Notification extends Component {
  state = {
    subscribeToSocket: false,
    notifications: [],
  }

  static propTypes = {

  }

  componentDidMount() {
    this.subscribeToSocket();
  }

  componentDidUpdate() {
    this.subscribeToSocket();
  }

  componentWillUnmount() {
    notificationSocket.close();
  }

  subscribeToSocket = () => {
    const { subscribeToSocket, userId } = this.state;

    // if (!subscribeToSocket && userId) {
    if (!subscribeToSocket) {
      notificationSocket = io('http://localhost:5000/notification');
      // notificationSocket.on(`notifications/${userId}`, noty => {
        notificationSocket.on('notifications', noty => {
        this.setState(state => {
          return {
            notifications: [...state.notifications, noty]
          };
        });
        player.play('../media/swiftly.mp3', (err) => {
          if (err) console.log(`Could not play sound: ${err}`);
        });
      });
      this.setState({ subscribeToSocket: true });
    }
  }

  render() {
    const { notifications } = this.state;
    console.log('rendering .....');
    return (
      <div>
        {notifications.map((noty, idx) => <Alert key={idx} bsStyle="danger">{`ALERT ALERT => ${noty}`}</Alert>)}
      </div>
    )
  }
}

export default Notification;
