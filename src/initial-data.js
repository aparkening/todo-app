const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Make breakfast' }, 
    'task-2': { id: 'task-2', content: 'Make lunch' }, 
    'task-3': { id: 'task-3', content: 'Make 5 dinners' }, 
    'task-4': { id: 'task-4', content: 'Eat breakfast!' }, 
    'task-5': { id: 'task-5', content: 'Eat lunch!' }, 
    'task-6': { id: 'task-6', content: 'Eat 5 dinners!' }, 
  },
  lists: {
    'list-today': {
      id: 'list-today',
      title: 'Today',
      taskIds: ['task-1', 'task-4']
    },
    'list-tomorrow': {
      id: 'list-tomorrow',
      title: 'Tomorrow',
      taskIds: ['task-2', 'task-5']
    },
    'list-week': {
      id: 'list-week',
      title: 'This Week',
      taskIds: ['task-3', 'task-6']
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