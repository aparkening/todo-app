import React from 'react';

// import Todo from './Todo.js'

const TodoList = props => {
  // Display todos as li elements
  const displayTodos = props.todos.map(obj => <li key={obj.id}>{obj.description}</li>)
  
  console.log("TodoList props")
  console.log(props)

  return ( 
    <div className="list">
      <h2>{props.displayTitle}</h2>
      <div>{props.todos.length} todos</div>
      <ul>{displayTodos}</ul>
    </div>
  );
};

export default TodoList;