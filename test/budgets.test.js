// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const { dbUsers, dbBudgets } = require('./server.test')
// const dbBudgets = require('./app.test')
const users = require('../seeders/userSeeder')

// Test POST route for budgets/:id
describe('BUDGETS: POST route for /:id', () => {
    it('creates a new budget for an existing user and saves it to the database', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users[1].email,
                password: users[1].password
            })
        const currentUser = await request(app)
            .get('/users/current')
            .set('Authorization', loggingUser.body.token)
        const newBudget = await request(app)
            .post(`/budgets/${currentUser.body.id}`)
            .set('Authorization', loggingUser.body.token)
            .send({
                user: currentUser.body.id,
                title: 'Test Budget',
                colorScheme: 'Not Green',
                categories: {
                    housing: {inputs: {}},
                    utility: {inputs: {}},
                    food: {inputs: {}},
                    transportation: {inputs: {}},
                    entertainment: {inputs: {}},
                    misc: {inputs: {}},
                    income: {inputs: {}}  
                }
            })
        const foundBudgets = await db.Budget.find({
            user: currentUser.body.id
        })
        expect(newBudget).to.exist
        expect(foundBudgets).to.have.lengthOf.above(1)
    })
})

// Test GET route for budgets/:id
describe('BUDGETS: GET route for /:id', () => {
    it('displays data for a specific budget', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users[2].email,
                password: users[2].password
            })
        // const foundUser = await db.User.findOne({
        //     email: users[2].email
        // })
        // const foundBudget = await db.Budget.findOne({
        //     user: foundUser._id
        // })
        console.log(`DB BUDGETS: ${dbBudgets}`)
        console.log(`DB BUDGETS[2]: ${dbBudgets[2]}`)
        console.log(`DB BUDGETS[2] KEYS: ${Object.keys(dbBudgets[2])}`)
        const getBudget = await request(app)
            .get(`/budgets/${dbBudgets[2]._id}`)
            .set('Authorization', loggingUser.body.token)
        let matchBudgets
        if (getBudget.body.budget._id == dbBudgets[2]._id) {
            matchBudgets = true
        } else {
            matchBudgets = false
        }
        expect(matchBudgets).to.equal(true)
    })
})

// Test GET route for budgets/all/:id
describe('BUDGETS: GET route for /all/:id', () => {
    it('returns all budgets associated with a specific user', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users[1].email,
                password: users[1].password
            })
        const foundUser = await db.User.findOne({
            email: users[1].email
        })
        const foundBudgets = await db.Budget.find({
            user: foundUser._id
        })
        const getBudgets = await request(app)
            .get(`/budgets/all/${foundUser._id}`)
            .set('Authorization', loggingUser.body.token)
        expect(getBudgets.body.budgets.length).to.equal(foundBudgets.length)
    })
})

// THIS PASSES BUT DOES NOT UPDATE BUDGET'S TITLE
// Test PUT route for budgets/:id
describe('BUDGETS: PUT route for /:id', () => {
    it('updates a specific budget', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users[2].email,
                password: users[2].password
            })
        const foundUser = await db.User.findOne({
            email: users[2].email
        })
        const foundBudget = await db.Budget.findOne({
            user: foundUser._id
        })
        const updatedBudget = await request(app)
            .put(`/budgets/${foundBudget._id}`)
            .set('Authorization', loggingUser.body.token)
            .send({
                _id: foundBudget._id,
                title: 'Updated Budget Name'
            })
        expect(updatedBudget.status).to.equal(200)
    })
})

// THIS WORKS BUT IT LETS YOU DELETE THE A USER'S ONLY BUDGET
// Test DELETE route for budgets/:id
describe('BUDGETS: DELETE route for /:id', () => {
    it('deletes a specific budget', async () => {
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: users[2].email,
                password: users[2].password
            })
        const foundUser = await db.User.findOne({
            email: users[2].email
        })
        const foundBudget = await db.Budget.findOne({
            user: foundUser._id
        })
        const deletedBudget = await request(app)
            .delete(`/budgets/${foundBudget._id}`)
            .set('Authorization', loggingUser.body.token)
            .send({
                _id: foundBudget._id
            })
        expect(deletedBudget.status).to.equal(200)
    })
})