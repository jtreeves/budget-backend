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
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'susan@email.com',
                password: 'susan1234'
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
describe('GET route for budgets/:id', () => {
    it('displays data for a specific budget', async () => {
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
        const foundBudget = await db.Budget.findOne({
            user: foundUser._id
        })
        const getBudget = await request(app)
            .get(`/budgets/${foundBudget._id}`)
            .set('Authorization', loggingUser.body.token)
        console.log(`FOUND BUDGET._ID: ${foundBudget._id}`)
        console.log(`GET BUDGET.BODY.BUDGET._ID: ${getBudget.body.budget._id}`)
        console.log(`GET BUDGET.BODY.BUDGET KEYS: ${Object.keys(getBudget.body.budget)}`)
        expect(getBudget).to.exist
        expect(getBudget.body.budget).to.have.property('categories')
        expect(getBudget.body.budget._id).to.equal(foundBudget._id)
    })
})