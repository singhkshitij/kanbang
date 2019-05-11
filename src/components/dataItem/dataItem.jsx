import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Collapsible from 'react-collapsible';
import './dataItem.css';
import { GithubPicker } from 'react-color';
import { IoMdHeart } from 'react-icons/io';
import Moment from 'react-moment';

export default class DataItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.heading || '',
      description: props.description || '',
      type: props.type || 'none',
      bgcolor: props.bgcolor || '#3498db',
      displayColorPicker: false,
      creationDate: props.creationDate || '1976-04-19T12:59-0500'
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleChange = color => {
    this.setState({ bgcolor: color.hex, displayColorPicker: false });
    this.props.updateBackgroundColor(
      this.state.heading,
      this.state.type,
      color.hex
    );
  };

  componentDidUpdate = () => {
    ReactDOM.findDOMNode(this.refs.collapsibleElement).getElementsByClassName(
      'Collapsible__trigger'
    )[0].style = 'background : ' + this.state.bgcolor;
  };

  componentDidMount = () => {
    ReactDOM.findDOMNode(this.refs.collapsibleElement).getElementsByClassName(
      'Collapsible__trigger'
    )[0].style = 'background : ' + this.state.bgcolor;
  };

  toggleColorPicker = () => {
    const popover = {
      position: 'absolute',
      zIndex: '2'
    };
    const cover = {
      position: 'fixed',
      top: '10px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    };

    return this.state.displayColorPicker ? (
      <div style={popover}>
        <div style={cover} />
        <GithubPicker
          onChange={this.handleChange}
          colors={[
            '#1abc9c',
            '#3498db',
            '#9b59b6',
            '#34495e',
            '#e67e22',
            '#e74c3c',
            '#95a5a6',
            '#2ecc71',
            '#f39c12',
            '#8e44ad',
            '#131418',
            '#007ee5',
            '#b92b27',
            '#cd201f',
            '#FBC02D',
            '#6D4C41'
          ]}
        />
      </div>
    ) : null;
  };

  getCreationDate = () => {
    return <Moment fromNow>{this.state.creationDate}</Moment>;
  };

  render() {
    return (
      <div
        draggable
        onDragStart={event =>
          this.props.onDragStartComponent(event, this.state)
        }>
        <Collapsible
          ref="collapsibleElement"
          trigger={this.state.heading}
          transitionTime={200}
          className="single-item">
          <p>{this.state.description}</p>
          <div className="item-actions">
            <div className="color-picker">
              <IoMdHeart
                style={{ color: this.state.bgcolor }}
                onClick={this.handleClick}
              />
              {this.toggleColorPicker()}
            </div>
            <div className="info-item">
              <span
                className="remove-item"
                onClick={() =>
                  this.props.removeCurrentItem(
                    this.state.heading,
                    this.state.description,
                    this.state.type
                  )
                }>
                REMOVE
              </span>
              <span className="date-item" style={{ color: this.state.bgcolor }}>
                {this.getCreationDate()}
              </span>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }
}
