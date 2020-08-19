import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { COLORS, SIZES } from './constants'; // CSS constants

// Bootstrap components
import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

const TaskItem = styled.li`
  padding: 1.2rem;
  box-shadow: 0px 1px 0px ${COLORS.defaultShadow};
  display: flex;
  flex-wrap: wrap;
  // margin-right: -15px;
  // margin-left: -15px;
  &:last-child {
    box-shadow: none;
  }
`;
const Complete = styled.div`
  // margin-left: 1.25rem;
  // padding-left: 0.125rem !important;
  max-width: 4rem !important;
  width: 4rem !important;
  flex: 0 0 4rem !important;
`;
const CompleteButton = styled.button`
    width: 2.25rem;
    height: 2.25rem;
    background-color: white !important;
    // border: 2px solid #E4E8F1 !important;
    border-style: solid;
    border-width: 2px;
    border-color: ${props => props.completed ? `${COLORS.completed}` : '#E4E8F1'};
    border-radius: 50%;
    display: inline-block;
    padding: ${props => props.completed ? '0' : '0.375rem 0.75rem'};
  }
  &:focus {
    // background-color: white !important;
    // border: 2px solid #E4E8F1 !important;
  }
`;
const Description = styled.div`
  font-size: ${SIZES.description};
  flex: 0 0 66.66667%;
  max-width: 66.66667%;
`;
const Select = styled.div`

`;
const DeletButton = styled.button`
  padding-top: 0.3125rem;
  border: none !important;
  background: none !important;
  border-radius: 50%;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;
  text-align: right;
  &:focus {
    border: 1px solid white !important;
  }
`;


export default class Task extends React.Component {
  render() {
    // console.log("Task props")
    // console.log(this.props)
    
    // Handle completed button and dropdown selection
    const handleTimeChange = event => {
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
            <Complete>
              {/* <Button 
                value="list-completed" 
                onClick={(e)=> handleTimeChange(e)} 
                disabled={this.props.parentList.id === "list-completed" ? true : false} > */}
              
              {this.props.parentList.id === "list-completed" ? 
                <CompleteButton 
                  disabled="true"
                  completed="true"
                >
                  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M17 1L6 12L1 7" stroke="#03CEA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="sr-only">Complete Task</span>
                </CompleteButton>
                : 
                <CompleteButton 
                  value="list-completed" 
                  onClick={(e)=> handleTimeChange(e)} 
                >
                  <span className="sr-only">Complete Task</span>
                </CompleteButton>
              }
            </Complete>
            <Description {...provided.dragHandleProps}>
              {this.props.task.content}
            </Description>
            {/* <Col xs={6} md={3} lg={3}> */}
            <Select>
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
            </Select>
            {/* </Col> */}
            <DeletButton onClick={() => this.props.deleteTask(this.props.task.id, this.props.parentList.id)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M18 6L6 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="sr-only">Delete Task</span>
            </DeletButton>
          </TaskItem>
        )}
      </Draggable>
    );
  }
};