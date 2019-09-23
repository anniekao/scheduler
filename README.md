# Interview Scheduler
This single-page React application allows users to book, cancel, and delete one-hour interview time slots within the span of a week. By selecting a specific day of the week, the user can choose an available time slot, input the name of the student, choose an interviewer and create the appointment. By hovering over an existing appointment, users can click a delete icon or edit icon to cancel or change the selected apoointment. This application also utilises Websockets allowing for real-time updates when the schedule changes.

**Tech Stack**: 
- Front/Back end: React, Webpack, Axios, Websocket, Express
- Testing: Jest, Storybook, Cypress

## Setup Instructions

**Note**: In order to run the scheduler locally, the [scheduler-api](https://github.com/anniekao/scheduler-api) must also be downloaded and run concurrently. Instructions for setup can be found in the corresponding README file.

1. Install dependencies with `npm install`.
2. Run the Webpack Development Server with `npm start`
3. Run Jest test with `npm test`
4. Run Storybook with `npm run storybook`
5. Run Cypress with `npm run cypress`

## Screenshots

![Creating an appointment](https://github.com/anniekao/scheduler/blob/master/public/feature-gifs/feature-create.gif)
Creating an appointment

![Error handling](https://github.com/anniekao/scheduler/blob/master/public/feature-gifs/feature-error.gif)
If there are errors when creating/deleting/editing an appointment then a pop up appears
