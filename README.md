# TodoApp

TodoApp is a lightweight React task tracking app. Create and manage tasks for today, tomorrow, this week, or no specific time at all. 

**Videos**
<!-- - [Feature Demo](https://www.loom.com/share/c986006c3c99495594359a8cf2409640)
- [Decisions and Changes](https://www.loom.com/share/987e19b5b1cc434f94bb3f4bcbcc851b) -->


**Features**
- Create tasks with or without timeframes
- Manage tasks by dragging or selecting from timeframe dropdown list
- Timeframe lists include helpful icons and task counts
- Completed tasks are stored in a collapsed list below the main lists

**Coding Principles**
- Accessible functionality over pure styling

## Installation
1. Install app
```
    $ yarn install 
```
2. Start the app in development mode, which will also open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload if you make edits. You will also see any lint errors in the console.
```
    $ yarn start 
```

## Development Tests
The following tests were completed manually due to time constraints. With more time, they would be added to test scripts.

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
