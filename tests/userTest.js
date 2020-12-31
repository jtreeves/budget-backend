// Tests for the users routes

const assert = require('assert')
const db = require('../models/User')
const route = require('../controllers/users')

beforeEach(async () => {
    await db.deleteMany({})
})

describe('POST route for users/signup', () => {
    it('should create a new user', () => {
        db.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: 'john1234'
        })
    })
})