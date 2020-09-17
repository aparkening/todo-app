import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { COLORS, SIZES, selectListColors } from './constants'; // CSS constants

// Styles
const TaskItem = styled.li`
  padding: 1.2rem 1.2rem 1.2rem 0.75rem;
  box-shadow: 0px 1px 0px ${COLORS.defaultShadow};
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 12px;

  &:last-child {
    box-shadow: none;
  }

  @media (min-width: 768px) { 
    flex-wrap: nowrap;
  }
`;
const CompleteDescription = styled.div`
  width: 100%;
  padding: 0 0.75rem 0.75rem 0;
  text-align: center;

  @media (min-width: 255px) { 
    text-align: left;
    display: flex;
    align-content: flex-start;
    flex-wrap: nowrap;
  }

  @media (min-width: 768px) { 
    width: auto;
    padding-bottom: 0;
    flex: 4 4 60%;
  }
`;
const Complete = styled.div`
  margin: 0 auto; /* Center button on smallest */
  padding-bottom: 0.75rem;

  @media (min-width: 255px) { 
    flex: 1 1 4rem;
    padding: 0;
    margin: auto;
    width: 4rem !important;
    max-width: 4rem !important;
    min-width: 4rem !important;
  }
`;
const CompleteButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  background-color: white !important;
  border: 2px solid ${props => props.completed ? `${COLORS.completed}` : '#E4E8F1'};
  border-radius: 50%;
  padding: ${props => props.completed ? '0' : '0.375rem 0.75rem'};

  &:focus {
    background-color: white !important;
    border: 2px solid ${COLORS.completed} !important;
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }
`;
const Description = styled.div`
  font-size: ${SIZES.description};
  padding: 0.1rem 0;

  @media (min-width: 255px) { 
    flex: 4 4 auto;
  }

  &:focus {
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }

`;
const SelectContainer = styled.div`
  // padding-top: 0.4375rem; /* 7px */
  flex: 1 1 auto;
  padding-bottom: 0.75rem;

  @media (min-width: 255px) { 
    padding-bottom: 0;
  }
`;
const SelectList = styled.select`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 6.25rem !important;
  border-width: 0 !important;
  ${props => selectListColors(props)};

  &:focus {
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 1px 2px;
  }
`;
const ButtonContainer = styled.div`
  margin: 0 auto; /* Center button on smallest */

  @media (min-width: 255px) { 
    margin: auto;
    flex: 1 1 auto;
    align-self: flex-end;
    text-align: right;
  }
`;
const DeletButton = styled.button`
  height: 2.375rem;
  border: none !important;
  background: none !important;
  border-radius: 50%;
  &:focus {
    // border: 1px solid white !important;
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }
`;

// Checkmark svg
const checkSVG = <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M17 1L6 12L1 7" stroke="#03CEA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;

// Delete svg
const deleteSVG = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <path d="M18 6L6 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M6 6L18 18" stroke="#9D9FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

// Display Task
export default class Task extends React.Component {
  render() {
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
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <CompleteDescription>
              <Complete>              
                {this.props.parentList.id === "list-completed" ? 
                  <CompleteButton 
                    disabled={true}
                    completed="true"
                  >
                    {checkSVG}
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
              <Description 
                aria-roledescription="Draggable item"
                {...provided.dragHandleProps}>
                {this.props.task.content}
              </Description>
            </CompleteDescription>
            <SelectContainer>
              <label>
                <span className="sr-only">Select Timeframe</span>
                <SelectList
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
                </SelectList>
              </label>
            </SelectContainer>
            <ButtonContainer>
              <DeletButton onClick={() => this.props.deleteTask(this.props.task.id, this.props.parentList.id)}>
                {deleteSVG}
                <span className="sr-only">Delete Task</span>
              </DeletButton>
            </ButtonContainer>
          </TaskItem>
        )}
      </Draggable>
    );
  }
};