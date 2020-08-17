import React from 'react';

import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task.js'
import initialData from './initial-data'; // Task and list data

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default class TaskList extends React.Component {

  // Handle drag change
  // const handleTimeChange = () => {
  //   debugger
  //   // props.updateTask(props.id, event.target.value)
  // }


  // Display tasks as li elements
  // const displayTasks = props.tasks.map(obj => <Task key={obj.id} id={obj.id} description={obj.description} updateTask={props.updateTask} deleteTask={props.deleteTask} listNames={obj.listNames} list={props.listName} />)

  
  render() {
      
    console.log("Tasklist props")
    console.log(this.props)
    
    return ( 
      <Droppable 
        droppableId={this.props.list.id}
      >
        {(provided, snapshot) => (
          <Container 
            className={'list ' + this.props.list.id} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            style={{backgroundColor: 'yellow'}}
          >
            {this.props.list.id !== 'list-completed' ? <Row className="heading">
              <Col xs={8} md={10}>
                <h2>{this.props.list.title}</h2>
              </Col>
              <Col className="last">
                <div className="count">{this.props.tasks.length} tasks</div>
              </Col>
            </Row> : null }
            <ul>
              {this.props.tasks.map((task, index) => {
                return <Task 
                  key={task.id} 
                  index={index}
                  task={task} 
                  updateTask={task.updateTask} 
                  deleteTask={task.deleteTask} 
                  parentList={this.props.list}
                  allLists={initialData.lists}
                />
              })}
              {provided.placeholder}
            </ul>
          </Container>
        )}
      </Droppable>
    );
  }
}