import React, { Component } from 'react';
import './content.css';
import DataItem from '../dataItem/dataItem';
import AddNewItem from '../addNewItem/addNewItem';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default class Content extends Component {
  renderDataItems = dataArray => {
    let elements = [];
    dataArray.forEach(element => {
      elements.push(this.renderDataItem(element));
    });
    return elements;
  };

  onDragStartComponent = (event, data) => {
    event.dataTransfer.setData('heading', data.heading);
    event.dataTransfer.setData('description', data.description);
    event.dataTransfer.setData('type', data.type);
    event.dataTransfer.setData('bgcolor', data.bgcolor);
    event.dataTransfer.setData('creationDate', data.creationDate);
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDragDrop = (event, newCategory) => {
    const itemData = {
      heading: event.dataTransfer.getData('heading'),
      description: event.dataTransfer.getData('description'),
      type: event.dataTransfer.getData('type'),
      bgcolor: event.dataTransfer.getData('bgcolor'),
      creationDate: event.dataTransfer.getData('creationDate')
    };
    if (itemData.type !== newCategory) {
      this.props.changeItemCategoryAfterItemDragged(itemData, newCategory);
    }
  };

  renderDataItem = item => {
    return (
      <DataItem
        heading={item.heading}
        description={item.description}
        type={item.type}
        key={item.heading}
        bgcolor={item.bgcolor}
        creationDate={item.creationDate}
        removeCurrentItem={this.props.removeCurrentItem}
        onDragStartComponent={this.onDragStartComponent}
        updateBackgroundColor={this.props.updateBackgroundColor}
      />
    );
  };

  renderSkeletonItem = numberOfItems => {
    return (
      <SkeletonTheme color="#E0F2F1" highlightColor="#FAFAFA">
        <p>
          <Skeleton count={numberOfItems} height={40} />
        </p>
      </SkeletonTheme>
    );
  };

  render() {
    return (
      <div className="content">
        <div
          className="todo"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDragDrop(e, 'todo');
          }}>
          <table>
            <tbody>
              <tr>
                <th className="action-header">
                  TODO / {this.props.getToDOItems().length}
                </th>
              </tr>
              <tr className="draggable">
                {this.props.getInputState() && (
                  <AddNewItem
                    setInputState={this.props.setInputState}
                    addToDoItem={this.props.addToDoItem}
                  />
                )}
                {!this.props.checkIsDataAvailable()
                  ? this.renderSkeletonItem(8)
                  : this.renderDataItems(this.props.getToDOItems())}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="in-progress"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDragDrop(e, 'inProgress');
          }}>
          <table>
            <tbody>
              <tr>
                <th className="action-header">
                  IN PROGRESS / {this.props.getInProgressItems().length}
                </th>
              </tr>
              <tr className="draggable">
                {!this.props.checkIsDataAvailable()
                  ? this.renderSkeletonItem(10)
                  : this.renderDataItems(this.props.getInProgressItems())}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="done"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDragDrop(e, 'done');
          }}>
          <table>
            <tbody>
              <tr>
                <th className="action-header">
                  DONE / {this.props.getDoneItems().length}
                </th>
              </tr>
              <tr className="draggable">
                {!this.props.checkIsDataAvailable()
                  ? this.renderSkeletonItem(5)
                  : this.renderDataItems(this.props.getDoneItems())}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
