// Import external dependencies
const request = require('supertest')
const expect = require('chai').expect

// Import internal dependencies
const app = require('../server')
const db = require('../models')
const budgets = require('../seeders/budgets')
const { dbUsers, dbBudgets, tokens } = require('./server.test')

// Test POST route for budgets/:id
describe('BUDGETS: POST route for /:id', () => {
    it('creates a new budget for an existing user and saves it to the database', async () => {
        const newBudget = await request(app)
            .post(`/budgets/${dbUsers.john._id}`)
            .set('Authorization', tokens.john)
            .send({
                user: dbUsers.john._id,
                title: 'A Nice Simple Budget',
                colorScheme: 'Blue',
                location: 'Chicago, IL',
                income: 800000,
                categories: budgets.empty.categories
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

// Test PUT route for budgets/:id
describe('BUDGETS: PUT route for /:id', () => {
    it('updates a specific budget', async () => {
        const updatedBudget = await request(app)
            .put(`/budgets/${dbBudgets.john._id}`)
            .set('Authorization', tokens.john)
            .send({
                _id: dbBudgets.john._id,
                title: 'Updated Budget for John',
                colorScheme: 'Orange',
                location: 'Nashville, TN',
                income: 50000,
                categories: {
                    housing: {
                        inputs: {
                            'rent': 1000
                        }
                    },
                    utility: {
                        inputs: {
                            'water': 100,
                            'electric': 100
                        }
                    },
                    food: {
                        inputs: {
                            'grocery': 200,
                            'restaurant': 150
                        }
                    },
                    transportation: {
                        inputs: {
                            'gas': 350
                        }
                    },
                    entertainment: {
                        inputs: {
                            'books': 75,
                            'movies': 85
                        }
                    },
                    misc: {
                        inputs: {
                            'flower': 1
                        }
                    }
                }
            })
        expect(updatedBudget.status).to.equal(200)
    })
})

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