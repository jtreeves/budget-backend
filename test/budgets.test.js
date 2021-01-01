// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')

// Delete all users and budgets before running tests
before(async () => {
    await db.User.deleteMany({})
    await db.Budget.deleteMany({})
})

// Test POST route for budgets/:id
describe('POST route for budgets/:id', () => {
    it('creates a new budget for an existing user and saves it to the database', async () => {
        await request(app)
        .post('/users/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            name: 'Susan Smith',
            email: 'susan@email.com',
            password: 'susan1234'
        })
        const foundUser = await db.User.findOne({
            email: 'susan@email.com'
        })
        const newBudget = await request(app)
            .post(`/budgets/${foundUser._id}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                user: foundUser._id
            })
        const foundBudgets = await db.Budget.find({
            user: foundUser._id
        })
        expect(newBudget).to.exist
        expect(foundBudgets).to.have.lengthOf.above(1)
    })
})