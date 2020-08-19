import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { COLORS, SIZES, listHeader } from './constants'; // CSS 

import Task from './Task.js'
import initialData from './initial-data'; // Task and list data

// Styles
const Container = styled.div`
  padding: 0 1.2rem;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px ${COLORS.defaultShadow};
  border-radius: 12px;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  // margin-right: -15px;
  // margin-left: -15px;
  //padding: 1.56rem 1.2rem 1.56rem 1.56rem;
  padding: 1.2rem 0.75rem;
`;
const Header = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;
  letter-spacing: -0.02em;
  padding: 0 0 0 4rem;
  margin-bottom: 0;
  ${props => listHeader(props)};
`;
const TaskCount = styled.div`
  font-size: ${SIZES.medium};
  color: #6B6F7C;
  text-align: right;
  padding-right: 0;
`;


export default class TaskList extends React.Component {
  render() {
    // console.log("Tasklist props")
    // console.log(this.props)
    
    return ( 
      <Droppable 
        droppableId={this.props.list.id}
      >
        {(provided, snapshot) => (
          <Container 
            className={'container list ' + this.props.list.id} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {this.props.list.id !== 'list-completed' ? <Row>
              <Header listId={this.props.list.id} className="col-xs-8 col-md-10" >{this.props.list.title}</Header>
              <TaskCount className="col">{this.props.tasks.length} tasks</TaskCount>
            </Row> : null }
            <ul>
              {this.props.tasks.map((task, index) => {
                console.log(task)
                return <Task 
                  key={task.id} 
                  index={index}
                  task={task} 
                  updateTask={this.props.updateTask} 
                  deleteTask={this.props.deleteTask}
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