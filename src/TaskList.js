import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { COLORS, SIZES } from './constants'; // CSS 

import initialData from './initial-data'; // Task and list data
import Task from './Task.js'

// Styles
const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0 1.2rem;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px ${COLORS.defaultShadow};
  border-radius: 12px;

  ${props => props.listId === 'list-completed' && !props.show ? `display:none;` : `display: block;`}
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.2rem 0.75rem;
`;
const Header = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;
  letter-spacing: -0.02em;
  padding: 0 0 0 4rem;
  margin-bottom: 0;
  flex: 4 4 75%;

  ${props => {
    // List H2 colors and background images
    switch (props.listId) {
      case 'list-today':
        return `
        color: ${COLORS.today};
        background: url(/images/inbox.svg) no-repeat left center;
        fill: ${COLORS.today};`
      case 'list-tomorrow':
        return `
        color: ${COLORS.tomorrow};
        background: url(/images/sun.svg) no-repeat left center;
        fill: ${COLORS.tomorrow};`
      case 'list-week':
        return `
        color: ${COLORS.thisWeek};
        background: url(/images/calendar.svg) no-repeat left center;
        fill: ${COLORS.thisWeek};`
      case 'list-completed':
        return `
        color: ${COLORS.completed};
        fill: ${COLORS.completed};`
      default:
        return `
        color: ${COLORS.noDate};
        background: url(/images/folder.svg) no-repeat left center;
        fill: ${COLORS.noDate};`
    }
  }};
`;
const CompleteHeading = styled.h3`
  font-size: 1.125rem;
  color: #3B424E;
  text-align: center;
  margin: 3rem 0;
  & a,
  & a:visited {
    text-decoration: none;
    color: #3B424E;
  }
  & a:hover {
    text-decoration: underline;
  }
`;
const TaskCount = styled.div`
  flex: 1 1 auto;
  align-self: center;
  font-size: ${SIZES.medium};
  color: #6B6F7C;
  text-align: center;
  padding: 0;

  @media (min-width: 400px) { 
    text-align: right;
  }

`;
const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// Display TaskList
export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showComplete: false};
  }

  // Hide/show completed list
  handleCompleteShow = () => {
    this.setState(previousState => {
      return { showComplete: !previousState.showComplete }
    });
  }

  render() {
    return (
      <div>
        {this.props.list.id === 'list-completed'
          // Completed hide/show 
          ? <CompleteHeading>
          {!this.props.list.taskIds.length 
            ? <>No completed tasks</>
            : <a href="#show" onClick={this.handleCompleteShow}>
                  {!this.state.showComplete ? 'Show' : 'Hide'} {this.props.list.taskIds.length} Completed Task(s)
            </a>  
          } </CompleteHeading> 
          : null
        }
      <Droppable 
        droppableId={this.props.list.id}
      >
        {(provided, snapshot) => (
          <Container 
            className={'container list ' + this.props.list.id} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            listId={this.props.list.id} 
            show={this.state.showComplete}
          >
            {this.props.list.id !== 'list-completed' 
            // If not completed list, show header and tasks
            ? <Row>
                <Header listId={this.props.list.id} className="col-xs-8 col-md-10" >{this.props.list.title}</Header>
                <TaskCount>{this.props.tasks.length} tasks</TaskCount>
              </Row> : null
            }
            <List>
              {this.props.tasks.map((task, index) => {
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
            </List>
          </Container>
        )}
      </Droppable>
    </div>
    );
  }
}