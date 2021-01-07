# Kaleidoscope Backend

This is the backend repository for the Kaleidoscope app. It contains the code necessary for the server to manipulate the data for the app. It was designed to work with the app's [frontend repository](https://github.com/jtreeves/budget-frontend). To use the entire app, visit the [Kaleidoscope](https://kaleidoscope-budget.herokuapp.com) site.

**Contents**

1. [About](https://github.com/jtreeves/budget-backend#about)
2. [Installation](https://github.com/jtreeves/budget-backend#installation)
3. [Explanation](https://github.com/jtreeves/budget-backend#explanation)
4. [Features](https://github.com/jtreeves/budget-backend#features)
5. [Models](https://github.com/jtreeves/budget-backend#models)
6. [Routes](https://github.com/jtreeves/budget-backend#routes)
7. [Dependencies](https://github.com/jtreeves/budget-backend#dependencies)
8. [Code Examples](https://github.com/jtreeves/budget-backend#code-examples)
9. [Stretch Goals](https://github.com/jtreeves/budget-backend#stretch-goals)

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

Alternatively, you may use the live version of the [Kaleidoscope](https://kaleidoscope-budget.herokuapp.com) app.

## Explanation

We knew that we wanted to produce a budgeting app, but we were initially unsure of how to differentiate it from other apps in the market. We decided to focus on the big picture. Unlike other apps, which emphasize your day-to-day budget concerns, our app emphasizes how basic changes to your budget plan can result in dramatic changes overall. Instead of having the user only build one budget that they update regularly, we gave the user the option to build out multiple budgets and compare them. We also included the ability to compare your budget to different locations. Some places are more expensive to live than others, as noted by their different price indexes. We wanted to allow the user to specifically see how those price differences would affect their budget. For example, your expenses would go up if you moved from Atlanta to Los Angeles, and our app allows you to see just by how much. In order to provide the user with that functionality, we implemented the Numbeo API.

## Features

- Models for users and budgets with full CRUD functionality
- Flexible schemas to allow users to upload a variety of fields to the budget documents
- Routes for accessing models
- Authentication measures to protect user information
- Tests for all routes

## Models

![ERD](/images/erd.png)

## Routes

| Method | Path             | File       | Description                    |
| ------ | ---------------- | ---------- | ------------------------------ |
| POST   | /users/signup    | users.js   | Sign up a new user             |
| POST   | /users/login     | users.js   | Log in an existing user        |
| GET    | /users/:id       | users.js   | Display a user's data          |
| PUT    | /users/:id       | users.js   | Update a user's data           |
| DELETE | /users/:id       | users.js   | Delete a user's account        |
| POST   | /budgets/:id     | budgets.js | Create a new budget            |
| GET    | /budgets/all/:id | budgets.js | View all of a user's budgets   |
| GET    | /budgets/:id     | budgets.js | View one of a user's budgets   |
| PUT    | /budgets/:id     | budgets.js | Update one of a user's budgets |
| DELETE | /budgets/:id     | budgets.js | Delete one of a user's budgets |

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

## Code Examples

**Flexible schemas allow the user to input fields with whatever names they want**
```javascript
const foodSchema = new Schema({
    inputs: { type: Schema.Types.Mixed, default: {} },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })
```

**Protected routes ensure only the user can access their budget information**
```javascript
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({
            _id: req.params.id
        })
        res.status(200).json({budget: currentBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})
```

**Tests confirm new users get hashed passwords and users cannot sign up with existing email accounts**
```javascript
describe('USERS: POST route for /signup', () => {
    it('creates a new user and saves it to the database with a hashed password and a date field', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: users.bryan.name,
                email: users.bryan.email,
                password: users.bryan.password
            })
        const foundUser = await db.User.findOne({
            email: users.bryan.email
        })
        expect(newUser.status).to.equal(200)
        expect(foundUser).to.exist
        expect(foundUser.password).to.not.equal(users.bryan.password)
        expect(foundUser).to.have.property('date')
    })

    it('fails to create a user if email already in use', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: users.adam.name,
                email: users.adam.email,
                password: users.adam.password
            })
        expect(newUser.body.msg).to.equal('Email already in use')
    })
})
```

## Stretch Goals

- Add more explanatory information to the Compare Locations pages to clarify to the user just what this information means for them and their budgetary concerns
- Deploy an alternate version of the app that does not use the Numbeo API
- While our app is designed for desktop use and not mobile use, we could make its design more responsive (it already is responsive, but it is not as mobile friendly as the user might want)
- While our app is designed for personal use and not social networking, we could build out the profile section to let users upload a profile image and about text
- Include more tests and a seeder file for development purposes
- Create a separate organization page on GitHub to host the repositories, instead of having them hosted by a specific team member

**READY FOR CODE REVIEW**