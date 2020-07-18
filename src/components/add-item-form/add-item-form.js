import React, { Component } from 'react';

import './add-item-form.css';

export default class AddItemForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    let { onAdded } = this.props;

    return (
      <form className="add-item-form d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
               className="form-control"
               onChange={this.onLabelChange}
               placeholder="What needs to be done?"
               value={this.state.label} />

        <button
          className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    );
  };
};
