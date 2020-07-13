import React from 'react';

import Todo from './Todo.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TodoList = props => {
  // Display todos as li elements
  const displayTodos = props.todos.map(obj => <Todo key={obj.id} id={obj.id} description={obj.description} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} listNames={obj.listNames} list={props.listName} />)
  
  // console.log("TodoList props")
  // console.log(props)
  return ( 
    <Container className={'list ' + props.listName}>
      <Row>
        <Col xs={10}><h2>{props.displayTitle}</h2></Col>
        <Col><div>{props.todos.length} todos</div></Col>
      </Row>
      <ul>{displayTodos}</ul>
    </Container>
  );
};

export default TodoList;