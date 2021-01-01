// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')

// Delete all users and budgets before running each test
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
    await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'John Doe',
            email: 'john@email.com',
            password: 'john1234'
        })
})

// Test POST route for users/signup
describe('POST route for users/signup', () => {
    it('creates a new user and saves it to the database with a hashed password, a date field, and a new budget', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'Adam Smith',
                email: 'adam@email.com',
                password: 'adam1234'
            })
        const foundUser = await db.User.findOne({
            email: 'adam@email.com'
        })
        const foundBudget = await db.Budget.findOne({
            user: foundUser._id
        })
        expect(newUser.status).to.equal(200)
        expect(foundUser).to.exist
        expect(foundUser.password).to.not.equal('adam1234')
        expect(foundUser).to.have.property('date')
        expect(foundBudget).to.have.property('categories')
    })

    it('fails to create a user if email already in use', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'John Doe',
                email: 'john@email.com',
                password: 'john1234'
            })
        expect(newUser.status).to.equal(400)
    })
})

// Test POST route for users/login
describe('POST route for users/login', () => {
    it('authenticates a user with the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'john@email.com',
                password: 'john1234'
            })
        expect(currentUser.status).to.equal(200)
    })

    it('fails to authenticate a user without the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'john@email.com',
                password: 'notjohn1234'
            })
        expect(currentUser.status).to.equal(400)
    })

    it('rejects a user without an existing account', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'mark@email.com',
                password: 'mark1234'
            })
        expect(currentUser.status).to.equal(400)
    })
})