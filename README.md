# TaskMate Mobile App
## Purpose
TaskMate is a mobile application designed to help users manage their tasks with calendar efficiently. It allows users to create, update, and delete tasks, as well as categorize them based on their status (e.g., todo or completed, color, priority).

## How to Contribute
It's welcome contributions from the community! If you'd like to contribute to the development of TaskMate, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature-name.
3. Make your changes and commit them: git commit -m "Description of your changes".
4. Push to your branch: git push origin feature-name.
5. Submit a pull request.

## Features
- User authentication: Users can register, log in, and log out.
- Task management with calendar: Users can create, update, and delete tasks.
- Task filtering: Users can filter tasks based on their status (todo or completed).
- Splash screen
- Settings screen: Users can choose accessibility settings (e.g., font size, appearance).
- About screen: A screen that describes TaskMate.
- Open source licences screen

 
## Dependencies
To install the dependencies for this project, run the following command:

```sh
 npm install
```
### Dependencies include:

- react-native
- expo
- @gluestack-ui/themed
- react-native-calendars
- moment
- Other dependencies specified in package.json

## Application Architecture
TaskMate follows a component-based architecture, using React Native for the frontend. 
The application consists of various components for different features, such as task management and user authentication.
It communicates with a backend server(Node.js and Express.js, with MySQL as the database) using RESTful APIs.

## API Documentation
The API for TaskMate is documented using Swagger. You can access the API documentation through this repo [TaskMateBackend](https://github.com/amber871023/TaskMateBackend).

## Reporting Issues
If you encounter any issues while using TaskMate, please report them on our GitHub repository by opening a new issue. Be sure to include detailed information about the problem and steps to reproduce it.


## License
TaskMate is licensed under the [MIT License](https://github.com/amber871023/TaskMate/blob/main/LICENSE).
