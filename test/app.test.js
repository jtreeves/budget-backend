// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const usersList = require('../seeders/userSeeder')

// Create new variables for four new test users from list
let adamUser, debraUser, johnUser, susanUser

// Create new variables for database versions of test users
let dbAdam, dbDebra, dbJohn, dbSusan

// Create new variables for users' budgets
let adamFirstBudget, debraFirstBudget, johnFirstBudget, susanFirstBudget

// Create array to store database versions of test users
const dbUsers = [dbAdam, dbDebra, dbJohn, dbSusan]

// Create array to store budgets
const dbBudgets = [adamFirstBudget, debraFirstBudget, johnFirstBudget, susanFirstBudget]

// Delete all existing users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Create four new test users before running tests
before(async () => {
    adamUser = await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: usersList[0].name,
            email: usersList[0].email,
            password: usersList[0].password
        })
    
    debraUser = await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: usersList[1].name,
            email: usersList[1].email,
            password: usersList[1].password
        })

    johnUser = await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: usersList[2].name,
            email: usersList[2].email,
            password: usersList[2].password
        })

    susanUser = await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: usersList[3].name,
            email: usersList[3].email,
            password: usersList[3].password
        })
})

// Find users in database
before(async () => {
    dbAdam = await db.User.findOne({
        email: userList[0].email
    })

    dbDebra = await db.User.findOne({
        email: userList[1].email
    })

    dbJohn = await db.User.findOne({
        email: userList[2].email
    })

    dbSusan = await db.User.findOne({
        email: userList[3].email
    })
})

// Find budgets in database
before(async () => {
    adamFirstBudget = await db.Budget.findOne({
        user: dbAdam._id
    })

    debraFirstBudget = await db.Budget.findOne({
        user: dbDebra._id
    })

    johnFirstBudget = await db.Budget.findOne({
        user: dbJohn._id
    })
    
    susanFirstBudget = await db.Budget.findOne({
        user: dbSusan._id
    })
})

// Test home page
describe('SERVER: GET route for /', () => {
    it('accesses backend and displays stored message', async () => {
        const user = await request(app)
            .get('/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
        expect(user.status).to.equal(200)
        expect(user.body.msg).to.equal('Viewing the backend of the Kaleidoscope app')
    })
})

module.exports = dbUsers, dbBudgets