import React, { Component } from 'react';

class TodoForm extends Component {
  state = {
    timeFrame: "",
    description: "",
    due: ""
  }

  // Update state on input change
  handleChange = event => {
    // Darken bg on focus
    // this.textInput.focus();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Set date based from timeframe selection
  handleTimeFrame = event => {
    let due = event.target.value

    if (event.target.value) {
      const today = new Date();

      switch (event.target.value) {
        case 'tomorrow':
          due = today.setDate(today.getDay() + 2)
          break;
        case 'thisWeek':
          due = today.setDate(today.getDay() + 7)
          break;
        default:
          due = today.setDate(today.getDay() + 1)
          break;
      }
    }
    this.setState({
      timeFrame: event.target.value,
      due: due
    })
  }

  // Send todo submission to App
  handleOnSubmit = event => {
    event.preventDefault();

    // Only send due and description
    const newTodo = {due: this.state.due, description: this.state.description} 
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
          <select name="timeFrame" value={this.state.timeFrame} onChange={this.handleTimeFrame}>
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