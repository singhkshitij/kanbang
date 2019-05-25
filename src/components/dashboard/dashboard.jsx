import React, { Component } from 'react';
import './dashboard.css';
import Content from '../content/content';
import Header from '../header/header';
import firebaseInit from '../auth/firebaseInit';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isInputOpen: false,
      isDataAvailable: false,
      userDetails: {},
      todo: [],
      inProgress: [],
      done: []
    };
  }

  style = {
    background: 'url("/images/bg.png")',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#ecf0f1',
    overflowX: 'hidden'
  };

  checkIfInitialState = () => {
    return (
      this.state.todo.length === 0 &&
      this.state.inProgress.length === 0 &&
      this.state.done.length === 0
    );
  };

  componentWillMount = () => {
    firebaseInit.auth().onAuthStateChanged(user => {
      this.setState({
        userDetails: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }
      });
      this.getUserData();
    });
  };

  componentDidUpdate(prevState) {
    if (prevState !== this.state && !this.checkIfInitialState()) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    const uid = this.state.userDetails.uid;
    firebaseInit
      .database()
      .ref('/' + uid)
      .set(this.state);
    console.log('DATA SAVED');
  };

  getUserData = () => {
    const uid = this.state.userDetails.uid;
    let ref = firebaseInit.database().ref('/' + uid);
    ref.on('value', snapshot => {
      if (snapshot.val()) {
        const state = snapshot.val();
        this.setState(state);
      } else {
        this.setState({
          isDataAvailable: true
        });
      }
    });
    console.log('DATA RETRIEVED', this.state);
  };

  setInputState = () => {
    if (this.state.isInputOpen) {
      this.setState({
        isInputOpen: false
      });
    } else {
      this.setState({
        isInputOpen: true
      });
    }
  };

  getInputState = () => {
    return this.state.isInputOpen;
  };

  getToDOItems = () => {
    return this.state.todo;
  };

  addToDoItem = item => {
    console.log('New item', item);
    this.setState({
      [item.type]: this.state.todo.concat(item)
    });
  };

  getInProgressItems = () => {
    return this.state.inProgress;
  };

  getDoneItems = () => {
    return this.state.done;
  };

  checkIsDataAvailable = () => {
    return this.state.isDataAvailable;
  };

  updateBackgroundColor = (heading, type, bgcolor) => {
    const updatedArray = this.state[type].map(item => {
      if (item.heading === heading) {
        item.bgcolor = bgcolor;
      }
      return item;
    });
    this.setState({
      [type]: updatedArray
    });
  };

  changeItemCategoryAfterItemDragged = (itemData, newtype) => {
    if (newtype !== itemData.type) {
      this.removeCurrentItem(
        itemData.heading,
        itemData.description,
        itemData.type
      );
    }
    itemData.type = newtype;
    this.setState({
      [newtype]: this.state[newtype].concat(itemData)
    });
  };

  removeCurrentItem = (heading, description, type) => {
    const dataItems = this.state[type];
    this.setState({
      [type]: dataItems.filter(function(item) {
        return item.heading !== heading || item.description !== description;
      })
    });
  };

  render() {
    return (
      <div className="dashboard" style={this.style}>
        <Header
          setInputState={this.setInputState}
          getInputState={this.getInputState}
        />
        <Content
          getInputState={this.getInputState}
          setInputState={this.setInputState}
          getToDOItems={this.getToDOItems}
          addToDoItem={this.addToDoItem}
          getInProgressItems={this.getInProgressItems}
          getDoneItems={this.getDoneItems}
          removeCurrentItem={this.removeCurrentItem}
          checkIsDataAvailable={this.checkIsDataAvailable}
          changeItemCategoryAfterItemDragged={
            this.changeItemCategoryAfterItemDragged
          }
          updateBackgroundColor={this.updateBackgroundColor}
        />
      </div>
    );
  }
}
