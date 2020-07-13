import React from 'react';

const Todo = props => {
  console.log("Todo props")
  console.log(props)

  return ( 
    <li className="todo" id={props.id}>
      <div>{props.description}</div>
      <div>{props.listNames}</div>
      <button type="button" onClick={() => props.deleteTodo(props.id)}>X</button>
    </li>
  );
};

export default Todo;