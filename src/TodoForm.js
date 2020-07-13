import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class TodoForm extends Component {
  state = {
    timeFrame: "noDate",
    description: ""
  }

  // Update state on input change
  handleChange = event => {
    // Darken bg on focus
    // this.textInput.focus();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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
        <Form onSubmit={this.handleOnSubmit}>
          <Row>
          {/* <input 
            type="text" 
            name="description" 
            onChange={this.handleChange} 
            value={this.state.description} 
            placeholder="What do you need to get done?"
          /> 
          */}
          <Col className="description" xs={7}>
            <Form.Label className="invisible">Todo:</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              onChange={this.handleChange} 
              value={this.state.description} 
              placeholder="What do you need to get done?"
              required
            />
          </Col>

          <Col xs={3}>
            <Form.Label className="invisible">Select Timeframe</Form.Label>
            <Form.Control as="select" name="timeFrame" value={this.state.timeFrame} onChange={this.handleChange}>
              <option value="">No date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="thisWeek">This Week</option>
            </Form.Control>
          </Col>


          {/* <select name="timeFrame" value={this.state.timeFrame} onChange={this.handleChange}>
            <option value="">No date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="thisWeek">This Week</option> 
          </select>*/}
          {/* <input type="submit" /> */}
          <Col>
            <Button type="submit">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="plus-circle" d="M43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24Z" stroke="white"/>
            <path className="plus" d="M24 16V32" classstroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="plus" d="M16 24H32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </Button>
          </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

export default TodoForm;