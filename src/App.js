import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data'; // Task and list data
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

// Override default Bootstrap styles
import './App.scss';

// Styles
const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialData,
      // showComplete: false
    };
  }

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
    // Assign id
    const id = Date.now().toString();
    const newTask = {id: id, content: task.content};
    const listId = task.listId;

    // Add task to state
    this.setState({
      ...this.state,
      tasks: {...this.state.tasks, [id]: newTask},
      lists: {
        ...this.state.lists, 
        [listId]: {
          ...this.state.lists[listId],
          taskIds: [
            ...this.state.lists[listId].taskIds,
            id
          ]
        }
      }
    });
  }

  // Remove Task
  deleteTask = (id, listId) => {
    // Only keep tasks that aren't id
    const updatedTasks = Object.keys(this.state.tasks).reduce((obj, key) => {
      if (key !== id) {
        obj[key] = this.state.tasks[key];
      }
      return obj;
    }, {})

    // Delete task from tasks and specific list
    this.setState({
      ...this.state,
      tasks: updatedTasks,
      lists: {
        ...this.state.lists, 
        [listId]: {
          ...this.state.lists[listId],
          taskIds: [...this.state.lists[listId].taskIds].filter(task => task !== id)
        }
      }
    });
  }

  // Update Task
  updateTask = (id, oldListId, newListId) => {
    // Remove task from old list
    const updatedOldList = this.state.lists[oldListId].taskIds.filter(task => task !== id)

    // Remove and add task to specific lists
    this.setState({
      ...this.state,
      lists: {
        ...this.state.lists, 
        [oldListId]: {
          ...this.state.lists[oldListId],
          taskIds: updatedOldList
        },
        [newListId]: {
          ...this.state.lists[newListId],
          taskIds: [
            ...this.state.lists[newListId].taskIds, 
            id
          ]
        }
      }
    });
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
    // console.log("App State")
    // console.log(this.state)    

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

          {/* Display Completed List */}
          {/* <div id="complete-container" className={this.state.showComplete ? 'show' : 'hide'}>


          </div> */}

        </DragDropContext>

        {/* <div className="lists"> */}
          {/* Display Tasks Lists */}
          {/* {this.listComponents(lists)} */}

        {/* </div> */}
      </Container>
    );
  }
}

export default App;