import React, { Component } from 'react';
import './loginPage.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseInit from '../auth/firebaseInit';

export default class LoginPage extends Component {
  constructor(props) {
    super();
    this.state = { uiConfig: props.uiConfig };
  }

  style = {
    background: 'url("/images/login-background.jpg") center center no-repeat',
    backgroundSize: 'cover'
  };

  render() {
    return (
      <div className="login-page" style={this.style}>
        <div className="login-form">
          <img src="/images/logo.png" alt="Kanbang" className="login-logo" />
          <h2 className="login-form-title">ACCOUNT LOGIN</h2>
          <div className="form-block">
            <StyledFirebaseAuth
              uiConfig={this.state.uiConfig}
              firebaseAuth={firebaseInit.auth()}
            />
          </div>
        </div>
      </div>
    );
  }
}
