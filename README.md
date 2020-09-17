# TodoApp

TodoApp is a lightweight React task tracking app. Create and manage tasks for today, tomorrow, this week, or no specific time at all. 

<img src="/public/images/todo-app-screenshot.png" alt="TodoApp screenshot" />

Check out the [video demo](https://www.loom.com/share/9291c82273204af59ea08774bb053881) to see TodoApp in action.


**Task Features**
- Create tasks with or without timeframes.
- Two ways to manage tasks:
  1. Drag within or to another list.
  2. Select from timeframe dropdown list.
- Completed tasks are stored in a collapsed list below the main lists.

**Accessibility Features**
- All form fields are keyboard accessible.
- Form fields are appropriately l.abeled and have consistent focus styling
- SVGs have ARIA roles and appropriate labels.
- Timeframe lists include helpful icons and task counts.
- Tasks can be keyboard dragged within a list:
  1. Navigate to a specific task's description field (probably with the <strong>tab</strong> key).
  2. Grab task by using <strong>spacebar</strong>.
  3. Move task up and down by using <strong>up</strong> and <strong>down</strong> arrow keys.

**Code Features**
- Accessible drag-and-drop with [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd).
- Modular component-specific CSS with [Styled Components](https://styled-components.com/).
- Responsive styling with Flexbox layout
- Dynamic CSS color and shading based on user task actions: dropdown list selection, dragging, dropping, completing).
- Common colors and sizes imported from local `constants.js` file.
- Default data imported from local `initial-data.js` file.
- Dynamic list-specific features within `TaskList` component: remove heading layout and display hide/show link only in Completed instance.

## Installation
1. Install app and its dependencies.
```
    $ yarn install 
```
2. Start the app in development mode, which will also open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload if you make edits. You will also see any lint errors in the console.
```
    $ yarn start 
```

## Development Tests
The following tests were completed manually. Next up, I'll develop automated test scripts.

1. Task displays in appropriate timeframe bucket upon creation.
2. Task moves to Completed Task list upon checking circle.
3. Task moves to appropriate timeframe after dropdown selection.
4. Task moves to apprpriate timeframe upon dragging.
4. Task is removed from all lists upon selecting delete button.
5. Task dropdown displays appropriate label upon creation and moving. 
6. Input form deepens shadow color once active.
7. Input form updates button and shadow colors upon timeframe selection.
8. Completed task is marked complete, changes background color, and then moves to Completed Task list.
9. Each task list updates count upon each task update.

## More React Commands

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
