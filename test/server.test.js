// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const usersList = require('../seeders/userSeeder')

// Create new variables for four new test users from list
let adamUser
let debraUser
let johnUser
let susanUser

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

// Delete all existing users and budgets after running tests
after(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Create four new test users after running tests
after(async () => {
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