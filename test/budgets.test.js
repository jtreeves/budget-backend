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
        console.log(`LOGGING USER.BODY.TOKEN: ${loggingUser.body.token}`)
        const currentUser = await request(app)
            .get('/users/current')
            .set('Authorization', loggingUser.body.token)
        console.log(`CURRENT USER.BODY.ID: ${currentUser.body.id}`)
        const newBudget = await request(app)
            .post(`/budgets/${currentUser.body.id}`)
            .set('Authorization', loggingUser.body.token)
            .send({
                user: currentUser.body.id,
                title: 'test title',
                colorScheme: 'test color',
                categories: {
                    housing: {
                        // inputs: housing.inputs
                    },
                    utility: {
                        // inputs: utility.inputs
                    },
                    food: {
                        // inputs: food.inputs
                    },
                    transportation: {
                        // inputs: transportation.inputs
                    },
                    entertainment: {
                        // inputs: entertainment.inputs
                    },
                    misc: {
                        // inputs: misc.inputs
                    },
                    income: {
                        // inputs: income.inputs
                    }
                }
            })
        console.log(`NEW BUDGET: ${newBudget}`)
        const foundBudgets = await db.Budget.find({
            user: currentUser.body.id
        })
        console.log(`FOUND BUDGETS: ${foundBudgets}`)
        expect(newBudget).to.exist
        expect(foundBudgets).to.have.lengthOf.above(1)
    })
})