import React, { Component } from 'react';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


//   margin-bottom: 3.5rem;


class TaskForm extends Component {
  state = {
    listId: "list-no",
    content: ""
  }

  // Update state on input change
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Send task submission to App
  handleOnSubmit = event => {
    event.preventDefault();
    const newTask = {...this.state} 
    this.props.addTask(newTask);

    // Reset form content text
    this.setState({ content: "" })
  }

  render() {
    return (
      <div id="newTask" className={this.state.timeFrame}>
        <Form onSubmit={this.handleOnSubmit}>
          <Row>
          <Col className="description" xs={12} md={7} lg={8}>
            <Form.Label className="sr-only">Task:</Form.Label>
            <Form.Control 
              type="text" 
              name="content" 
              onChange={this.handleChange} 
              value={this.state.content} 
              placeholder="What do you need to get done?"
              required
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <Form.Label className="sr-only">Select Timeframe</Form.Label>
            <Form.Control 
              as="select" 
              className="time-frame" 
              name="listId" 
              value={this.state.listId} 
              onChange={this.handleChange}
            >
              <option value="list-no">No Date</option>
              <option value="list-today">Today</option>
              <option value="list-tomorrow">Tomorrow</option>
              <option value="list-week">This Week</option>
            </Form.Control>
          </Col>
          <Col className="last">
            <Button type="submit" className="add-task">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path className="plus-circle" d="M43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24Z" stroke="white"/>
                <path className="plus" d="M24 16V32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path className="plus" d="M16 24H32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="sr-only">Add Task</span>
            </Button>
          </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

export default TaskForm;