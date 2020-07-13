import React from 'react';

const Todo = props => {
  console.log("Todo props")
  console.log(props)

  function handleTimeChange(e) {
    // debugger
    props.updateTodo(props.id, e.target.value)
  }

  return ( 
    <li className="todo" id={props.id}>
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
    </li>
  );
};

export default Todo;