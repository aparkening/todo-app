import React from 'react';
import styled from 'styled-components';
import { COLORS, SIZES, newTaskBackground, selectListColors, newTaskPlus } from './constants'; // CSS 


// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const NewTask = styled.div`
  // padding: 1.2rem 2.1375rem 1.2rem 2rem;
  // padding: 1.2rem 0.75rem 1.2rem 1.2rem;
  padding: 1.2rem 2rem 1.2rem 1.2rem;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px ${COLORS.defaultShadow};
  border-radius: 12px;
  margin-bottom: 3.5rem;

  &:focus-within {
    box-shadow: ${props => newTaskBackground(props)};
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Description = styled.div`
  font-size: ${SIZES.description};
  flex: 0 0 66.66667%;
  max-width: 66.66667%;

  @media (max-width: 768px) { 
    padding-bottom: 0.75rem;
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
  // font-size: ${SIZES.description};
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  // border: 1px solid #ced4da;
  // border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border: none !important;
    outline: 0;
  }
`;
const SelectContainer = styled.div`
  flex: 1 1 10rem;
  max-width: 10rem;
`;
const SelectList = styled.select`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  // font-size: 1rem;
  // font-weight: 400;
  // line-height: 1.5;
  // color: #495057;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  margin: 0.375rem 0;
  border-radius: 6.25rem !important;
  border-width: 0 !important;
  ${props => selectListColors(props)};

  &:focus {
    border: none !important;
    outline: 0;
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }
`;
const AddButton = styled.button`
  // display: inline-block;
  // font-weight: 400;
  // color: #212529;
  // text-align: center;
  // vertical-align: middle;
  // -webkit-user-select: none;
  // user-select: none;
  // background-color: transparent;
  // border: 1px solid transparent;
  // padding: 0.375rem 0.75rem;

  width: 3rem;
  height: 3rem;
  padding: 0;
  // flex: 1 1 4rem;
  flex: 1 0;
  align-self: flex-end;


  // font-size: 1rem;
  // line-height: 1.5;
  // border-radius: 0.25rem;
  // transition: color 0.15s
  // cursor: pointer;

  // padding-top: 0.3125rem;

  border: none !important;
  background: none !important;
  border-radius: 50%;

  // flex-basis: 0;
  // flex-grow: 1;


  // min-width: 0;
  // max-width: 100%;
  text-align: right;

  & .plus {
    stroke: ${props => props.listId ? `white` : `${COLORS.noDate}`};
  }
  & .plus-circle {  
    // fill: #F9FAFB;
    fill: ${props => newTaskPlus(props)};
  }

  &:focus {
    border: 1px solid white !important;
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
      <NewTask listId={this.state.listId}>
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
            >
              <option value="">Select...</option>
              <option value="list-no">No Date</option>
              <option value="list-today">Today</option>
              <option value="list-tomorrow">Tomorrow</option>
              <option value="list-week">This Week</option>
            </SelectList>
          </SelectContainer>
          {/* </Col> */}
          {/* <Col className="last"> */}
            <AddButton type="submit" listId={this.state.listId}  >
              {plusSVG}
              <span className="sr-only">Add Task</span>
            </AddButton>
          {/* </Col> */}
        </Form>
      </NewTask>
    );
  }
};