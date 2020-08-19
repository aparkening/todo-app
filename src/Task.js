import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { COLORS } from './constants'; // CSS Colors

// Bootstrap components
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const TaskItem = styled.li`
  padding: 1.2rem;
  box-shadow: 0px 1px 0px ${COLORS.defaultShadow};

  &:last-child {
    box-shadow: none;
  }
`;








export default class Task extends React.Component {

  render() {
    // console.log("Task props")
    // console.log(this.props)
    
    // Handle completed button and dropdown selection
    const handleTimeChange = event => {
      debugger
      this.props.updateTask(this.props.task.id, this.props.parentList.id, event.target.value)
    }

    return ( 
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <TaskItem
            id={this.props.task.id}
            {...provided.draggableProps}
            // {...provided.dragHandleProps}
            // innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Row
            >
              <Col className="complete-task" xs={1}>
                <Button value="list-completed" onClick={(e)=> handleTimeChange(e)} disabled={this.props.parentList.id === "list-completed" ? true : false} >
                {this.props.parentList.id === "list-completed" ? 
                  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M17 1L6 12L1 7" stroke="#03CEA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> : null}
                  <span className="sr-only">Complete Task</span>
                </Button>
              </Col>
              <Col className="description" xs={8} md={6} lg={7}>
                <div {...provided.dragHandleProps}>{this.props.task.content}</div>
              </Col>
              <Col xs={6} md={3} lg={3}>
                <Form.Label className="sr-only">Select Timeframe</Form.Label>
                <Form.Control 
                  as="select" 
                  className="time-frame" 
                  name="listId" 
                  value={this.props.parentList.id} 
                  onChange={(e)=> handleTimeChange(e)}
                >
                  <option value="list-no">No Date</option>
                  <option value="list-today">Today</option>
                  <option value="list-tomorrow">Tomorrow</option>
                  <option value="list-week">This Week</option>
                  <option value="list-completed">Completed</option>
                </Form.Control>
              </Col>
              <Col className="last">
                <Button className="delete-task" onClick={() => this.props.deleteTask(this.props.task.id, this.props.parentList.id)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M18 6L6 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="sr-only">Delete Task</span>
                </Button>
              </Col>
            </Row>
          </TaskItem>
        )}
      </Draggable>
    );
  }
};