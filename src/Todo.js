import React from 'react';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Todo = props => {
  console.log("Todo props")
  console.log(props)

  // Handle completed button and dropdown selection
  function handleTimeChange(e) {
    props.updateTodo(props.id, e.target.value)
  }

  return ( 

    <li className="todo" id={props.id}>
      <Row>

        <Col className="completeButton" xs={1}>
          <button type="button" value="completed" className="complete" onClick={(e)=> handleTimeChange(e)} />
        </Col>
        <Col className="description" xs={7}>
          <div>{props.description}</div>
        </Col>
        <Col xs={3}>
          <div>{props.listNames}</div>


        {/* <select name="moveTimeFrame" value={props.list} onChange={(e)=> handleTimeChange(e)}> */}

        <Form.Control as="select" name="moveTimeFrame" value={props.list} onChange={(e)=> handleTimeChange(e)}>
          <option value="noDate">No date</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="thisWeek">This Week</option>
          <option value="completed">Completed</option>
        </Form.Control>

        </Col>
        <Col>
          <button type="button" className="delete" onClick={() => props.deleteTodo(props.id)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#9D9FA7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#9D9FA7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </Col>
      </Row>
    </li>
  );
};

export default Todo;