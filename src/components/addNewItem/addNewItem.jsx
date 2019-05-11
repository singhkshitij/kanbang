import React, { Component } from 'react';
import {
  Form,
  TextField,
  SubmitField,
  TextareaField
} from 'react-components-form';
import './addNewItem.css';

export default class AddNewItem extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }

  addNewItemToList = model => {
    if (model.heading && model.description) {
      this.props.addToDoItem({
        heading: model.heading,
        description: model.description,
        type: 'todo',
        bgcolor: '#3498db',
        creationDate: JSON.parse(JSON.stringify(new Date()))
      });
      this.props.setInputState();
    } else {
      this.setState({
        error: 'Please fill all the fields !'
      });
    }
  };

  render() {
    return (
      <div className="add-new-item">
        <h4 className="form-title">ADD NEW TASK</h4>
        <Form onSubmit={this.addNewItemToList} className="new-item-form">
          <TextField
            name="heading"
            label="Title :"
            type="text"
            className="item-textfield"
          />
          <TextareaField
            name="description"
            label="Description :"
            type="text"
            className="item-textfield"
          />
          <SubmitField value="Submit" />
          <span className="form-error">{this.state.error}</span>
        </Form>
      </div>
    );
  }
}
