import React, { Component } from 'react';

// import TodoForm from "./TodoForm";
// import TodoList from "./TodoList";

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
    newTodo = {...newTodo, id: Date.now()}

    // Add todo to state
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  render() {
    // console.log("App State")
    // console.log(this.state)    
    return (
      <div className="container">
        {/* <TodoForm addTodo={this.addTodo}/>
        <TodoList listName="today" updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName="tomorrow" updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName="thisWeek" updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName="noDate" updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName="completed" updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} /> */}
      </div>
    );
  }
}

export default App;