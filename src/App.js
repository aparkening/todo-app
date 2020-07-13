import React, { Component } from 'react';

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }
  
  // Convert listName to due date
  setDueDate = (listName) => {
    let due = listName;

    if (listName) {
      const today = new Date();

      switch (listName) {
        case 'tomorrow':
          due = today.setDate(today.getDay() + 2)
          break;
        case 'thisWeek':
          due = today.setDate(today.getDay() + 7)
          break;
        case 'completed':
          due = "completed"
          break;
        default:
          due = today.setDate(today.getDay() + 1)
          break;
      }
    }
    return due;
  }

  // Add Todo
  addTodo = (newTodo) => {
    // Assign id
    newTodo = {...newTodo, id: Date.now()};

    // Add todo to state
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  // Remove Todo
  deleteTodo = (id) => {
    // Filter all todos except the one to be removed
    const remainingList = this.state.todos.filter(todo => (todo.id !== id));
    // Update state with filter
    this.setState({todos: remainingList});
  }

  // Update Todo
  updateTodo = (id, listName) => {
    // Find index with id
    let idx = this.state.todos.findIndex(item => item.id === id);

    // Update todo
    let updatedTodo = this.state.todos[idx]
    updatedTodo.due = this.setDueDate(listName)

    // Update state
    this.setState({todos: [...this.state.todos.slice(0, idx), updatedTodo, ...this.state.todos.slice(idx + 1)]});
  }

  // Return capitalized readable title based on listName
  displayTitle = (name) => {
    let title;
    switch (name) {
      case 'noDate':
        title = 'No Date'
        break;
      case 'thisWeek':
        title = 'This Week'
        break;
      default:
        title = name.charAt(0).toUpperCase() + name.slice(1)
      break;
    }
    return title;
  }

  // Return filtered todos array
  filterList = (name) => {
    let list;
    const now = new Date();
    const today = now.setDate(now.getDay() + 1)
    const tomorrow = now.setDate(now.getDay() + 2)
    const thisWeek = now.setDate(now.getDay() + 7)
    switch (name) {
      case 'today':
        list = this.state.todos.filter(todo => (todo.due <= today) && (todo.due !== ""));
        break;
      case 'tomorrow':
        list = this.state.todos.filter(todo => (todo.due <= tomorrow) && (todo.due > today));
        break;
      case 'thisWeek':
        list = this.state.todos.filter(todo => (todo.due <= thisWeek) && (todo.due > tomorrow));
        break;
      case 'completed':
        list = this.state.todos.filter(todo => todo.due === "completed");
        break;
      default:
        list = this.state.todos.filter(todo => todo.due === "");
        break;
    }
    return list;
  }

  // Return TodoList components with listName, displayTitle, and filtered todos
  listComponents = () => {
    const lists = ['today', 'tomorrow', 'thisWeek', 'noDate', 'completed'];
    return lists.map(name => <TodoList key={name} listName={name} displayTitle={this.displayTitle(name)} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.filterList(name)} listNames={lists} />);
  }

  render() {
    console.log("App State")
    console.log(this.state)    

    return (
      <div className="container">
        <TodoForm addTodo={this.addTodo}/>
        <div className="lists">
          {this.listComponents()}
        </div>
      </div>
    );
  }
}

export default App;