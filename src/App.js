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

  // Generate list components
  listComponents = () => {
    const lists = ['today', 'tomorrow', 'thisWeek', 'noDate', 'completed'];
    return lists.map(name => <TodoList key={name} listName={name} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />);
  }

  render() {
    console.log("App State")
    console.log(this.state)    

    return (
      <div className="container">
        <TodoForm addTodo={this.addTodo}/>
        {this.listComponents()}
        {/* 
        <TodoList listName={lists[0]} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName={lists[1]} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName={lists[2]} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName={lists[3]} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <TodoList listName={lists[4]} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} /> 
        */}
      </div>
    );
  }
}

export default App;