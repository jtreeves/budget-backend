// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const users = require('../seeders/userSeeder')

// Create new variables for test users and budgets
let dbAdamUser, dbDebraUser, dbJohnUser, dbSusanUser
let dbAdamBudget, dbDebraBudget, dbJohnBudget, dbSusanBudget

// Create arrays for holding users and budgets
let dbUsers = []
let dbBudgets = []

// Delete all existing users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Create four new test users before running tests
before(async () => {
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users[0].name,
            email: users[0].email,
            password: users[0].password
        })
    
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users[1].name,
            email: users[1].email,
            password: users[1].password
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users[2].name,
            email: users[2].email,
            password: users[2].password
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users[3].name,
            email: users[3].email,
            password: users[3].password
        })
})

// Find users in database
before(async () => {
    dbAdamUser = await db.User.findOne({
        email: users[0].email
    })
    dbUsers.push(dbAdamUser)

    dbDebraUser = await db.User.findOne({
        email: users[1].email
    })
    dbUsers.push(dbDebraUser)

    dbJohnUser = await db.User.findOne({
        email: users[2].email
    })
    dbUsers.push(dbJohnUser)

    dbSusanUser = await db.User.findOne({
        email: users[3].email
    })
    dbUsers.push(dbSusanUser)
})

// Find budgets in database
before(async () => {
    dbAdamBudget = await db.Budget.findOne({
        user: dbAdamUser._id
    })
    dbBudgets.push(dbAdamBudget)

    dbDebraBudget = await db.Budget.findOne({
        user: dbDebraUser._id
    })
    dbBudgets.push(dbDebraBudget)

    dbJohnBudget = await db.Budget.findOne({
        user: dbJohnUser._id
    })
    dbBudgets.push(dbJohnBudget)

    dbSusanBudget = await db.Budget.findOne({
        user: dbSusanUser._id
    })
    dbBudgets.push(dbSusanBudget)
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

module.exports = { dbUsers, dbBudgets }