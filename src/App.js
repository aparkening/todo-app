import React, { Component } from 'react';
import styled from 'styled-components';

import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data'; // Task and list data
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import Container from 'react-bootstrap/Container'; // Bootstrap components

// Override default Bootstrap styles
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialData,
      showComplete: false
    };
  }
  // state = initialData;

  // Convert listName to due date
  setDueDate = (listName) => {
    let due;

    if (listName) {
      const today = new Date();
      switch (listName) {
        case 'today':
          due = today.setDate(today.getDay() + 1)
          break;
        case 'tomorrow':
          due = today.setDate(today.getDay() + 2)
          break;
        case 'thisWeek':
          due = today.setDate(today.getDay() + 7)
          break;
        case 'completed':
          due = "completed"
          break;
        default:
          due = ""
          break;
      }
    }
    return due;
  }

  // Add Task
  addTask = (task) => {
    // Assign id and due date
    const newTask = {description: task.description, id: Date.now(), due: this.setDueDate(task.timeFrame)};

    // Add task to state
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  }

  // Remove Task
  deleteTask = (id) => {
    // Filter all tasks except the one to be removed
    const remainingList = this.state.tasks.filter(task => (task.id !== id));
    // Update state with filter
    this.setState({tasks: remainingList});
  }

  // Update Task
  updateTask = (id, listName) => {
    // Find index with id
    let idx = this.state.tasks.findIndex(item => item.id === id);

    // Update task
    let updatedTask = this.state.tasks[idx];
    updatedTask.due = this.setDueDate(listName);

    // Update state
    this.setState({tasks: [...this.state.tasks.slice(0, idx), updatedTask, ...this.state.tasks.slice(idx + 1)]});
  }

  // Return capitalized readable title based on listName
  displayTitle = (name) => {
    let title;
    switch (name) {
      case 'noDate':
        title = 'No Date'
        break;
      case 'thisWeek':
        title = 'This Week'
        break;
      default:
        title = name.charAt(0).toUpperCase() + name.slice(1)
      break;
    }
    return title;
  }

  // Return filtered tasks array
  // filterList = (name) => {
  //   let list;

  //   // Set dates
  //   let today = new Date();
  //   today = today.setDate(today.getDay() + 1)
  //   let tomorrow = new Date();
  //   tomorrow = tomorrow.setDate(tomorrow.getDay() + 2)
  //   let thisWeek = new Date();
  //   thisWeek = thisWeek.setDate(thisWeek.getDay() + 7)

  //   switch (name) {
  //     case 'today':
  //       list = this.state.tasks.filter(task => (task.due <= today) && (task.due !== ""));
  //       break;
  //     case 'tomorrow':
  //       list = this.state.tasks.filter(task => (task.due <= tomorrow) && (task.due > today));
  //       break;
  //     case 'thisWeek':
  //       list = this.state.tasks.filter(task => (task.due <= thisWeek) && (task.due > tomorrow));
  //       break;
  //     case 'completed':
  //       list = this.state.tasks.filter(task => task.due === "completed");
  //       break;
  //     default:
  //       list = this.state.tasks.filter(task => task.due === "");
  //       break;
  //   }
  //   return list;
  // }

  // Return TaskList components with listName, displayTitle, and filtered tasks
  listComponents = (lists) => {
    // Filter out completed from list
    const displayLists = lists.slice(0, lists.length - 1)
    
    return displayLists.map(name => <TaskList key={name} listName={name} displayTitle={this.displayTitle(name)} updateTask={this.updateTask} deleteTask={this.deleteTask} tasks={this.filterList(name)} listNames={lists} />);
  }

  // Hide/show completed list
  handleCompleteShow = () => {
    this.setState(previousState => {
      return { showComplete: !previousState.showComplete }
    });
  }



// Update state with drag result
onDragEnd = (result, provided) => {

  this.setState({ homeIndex: null}); // Clear index when drag finishes
  console.log(' Result', result);

  const { destination, source, draggableId } = result;

  // If no destination, exit
  if (!destination) {
    return;
  }

  // If droppable location didn't change, exit
  if (destination.droppableId === source.droppableId &&
    destination.index === source.index) {
    return;
  }
  
  // Set start and end columns
  const start = this.state.lists[source.droppableId];
  const finish = this.state.lists[destination.droppableId];
  
  // If moving within same column
  if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
  
    // Move task id from old index to new index
    newTaskIds.splice(source.index, 1); // Remove from old
    newTaskIds.splice(destination.index, 0, draggableId); // Add to new

    // Documentlist changes in newColumn
    const newList = {
      ...start,
      taskIds: newTaskIds,
    };

    // Override existing column
    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newList.id]: newList,
      },
    };

    // Update state
    this.setState(newState);
    return;
  }

  // Moving from one column to another
  
  // Start column
  const startTaskIds = Array.from(start.taskIds);
  startTaskIds.splice(source.index, 1); // Remove from old
  // Document column changes in newColumn
  const newStart = {
    ...start,
    taskIds: startTaskIds,
  };

  // End column
  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId); // Add to new
  // Document column changes in newColumn
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds,
  };

  // Override start and finish columns
  const newState = {
    ...this.state,
    lists: {
      ...this.state.lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  // Update state
  this.setState(newState);
  return;
}; 



  render() {
    console.log("App State")
    console.log(this.state)    

    // const lists = ['today', 'tomorrow', 'thisWeek', 'noDate', 'completed'];

    // const lists = {
    //   today: 'Today',
    //   tomorrow: 'Tomorrow',
    //   thisWeek: 'This Week',
    //   noDate: 'No Date',
    //   completed: 'Completed'
    // }

    return (
      <Container>
        <TaskForm addTask={this.addTask}/>

        <DragDropContext 
          onDragEnd={this.onDragEnd}
        >
          {this.state.listOrder.map((listId) => {
            const list = this.state.lists[listId];
            const tasks = list.taskIds.map(taskId => this.state.tasks[taskId]);
            
            return (
              <TaskList 
                key={list.id} 
                list={list} 
                tasks={tasks} 
                updateTask={this.updateTask} 
                deleteTask={this.deleteTask} 
              />
            );
          })}
        </DragDropContext>

        <div className="lists">
          {/* Display Tasks Lists */}
          {/* {this.listComponents(lists)} */}

          {/* Display Completed List */}
          <div id="complete-container" className={this.state.showComplete ? 'show' : 'hide'}>

          </div>
        </div>
      </Container>
    );
  }
}

export default App;