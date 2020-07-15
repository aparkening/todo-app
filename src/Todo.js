import React from 'react';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Todo = props => {
  // console.log("Todo props")
  // console.log(props)

  // Handle completed button and dropdown selection
  function handleTimeChange(e) {
    props.updateTodo(props.id, e.target.value)
  }

  return ( 
    <li className="todo" id={props.id}>
      <Row>
        <Col className="complete-todo" xs={1}>
          <Button value="completed" onClick={(e)=> handleTimeChange(e)} disabled={props.list === "completed" ? true : false} >
          {props.list === "completed" ? 
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M17 1L6 12L1 7" stroke="#03CEA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> : null}
            <span className="sr-only">Complete Todo</span>
          </Button>
        </Col>
        <Col className="description" xs={8} md={6} lg={7}>
          <div>{props.description}</div>
        </Col>
        <Col xs={6} md={3} lg={3}>
          <Form.Label className="sr-only">Select Timeframe</Form.Label>
          <Form.Control as="select" className="time-frame" name="moveTimeFrame" value={props.list} onChange={(e)=> handleTimeChange(e)}>
            <option value="noDate">No Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="thisWeek">This Week</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Col>
        <Col className="last">
          <Button className="delete-todo" onClick={() => props.deleteTodo(props.id)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M18 6L6 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="sr-only">Delete Todo</span>
          </Button>
        </Col>
      </Row>
    </li>
  );
};

export default Todo;