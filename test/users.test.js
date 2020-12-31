// Import external dependencies
const expect = require('chai').expect
const assert = require('chai').assert

// Import internal dependencies
const db = require('../models/User')
const route = require('../controllers/users')

// Delete all users before running each test
beforeEach(async () => {
    await db.deleteMany({})
})

// Test POST route for users/signup
describe('POST route for users/signup', () => {
    it('should create a new user', () => {
        db.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: 'john1234'
        })
    })
})