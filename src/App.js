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
  
  // Add Todo
  addTodo = (newTodo) => {
    // Assign id
    newTodo = {...newTodo, id: Date.now()};

    // Add todo to state
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  // Filter lists

  // Generate list components
  listComponents = () => {
    const lists = ['Today', 'Tomorrow', 'ThisWeek', 'NoDate', 'Completed'];
    return lists.map(name => <TodoList key={name} listName={name} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />);
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