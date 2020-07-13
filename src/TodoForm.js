import React, { Component } from 'react';

class TodoForm extends Component {
  state = {
    timeFrame: "noDate",
    description: "",
    // due: ""
  }

  // Update state on input change
  handleChange = event => {
    // Darken bg on focus
    // this.textInput.focus();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // // Update timeFrame state
  // handleTimeFrame = event => {
  //   this.setState({ timeFrame: event.target.value })
  // }

  // Send todo submission to App
  handleOnSubmit = event => {
    event.preventDefault();

    // Only send due and description
    // const newTodo = {due: this.state.due, description: this.state.description} 
    const newTodo = {...this.state} 
    this.props.addTodo(newTodo);

    // Reset form description text
    this.setState({ description: "" })
  }

  render() {
    return (
      <div id="newTodo" className={this.state.timeFrame}>
        <form onSubmit={this.handleOnSubmit}>
          <input 
            type="text" 
            name="description" 
            onChange={this.handleChange} 
            value={this.state.description} 
          />
          <select name="timeFrame" value={this.state.timeFrame} onChange={this.handleChange}>
            <option value="">No date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="thisWeek">This Week</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
};

export default TodoForm;