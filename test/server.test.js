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

// Create functions for creating users and budgets
async function createUser(user) {
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: user.name,
            email: user.email,
            password: user.password
        })
}

async function loggingUser(user) {
    const loggedUser = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: user.email,
            password: user.password
        })
    console.log(`LOGGED USER: ${loggedUser}`)
    console.log(`LOGGED USER.BODY: ${loggedUser.body}`)
    console.log(`LOGGED USER.BODY.TOKEN: ${loggedUser.body.token}`)
    console.log(`LOGGED USER KEYS: ${Object.keys(loggedUser)}`)
    console.log(`LOGGED USER.BODY KEYS: ${Object.keys(loggedUser.body)}`)
    return loggedUser.body.token
}

// Delete all existing users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Create new test users before running tests
before(() => {
    createUser(users.adam)
    createUser(users.debra)
    createUser(users.john)
    createUser(users.mark)
    createUser(users.rebecca)
    createUser(users.susan)
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
    console.log(`TOKENS.ADAM: ${tokens.adam}`)
    
    // const loggingDebra = await request(app)
    //     .post('/users/login')
    //     .set('Content-Type', 'application/x-www-form-urlencoded')
    //     .send({
    //         email: users.debra.email,
    //         password: users.debra.password
    //     })
    // tokens.debra = loggingDebra.body.token
    // const loggingDebra = loggingUser(users.debra)
    tokens.debra = loggingUser(users.debra)
    console.log(`TOKENS.DEBRA: ${tokens.debra}`)
    console.log(`TOKENS.DEBRA KEYS: ${Object.keys(tokens.debra)}`)

    const loggingJohn = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: users.john.email,
            password: users.john.password
        })
    tokens.john = loggingJohn.body.token
    console.log(`TOKENS.JOHN: ${tokens.john}`)

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
    const dbAdamBudget = await db.Budget.create({
        user: dbUsers.adam._id,
        title: 'Adam Budget',
        colorScheme: budgets.rich.colorScheme,
        location: budgets.rich.location,
        income: budgets.rich.income,
        categories: budgets.rich.categories
    })
    dbBudgets.adam = dbAdamBudget

    const dbDebraBudget = await db.Budget.create({
        user: dbUsers.debra._id,
        title: 'Debra Budget',
        colorScheme: budgets.rich.colorScheme,
        location: budgets.rich.location,
        income: budgets.rich.income,
        categories: budgets.rich.categories
    })
    dbBudgets.debra = dbDebraBudget

    const dbJohnBudget = await db.Budget.create({
        user: dbUsers.john._id,
        title: 'John Budget',
        colorScheme: budgets.rich.colorScheme,
        location: budgets.rich.location,
        income: budgets.rich.income,
        categories: budgets.rich.categories
    })
    dbBudgets.john = dbJohnBudget

    const dbMarkBudget = await db.Budget.create({
        user: dbUsers.mark._id,
        title: 'Mark Budget',
        colorScheme: budgets.poor.colorScheme,
        location: budgets.poor.location,
        income: budgets.poor.income,
        categories: budgets.poor.categories
    })
    dbBudgets.mark = dbMarkBudget

    const dbRebeccaBudget = await db.Budget.create({
        user: dbUsers.rebecca._id,
        title: 'Rebecca Budget',
        colorScheme: budgets.full.colorScheme,
        location: budgets.full.location,
        income: budgets.full.income,
        categories: budgets.full.categories
    })
    dbBudgets.rebecca = dbRebeccaBudget

    const dbSusanBudget = await db.Budget.create({
        user: dbUsers.susan._id,
        title: 'Susan Budget',
        colorScheme: budgets.rich.colorScheme,
        location: budgets.rich.location,
        income: budgets.rich.income,
        categories: budgets.rich.categories
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