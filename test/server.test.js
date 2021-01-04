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
    const dbAdamUser = await db.User.findOne({
        email: users.adam.email
    })
    dbUsers.adam = dbAdamUser

    const dbDebraUser = await db.User.findOne({
        email: users.debra.email
    })
    dbUsers.debra = dbDebraUser

    const dbJohnUser = await db.User.findOne({
        email: users.john.email
    })
    dbUsers.john = dbJohnUser

    const dbMarkUser = await db.User.findOne({
        email: users.mark.email
    })
    dbUsers.mark = dbMarkUser

    const dbRebeccaUser = await db.User.findOne({
        email: users.rebecca.email
    })
    dbUsers.rebecca = dbRebeccaUser

    const dbSusanUser = await db.User.findOne({
        email: users.susan.email
    })
    dbUsers.susan = dbSusanUser
})

// Create budgets for new users
before(async () => {
    const dbAdamBudget = await db.Budget.createOne({
        user: dbUsers.adam._id,
        title: budgets.rich.title,
        colorScheme: budgets.rich.colorScheme,
        location: budgets.rich.location,
        income: budgets.rich.income,
        categories: {
            housing: budgets.rich.housing,
            utility: budgets.rich.utility,
            food: budgets.rich.food,
            transportation: budgets.rich.transportation,
            entertainment: budgets.rich.entertainment,
            misc: budgets.rich.misc
        }
    })
    dbBudgets.adam = dbAdamBudget

    const dbAdamBudget = await request(app)
        .post(`/budgets/${dbUsers.adam._id}`)
        .set('Authorization', tokens.adam)
        .send({
            user: dbUsers.adam._id,
            title: budgets.rich.title,
            colorScheme: budgets.rich.colorScheme,
            location: budgets.rich.location,
            income: budgets.rich.income,
            categories: {
                housing: budgets.rich.housing,
                utility: budgets.rich.utility,
                food: budgets.rich.food,
                transportation: budgets.rich.transportation,
                entertainment: budgets.rich.entertainment,
                misc: budgets.rich.misc
            }
        })
    dbBudgets.adam = dbAdamBudget.body.budget

    const dbAdamBudget = await request(app)
        .post(`/budgets/${dbUsers.adam._id}`)
        .set('Authorization', tokens.adam)
        .send({
            user: dbUsers.adam._id,
            title: budgets.rich.title,
            colorScheme: budgets.rich.colorScheme,
            location: budgets.rich.location,
            income: budgets.rich.income,
            categories: {
                housing: budgets.rich.housing,
                utility: budgets.rich.utility,
                food: budgets.rich.food,
                transportation: budgets.rich.transportation,
                entertainment: budgets.rich.entertainment,
                misc: budgets.rich.misc
            }
        })
    dbBudgets.adam = dbAdamBudget.body.budget

    const dbAdamBudget = await request(app)
        .post(`/budgets/${dbUsers.adam._id}`)
        .set('Authorization', tokens.adam)
        .send({
            user: dbUsers.adam._id,
            title: budgets.rich.title,
            colorScheme: budgets.rich.colorScheme,
            location: budgets.rich.location,
            income: budgets.rich.income,
            categories: {
                housing: budgets.rich.housing,
                utility: budgets.rich.utility,
                food: budgets.rich.food,
                transportation: budgets.rich.transportation,
                entertainment: budgets.rich.entertainment,
                misc: budgets.rich.misc
            }
        })
    dbBudgets.adam = dbAdamBudget.body.budget

    const dbAdamBudget = await request(app)
        .post(`/budgets/${dbUsers.adam._id}`)
        .set('Authorization', tokens.adam)
        .send({
            user: dbUsers.adam._id,
            title: budgets.rich.title,
            colorScheme: budgets.rich.colorScheme,
            location: budgets.rich.location,
            income: budgets.rich.income,
            categories: {
                housing: budgets.rich.housing,
                utility: budgets.rich.utility,
                food: budgets.rich.food,
                transportation: budgets.rich.transportation,
                entertainment: budgets.rich.entertainment,
                misc: budgets.rich.misc
            }
        })
    dbBudgets.adam = dbAdamBudget.body.budget

    const dbAdamBudget = await request(app)
        .post(`/budgets/${dbUsers.adam._id}`)
        .set('Authorization', tokens.adam)
        .send({
            user: dbUsers.adam._id,
            title: budgets.rich.title,
            colorScheme: budgets.rich.colorScheme,
            location: budgets.rich.location,
            income: budgets.rich.income,
            categories: {
                housing: budgets.rich.housing,
                utility: budgets.rich.utility,
                food: budgets.rich.food,
                transportation: budgets.rich.transportation,
                entertainment: budgets.rich.entertainment,
                misc: budgets.rich.misc
            }
        })
    dbBudgets.adam = dbAdamBudget.body.budget
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