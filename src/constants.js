// Common colors
export const COLORS = {
  text: '#0A1323',
  background: '#F9FAFC',
  today: '#FF006E',
  todayBackground: 'rgba(255, 0, 110, 0.08)',
  tomorrow: '#FB5607',
  tomorrowBackground: 'rgba(251, 86, 7, 0.08)',
  thisWeek: '#FFBE0B',
  thisWeekBackground: 'rgba(255, 190, 11, 0.08)',
  noDate: '#9D9FA7',
  noDateBackground: '#F9FAFB',
  completed: '#03CEA4',
  completedBackground: 'rgba(3, 206, 164, 0.04)',
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