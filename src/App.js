import React, { Component } from 'react';
import LoginPage from './components/loginPage/loginPage';
import './App.css';
import firebase from 'firebase';
import firebaseInit from './components/auth/firebaseInit';
import Dashboard from './components/dashboard/dashboard';
import ReactLoading from 'react-loading';

class App extends Component {
  state = {
    user: {},
    isPageLoaded: false
  };
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentWillMount = () => {
    firebaseInit.auth().onAuthStateChanged(user => {
      this.setState({
        user: !!user,
        isPageLoaded: true
      });
    });
  };

  validateUserAndServePage = () => {
    if (this.state.isPageLoaded) {
      return <Dashboard />;
    } else {
      return (
        <div className="page-loading-indicator">
          <ReactLoading
            type={'spin'}
            color={'#3498db'}
            height={'50%'}
            width={'50%'}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          this.validateUserAndServePage()
        ) : (
          <LoginPage uiConfig={this.uiConfig} />
        )}
      </div>
    );
  }
}

export default App;
