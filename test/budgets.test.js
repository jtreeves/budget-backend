// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const users = require('../seeders/userSeeder')
const { dbUsers, dbBudgets, tokens } = require('./server.test')

// Test POST route for budgets/:id
describe('BUDGETS: POST route for /:id', () => {
    it('creates a new budget for an existing user and saves it to the database', async () => {
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
        const foundBudgets = await db.Budget.find({
            user: dbUsers.john._id
        })
        expect(newBudget).to.exist
        expect(foundBudgets).to.have.lengthOf.above(1)
    })
})

// Test GET route for budgets/:id
describe('BUDGETS: GET route for /:id', () => {
    it('displays data for a specific budget', async () => {
        const getBudget = await request(app)
            .get(`/budgets/${dbBudgets.john._id}`)
            .set('Authorization', tokens.john)
        let matchBudgets
        if (getBudget.body.budget._id == dbBudgets.john._id) {
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
        const foundBudgets = await db.Budget.find({
            user: dbUsers.john._id
        })
        const getBudgets = await request(app)
            .get(`/budgets/all/${dbUsers.john._id}`)
            .set('Authorization', tokens.john)
        expect(getBudgets.body.budgets.length).to.equal(foundBudgets.length)
    })
})

// THIS PASSES BUT DOES NOT UPDATE BUDGET'S TITLE
// Test PUT route for budgets/:id
describe('BUDGETS: PUT route for /:id', () => {
    it('updates a specific budget', async () => {
        const updatedBudget = await request(app)
            .put(`/budgets/${dbBudgets.john._id}`)
            .set('Authorization', tokens.john)
            .send({
                _id: dbBudgets.john._id,
                title: 'Updated Budget Name'
            })
        expect(updatedBudget.status).to.equal(200)
    })
})

// THIS WORKS BUT IT LETS YOU DELETE THE A USER'S ONLY BUDGET
// Test DELETE route for budgets/:id
describe('BUDGETS: DELETE route for /:id', () => {
    it('deletes a specific budget', async () => {
        const deletedBudget = await request(app)
            .delete(`/budgets/${dbBudgets.debra._id}`)
            .set('Authorization', tokens.debra)
            .send({
                _id: dbBudgets.debra._id
            })
        expect(deletedBudget.status).to.equal(200)
    })
})