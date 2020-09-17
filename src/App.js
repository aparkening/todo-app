import React from 'react';
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

// Display App
class App extends React.Component {
  // Set initial state
  state = initialData;

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

  // Select List Update Task
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
    })

    // Update background of updated task
    // const task = document.querySelector(`#${id}`);
    // switch (newListId) {
    //   case 'list-today':
    //     task.style.backgroundColor = `${COLORS.todayBackground}`;
    //     // task.style.backgroundColor = 'rgba(255, 0, 110, 0.08)';
    //     console.log(COLORS.todayBackground);
    //     break
    //   case 'list-tomorrow':
    //     task.style.backgroundColor = `${COLORS.tomorrowBackground}`;
    //     break
    //   case 'list-week':
    //     task.style.backgroundColor = `${COLORS.thisWeekBackground}`;
    //     break
    //   case 'list-completed':
    //     task.style.backgroundColor = `${COLORS.completedBackground}`;
    //     break
    //   default:
    //     task.style.backgroundColor = `${COLORS.noDateBackground}`;
    //     break
    // };
    // task.style.transition = 'background-color 0.2s ease';

    // Move task after .5 seconds
    // setTimeout(function() { //Start the timer
    //   this.setState({
    //     ...this.state,
    //     lists: {
    //       ...this.state.lists, 
    //       [oldListId]: {
    //         ...this.state.lists[oldListId],
    //         taskIds: updatedOldList
    //       },
    //       [newListId]: {
    //         ...this.state.lists[newListId],
    //         taskIds: [
    //           ...this.state.lists[newListId].taskIds, 
    //           id
    //         ]
    //       }
    //     }
    //   }) //After 1 second, set render to true
    // }.bind(this), 500)
  }

  // Change background color upon start
  onDragStart = (start, provided) => {
    const task = document.getElementById(`${start.draggableId}`);

    // console.log('Task is', task)
    task.style.backgroundColor = `rgba(220, 220, 220, 0.5)`;
    task.style.transition = 'background-color 0.2s ease';
  }

  // Update state with drag result
  onDragEnd = (result, provided) => {
    // Clear background change on end
    const task = document.getElementById(`${result.draggableId}`);
    task.style.backgroundColor = `inherit`;
    task.style.transition = 'background-color 0.2s ease';

    const { destination, source, draggableId } = result;

    // If no destination, exit
    if (!destination) return;

    // If droppable location didn't change, exit
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;
    
    // Set start and end lists
    const start = this.state.lists[source.droppableId];
    const finish = this.state.lists[destination.droppableId];
    
    //// Moving within same lists
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
    
      // Move task id from old index to new index
      newTaskIds.splice(source.index, 1); // Remove from old
      newTaskIds.splice(destination.index, 0, draggableId); // Add to new

      // Document list changes in newList
      const newList = {
        ...start,
        taskIds: newTaskIds,
      };

      // Override existing list
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

    //// Moving from one list to another
    // Start list
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1); // Remove from old
    // Document list changes in newStart
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    // End list
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId); // Add to new
    // Document list changes in newFinish
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    // Override start and finish lists
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

    return (
      <Container>
        <TaskForm addTask={this.addTask}/>
        <DragDropContext 
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
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
      </Container>
    );
  }
}

export default App;