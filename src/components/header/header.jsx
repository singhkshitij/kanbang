import React, { Component } from 'react';
import './header.css';
import firebaseInit from '../auth/firebaseInit';
import { FaPowerOff } from 'react-icons/fa';

export default class Header extends Component {
  logout = () => {
    firebaseInit.auth().signOut();
  };

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <img src="/images/logo.png" alt="Chootu" />
        </div>
        <div className="header-actions">
          <FaPowerOff onClick={() => this.logout()} />
          <div className="add-task" onClick={this.props.setInputState}>
            {!this.props.getInputState() && <span> ADD TASK </span>}
            {this.props.getInputState() && <span> CANCEL </span>}
          </div>
        </div>
      </div>
    );
  }
}
