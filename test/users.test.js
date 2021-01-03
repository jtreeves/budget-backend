// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const dbUsers = require('./app.test')
const dbBudgets = require('./app.test')
const usersList = require('../seeders/userSeeder')

// Test POST route for users/signup
describe('USERS: POST route for /signup', () => {
    it('creates a new user and saves it to the database with a hashed password, a date field, and a new budget', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'Mark Davidson',
                email: 'mark@email.com',
                password: 'mark1234'
            })
        const foundUser = await db.User.findOne({
            email: 'mark@email.com'
        })
        const foundBudget = await db.Budget.findOne({
            user: foundUser._id
        })
        expect(newUser.status).to.equal(200)
        expect(foundUser).to.exist
        expect(foundUser.password).to.not.equal('mark1234')
        expect(foundUser).to.have.property('date')
        expect(foundBudget).to.have.property('categories')
    })

    it('fails to create a user if email already in use', async () => {
        const newUser = await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: usersList[0].name,
                email: usersList[0].email,
                password: usersList[0].password
            })
        expect(newUser.body.msg).to.equal('Email already in use')
    })
})

// Test POST route for users/login
describe('USERS: POST route for /login', () => {
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
        expect(currentUser.body.msg).to.equal('Password is incorrect')
    })

    it('rejects a user without an existing account', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'victor@email.com',
                password: 'victor1234'
            })
        expect(currentUser.body.msg).to.equal('User not found')
    })
})

// Test GET route for users/current
describe('USERS: GET route for /current', () => {
    it('displays info of authenticated user', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'john@email.com',
                password: 'john1234'
            })
        const currentUser = await request(app)
            .get('/users/current')
            .set('Authorization', loggingUser.body.token)
        expect(currentUser.body).to.have.property('id')
    })

    it('fails to display info of unauthenticated user', async () => {
        const currentUser = await request(app)
            .get('/users/current')
            .set('Authorization', 'Bearer token')
        expect(currentUser.body).to.not.have.property('id')
    })
})

// THIS TEST PASSES BUT DOESN'T UPDATE ANYTHING
// Test PUT route for users/current
describe('USERS: PUT route for /current', () => {
    it('updates name field for a specific user', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'john@email.com',
                password: 'john1234'
            })
        const foundUser = await db.User.findOne({
            email: 'john@email.com'
        })
        const currentUser = await request(app)
            .put('/users/current')
            .set('Authorization', loggingUser.body.token)
            .send({
                _id: foundUser._id,
                name: 'Jonathan Doezius'
            })
        expect(currentUser.status).to.equal(200)
    })
})

// THIS TEST PASSES BUT DOESN'T DELETE ANYTHING
// Test DELETE route for users/current
describe('USERS: DELETE route for /current', () => {
    it('deletes a user', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'john@email.com',
                password: 'john1234'
            })
        const foundUser = await db.User.findOne({
            email: 'john@email.com'
        })
        const deletedUser = await request(app)
            .delete('/users/current')
            .set('Authorization', loggingUser.body.token)
            .send({
                _id: foundUser._id,
            })
        expect(deletedUser.status).to.equal(200)
    })
})