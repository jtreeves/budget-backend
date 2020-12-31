// Import external dependencies
const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
chai.should()

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