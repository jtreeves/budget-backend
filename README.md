# Kaleidoscope Backend

This is the backend repository for the Kaleidoscope app. It contains the code necessary for the server to manipulate the data for the app. It was designed to work with the app's [frontend repository](https://github.com/jtreeves/budget-frontend). To use the entire app, visit the [Kaleidoscope](HEROKULINKTK) site.

**Contents**

1. [About](https://github.com/jtreeves/budget-backend#about)
2. [Installation](https://github.com/jtreeves/budget-backend#installation)
3. [Explanation](https://github.com/jtreeves/budget-backend#explanation)
4. [Features](https://github.com/jtreeves/budget-backend#features)
5. [Models](https://github.com/jtreeves/budget-backend#models)
6. [Routes](https://github.com/jtreeves/budget-backend#routes)
7. [Dependencies](https://github.com/jtreeves/budget-backend#dependencies)
8. [Further Thoughts](https://github.com/jtreeves/budget-backend#further-thoughts)

## About

Kaleidoscope is an app for seeing how simple life changes can result in dramatic budget opportunities. It was made through the collaborative efforts of Alan Avery, Jackson Reeves, Jeremy Uriz, and Thomas Gilbert.

## Installation

### Create Local Repositories

1. Fork and clone this repository and the corresponding [frontend repository](https://github.com/jtreeves/budget-frontend) to your local computer (we recommend storing both directories in a common Kaleidoscope folder)
2. Run `npm i` to install all necessary dependencies
3. Set up a `.env` file to hold `JWT_SECRET` and `MONGO_URI` variables (set the former to whatever you like, but set the latter to `mongodb://localhost:27017/kaleidoscope`)

### Set Up Local Database

1. Ensure you have MongoDB installed on your local computer by typing `mongo` into your terminal to launch the Mongo shell (install MongoDB if necessary)
2. Upon running the backend repo (see next step), a new database named `kaleidoscope` should automatically appear in your local MongoDB (confirm by typing `show dbs` while in the Mongo shell)

### Run Locally

1. Run `npm start` from within both the backend directory and the frontend directory
2. View the live version of the site at `http://localhost:3000` in the browser of your choosing

Alternatively, you may use the live version of the [Kaleidoscope](HEROKULINKTK) app.

## Explanation

Notes about general approach TK.

## Features

- Models for users and budgets with full CRUD functionality
- Authentication measures to protect user information

## Models

![ERD](/images/erd.png)

## Routes

| Method | Path             | File       | Description              |
| ------ | ---------------- | ---------- | ------------------------ |
| POST   | /users/signup    | users.js   | Sign up a new user       |
| POST   | /users/login     | users.js   | Log in an existing user  |
| GET    | /users/current   | users.js   | Display a user's data    |
| POST   | /budgets/:id     | budgets.js | Create a new budget      |
| GET    | /budgets/all/:id | budgets.js | View all budgets of user |
| GET    | /budgets/:id     | budgets.js | View one budget of user  |
| PUT    | /budgets/:id     | budgets.js | Update one budget        |

## Dependencies

- axios
- bcryptjs
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- passport
- passport-jwt

## Further Thoughts

Notes aboud stretch goals and problem areas TK.