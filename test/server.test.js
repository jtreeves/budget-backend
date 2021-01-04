// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const users = require('../seeders/users')
const budgets = require('../seeders/budgets')

// Create objects for holding users, budgets, and tokens
let dbUsers = {}
let dbBudgets = {}
let tokens = {}

// Delete all existing users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Create new test users before running tests
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
            name: users.mark.name,
            email: users.mark.email,
            password: users.mark.password
        })

    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: users.rebecca.name,
            email: users.rebecca.email,
            password: users.rebecca.password
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

// Log in newly created users and grab their tokens
before(async () => {
    const loggingAdam = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.adam.email,
            password: users.adam.password
        })
    tokens.adam = loggingAdam.body.token
    
    const loggingDebra = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.debra.email,
            password: users.debra.password
        })
    tokens.debra = loggingDebra.body.token

    const loggingJohn = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.john.email,
            password: users.john.password
        })
    tokens.john = loggingJohn.body.token

    const loggingMark = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.mark.email,
            password: users.mark.password
        })
    tokens.mark = loggingMark.body.token

    const loggingRebecca = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.rebecca.email,
            password: users.rebecca.password
        })
    tokens.rebecca = loggingRebecca.body.token

    const loggingSusan = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.susan.email,
            password: users.susan.password
        })
    tokens.susan = loggingSusan.body.token
})

// Find new users in database
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

    dbMarkUser = await db.User.findOne({
        email: users.mark.email
    })
    dbUsers.mark = dbMarkUser

    dbRebeccaUser = await db.User.findOne({
        email: users.rebecca.email
    })
    dbUsers.rebecca = dbRebeccaUser

    dbSusanUser = await db.User.findOne({
        email: users.susan.email
    })
    dbUsers.susan = dbSusanUser
})

// Create budgets for new users
before(async () => {
    
    
    
    
    const newBudget = await request(app)
            .post(`/budgets/${dbUsers.john._id}`)
            .set('Authorization', tokens.john)
            .send({
                user: dbUsers.john._id,
                title: 'Test Budget',
                colorScheme: 'Not Green',
                location: 'New York, NY',
                income: 1000000,
                categories: {
                    housing: {inputs: {}},
                    utility: {inputs: {}},
                    food: {inputs: {}},
                    transportation: {inputs: {}},
                    entertainment: {inputs: {}},
                    misc: {inputs: {}}
                }
            })
    
    
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

    dbMarkBudget = await db.Budget.findOne({
        user: dbMarkUser._id
    })
    dbBudgets.mark = dbMarkBudget

    dbRebeccaBudget = await db.Budget.findOne({
        user: dbRebeccaUser._id
    })
    dbBudgets.rebecca = dbRebeccaBudget

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

module.exports = { dbUsers, dbBudgets, tokens }