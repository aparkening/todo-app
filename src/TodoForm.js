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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Send todo submission to App
  handleOnSubmit = event => {
    event.preventDefault();
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
          <Col className="description" xs={12} md={7} lg={8}>
            <Form.Label className="sr-only">Todo:</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              onChange={this.handleChange} 
              value={this.state.description} 
              placeholder="What do you need to get done?"
              required
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <Form.Label className="sr-only">Select Timeframe</Form.Label>
            <Form.Control 
              as="select" 
              className="time-frame" 
              name="timeFrame" 
              value={this.state.timeFrame} 
              onChange={this.handleChange}
            >
              <option value="noDate">No Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="thisWeek">This Week</option>
            </Form.Control>
          </Col>
          <Col className="last">
            <Button type="submit" className="add-todo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path className="plus-circle" d="M43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24Z" stroke="white"/>
                <path className="plus" d="M24 16V32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path className="plus" d="M16 24H32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="sr-only">Add Todo</span>
            </Button>
          </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

export default TodoForm;