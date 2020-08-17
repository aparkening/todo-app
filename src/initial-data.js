const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Refill chicken water' }, 
    'task-2': { id: 'task-2', content: 'Refill rabbit water' }, 
    'task-3': { id: 'task-3', content: 'Feed animals' }, 
    'task-4': { id: 'task-4', content: 'Move rabbit fence' }, 
  },
  lists: {
    'list-today': {
      id: 'list-today',
      title: 'Today',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'list-tomorrow': {
      id: 'list-tomorrow',
      title: 'Tomorrow',
      taskIds: []
    },
    'list-week': {
      id: 'list-week',
      title: 'This Week',
      taskIds: []
    },
    'list-no': {
      id: 'list-no',
      title: 'No Date',
      taskIds: []
    },
    'list-completed': {
      id: 'list-completed',
      title: 'Completed',
      taskIds: []
    }  
  },
  // List rendering
  listOrder: ['list-today', 'list-tomorrow', 'list-week', 'list-no', 'list-completed']
};

export default initialData;