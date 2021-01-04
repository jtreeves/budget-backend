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
let dbUsers = {}
let dbBudgets = {}

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
            name: users.adam.name,
            email: users.adam.email,
            password: users.adam.password
        })
    
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.debra.name,
            email: users.debra.email,
            password: users.debra.password
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.john.name,
            email: users.john.email,
            password: users.john.password
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.susan.name,
            email: users.susan.email,
            password: users.susan.password
        })
})

// Find users in database
before(async () => {
    dbAdamUser = await db.User.findOne({
        email: users.adam.email
    })
    dbUsers.adam = dbAdamUser

    dbDebraUser = await db.User.findOne({
        email: users.debra.email
    })
    dbUsers.debra = dbDebraUser

    dbJohnUser = await db.User.findOne({
        email: users.john.email
    })
    dbUsers.john = dbJohnUser

    dbSusanUser = await db.User.findOne({
        email: users.susan.email
    })
    dbUsers.susan = dbSusanUser
})

// Find budgets in database
before(async () => {
    dbAdamBudget = await db.Budget.findOne({
        user: dbAdamUser._id
    })
    dbBudgets.adam = dbAdamBudget

    dbDebraBudget = await db.Budget.findOne({
        user: dbDebraUser._id
    })
    dbBudgets.debra = dbDebraBudget

    dbJohnBudget = await db.Budget.findOne({
        user: dbJohnUser._id
    })
    dbBudgets.john = dbJohnBudget

    dbSusanBudget = await db.Budget.findOne({
        user: dbSusanUser._id
    })
    dbBudgets.susan = dbSusanBudget
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