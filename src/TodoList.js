import React from 'react';

// import Todo from './Todo.js'

const TodoList = props => {
  // Display todos as li elements
  const displayTodos = props.todos.map(obj => <li key={obj.id}>{obj.description}</li>)
  
  // Display readable title based on listName
  const makeTitle = () => {
    let title;
    switch (props.listName) {
      case 'NoDate':
        title = 'No Date'
        break;
      case 'ThisWeek':
        title = 'This Week'
        break;
      default:
        title = props.listName
      break;
    }
    return title;
  }

  console.log("TodoList props")
  console.log(props)

  return ( 
    <div className="list">
      <h2>{makeTitle()}</h2>
      <div>{props.todos.length} todos</div>
      <ul>{displayTodos}</ul>
    </div>
  );
};

export default TodoList;