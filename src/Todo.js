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

        <Col xs={1}>
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
          <button type="button" className="delete" onClick={() => props.deleteTodo(props.id)}>X</button>
        </Col>
      </Row>
    </li>
  );
};

export default Todo;