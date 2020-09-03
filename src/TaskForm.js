import React from 'react';
import styled from 'styled-components';
import { COLORS, SIZES, selectListColors } from './constants'; // CSS constants 

// Styles
const NewTask = styled.div`
  padding: 1.2rem 2rem 1.2rem 1.2rem;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px ${COLORS.defaultShadow};
  border-radius: 12px;
  margin-bottom: 3.5rem;

  &:focus-within {
    box-shadow: ${props => {
      // New Task shadow colors
      switch (props.listId) {
        case 'list-today':
          return `0px 4px 32px rgba(255, 0, 110, 0.12)`;
        case 'list-tomorrow':
          return `0px 4px 32px rgba(255, 86, 7, 0.12)`;
        case 'list-week':
          return `0px 4px 32px rgba(255, 190, 11, 0.12)`;
        default:
          return `0px 4px 32px #DAE0EC`;
      }
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (min-width: 768px) { 
    flex-wrap: nowrap;
  }
`;
const Description = styled.div`
  font-size: ${SIZES.description};
  padding: 0 0.75rem 0.75rem 0;
  width: 100%;

  @media (min-width: 768px) { 
    width: auto;
    padding-bottom: 0;
    flex: 4 4 60%;
  }
`;
const TextBox = styled.input`
  margin: 0;
  font-family: inherit;
  border: none !important;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${COLORS.placeholder} !important;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${COLORS.placeholder} !important;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: ${COLORS.placeholder} !important;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: ${COLORS.placeholder} !important;
  }
`;
const SelectContainer = styled.div`
  padding-top: 0.4375rem; /* 7px */
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
const AddButton = styled.button`
  width: 3rem;
  padding: 0;
  border: none !important;
  background: none !important;
  border-radius: 50%;

  & .plus {
    stroke: ${props => props.listId ? `white` : `${COLORS.noDate}`};
  }
  
  & .plus-circle {  
    fill: ${props => {
      // New Task submit button colors
      switch (props.listId) {
        case 'list-today':
          return `${COLORS.today}`
        case 'list-tomorrow':
          return `${COLORS.tomorrow}`
        case 'list-week':
          return `${COLORS.thisWeek}`
        case 'list-no':
          return `${COLORS.noDate}`
        default:
          return `#F9FAFB`
      }
    }};
  }

  &:focus {
    // border: 1px solid white !important;
    outline-style: solid;
    outline-width: thin;
    outline-color: ${COLORS.placeholder};
  }
`;


// Plus svg
const plusSVG = <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <path className="plus-circle" d="M43.5 24C43.5 34.7696 34.7696 43.5 24 43.5C13.2304 43.5 4.5 34.7696 4.5 24C4.5 13.2304 13.2304 4.5 24 4.5C34.7696 4.5 43.5 13.2304 43.5 24Z" stroke="white"/>
  <path className="plus" d="M24 16V32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path className="plus" d="M16 24H32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;


export default class TaskForm extends React.Component {
  state = {
    listId: "",
    content: ""
  }

  // Update state on input change
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Send task submission to App
  handleOnSubmit = event => {
    event.preventDefault();
    const newTask = {...this.state} 
    this.props.addTask(newTask);

    // Reset form content text
    this.setState({ content: "" })
  }

  render() {
    return (
      <NewTask listId={this.state.listId} className="container">
        <Form onSubmit={this.handleOnSubmit}>
          <Description>
          {/* <div className="description col-lg-8 col-md-7 col-12"> */}
            <label className="sr-only">Task:</label>
            <TextBox 
              type="text" 
              name="content" 
              onChange={this.handleChange} 
              value={this.state.content} 
              placeholder="What do you need to get done?"
              required
            />
          </Description>
          <SelectContainer>
            <label className="sr-only" htmlFor="change-list">Select Timeframe</label>
            <SelectList 
              id="change-list"
              className="time-frame" 
              name="listId" 
              value={this.state.listId} 
              onChange={this.handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="list-no">No Date</option>
              <option value="list-today">Today</option>
              <option value="list-tomorrow">Tomorrow</option>
              <option value="list-week">This Week</option>
            </SelectList>
          </SelectContainer>
          <ButtonContainer>
            <AddButton type="submit" listId={this.state.listId}  >
              {plusSVG}
              <span className="sr-only">Add Task</span>
            </AddButton>
          </ButtonContainer>
        </Form>
      </NewTask>
    );
  }
};