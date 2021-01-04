// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const users = require('../seeders/users')
const { dbUsers, tokens } = require('./server.test')

// Test POST route for users/signup
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
        expect(foundUser.password).to.not.equal('mark1234')
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

// Test POST route for users/login
describe('USERS: POST route for /login', () => {
    it('authenticates a user with the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.mark.email,
                password: users.mark.password
            })
        expect(currentUser.status).to.equal(200)
    })

    it('fails to authenticate a user without the correct email-password combination', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.rebecca.email,
                password: 'notcorrectpassword'
            })
        expect(currentUser.body.msg).to.equal('Password is incorrect')
    })

    it('rejects a user without an existing account', async () => {
        const currentUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users.caroline.email,
                password: users.caroline.password
            })
        expect(currentUser.body.msg).to.equal('User not found')
    })
})

// Test GET route for users/current
describe('USERS: GET route for /current', () => {
    it('displays info of authenticated user', async () => {
        const currentUser = await request(app)
            .get('/users/current')
            .set('Authorization', tokens.john)
        console.log(`CURRENT USER: ${currentUser}`)
        console.log(`CURRENT USER.BODY: ${currentUser.body}`)
        console.log(`CURRENT USER.BODY.MSG: ${currentUser.body.msg}`)
        console.log(`CURRENT USER KEYS: ${Object.keys(currentUser)}`)
        console.log(`CURRENT USER.BODY KEYS: ${Object.keys(currentUser.body)}`)
        console.log(`CURRENT USER.BODY.MSG KEYS: ${Object.keys(currentUser.body.msg)}`)
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
        const currentUser = await request(app)
            .put('/users/current')
            .set('Authorization', tokens.adam)
            .send({
                _id: dbUsers.adam._id,
                name: 'Adam Is Awesome'
            })
        expect(currentUser.status).to.equal(200)
    })
})

// THIS TEST PASSES BUT DOESN'T DELETE ANYTHING
// Test DELETE route for users/current
describe('USERS: DELETE route for /current', () => {
    it('deletes a user', async () => {
        const deletedUser = await request(app)
            .delete('/users/current')
            .set('Authorization', tokens.susan)
            .send({
                _id: dbUsers.susan._id
            })
        expect(deletedUser.status).to.equal(200)
    })
})