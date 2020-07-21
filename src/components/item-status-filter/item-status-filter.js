import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All'},
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Done'}
  ]

  render() {
    const { status, onFilter } = this.props;

    const buttons = this.buttons.map(({name, label}) => {
      const isActive = status === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => onFilter(name)}>
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  };
};
