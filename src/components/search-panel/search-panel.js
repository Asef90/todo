import React, { Component } from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

  state = {
    term: ''
  }

  onTermChange = (e) => {
    const term = e.target.value
    const { onSearch } = this.props;

    this.setState({
      term: e.target.value
    })

    onSearch(term);
  };

  render () {
    return <input type="text"
                  placeholder='search'
                  className="form-control search-input"
                  onChange={this.onTermChange}
                  value={this.state.term} />;
  };
};
