import React from 'react';

import Row from 'react-bootstrap/Row'

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
        <button type="button" value="completed" onClick={(e)=> handleTimeChange(e)}>circle</button>

        <div>{props.description}</div>
        <div>{props.listNames}</div>

        <select name="moveTimeFrame" value={props.list} onChange={(e)=> handleTimeChange(e)}>
          <option value="noDate">No date</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="thisWeek">This Week</option>
          <option value="completed">Completed</option>
        </select>

        <button type="button" onClick={() => props.deleteTodo(props.id)}>X</button>
      </Row>
    </li>
  );
};

export default Todo;