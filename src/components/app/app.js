import React, { Component } from 'react';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import AddItemForm from '../add-item-form'

import './app.css'

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    status: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  search(items, term) {
    if (term === '') {
      return items;
    }

    return items.filter((el) => el.label.toLowerCase().includes(term.toLowerCase()));
  };

  filter(items, status) {
    switch(status) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    };
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      };
    });
  };

  onSearch = (term) => {
    this.setState({ term });
  }

  onFilter = (status) => {
    this.setState({ status });
  }

  render() {
    const { todoData, term, status } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleData = this.filter(this.search(todoData, term), status);

    return (
      <div className="todo-app">
        <AppHeader
          todo={todoCount}
          done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearch={this.onSearch}/>
          <ItemStatusFilter
            status={status}
            onFilter={this.onFilter}/>
        </div>

        <TodoList
          todos={visibleData}
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />

        <AddItemForm
          onAdded={ this.addItem } />
      </div>
    );
  };
};
