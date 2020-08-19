// Common colors
export const COLORS = {
  text: '#0A1323',
  background: '#F9FAFC',
  today: '#FF006E',
  todayBackground: 'rgba(255, 0, 110, 0.08) !important',
  tomorrow: '#FB5607',
  tomorrowBackground: 'rgba(251, 86, 7, 0.08) !important',
  thisWeek: '#FFBE0B',
  thisWeekBackground: 'rgba(255, 190, 11, 0.08) !important',
  noDate: '#9D9FA7',
  noDateBackground: '#F9FAFB !important',
  completed: '#03CEA4',
  completedBackground: 'rgba(3, 206, 164, 0.04) !important',
  defaultShadow: '#EBEEF5',
  placeholder: '#848791'
};

// Common sizes
export const SIZES = {
  description: '1.5em',
  medium: '1.125em',
};

// Update task list select colors
export const selectListColors = props => {
  switch (props.value) {
    case 'list-today':
      return `background-color: ${COLORS.todayBackground}; color: ${COLORS.today};`
    case 'list-tomorrow':
      return `background-color: ${COLORS.tomorrowBackground}; color: ${COLORS.tomorrow};`
    case 'list-week':
      return `background-color: ${COLORS.thisWeekBackground}; color: ${COLORS.thisWeek};`
    case 'list-completed':
      return `background-color: ${COLORS.completedBackground}; color: ${COLORS.completed};`
    default:
      return `background-color: ${COLORS.noDateBackground}; color: ${COLORS.noDate};`
  }
};

// List H2 colors
export const listHeader = props => {
  switch (props.listId) {
    case 'list-today':
      return `
      color: ${COLORS.today};
      background: url(/images/inbox.svg) no-repeat left center;
      fill: ${COLORS.today};`
    case 'list-tomorrow':
      return `
      color: ${COLORS.tomorrow};
      background: url(/images/sun.svg) no-repeat left center;
      fill: ${COLORS.tomorrow};`
    case 'list-week':
      return `
      color: ${COLORS.thisWeek};
      background: url(/images/calendar.svg) no-repeat left center;
      fill: ${COLORS.thisWeek};`
    case 'list-completed':
      return `
      color: ${COLORS.completed};
      fill: ${COLORS.completed};`
    default:
      return `
      color: ${COLORS.noDate};
      background: url(/images/folder.svg) no-repeat left center;
      fill: ${COLORS.noDate};`
  }
};