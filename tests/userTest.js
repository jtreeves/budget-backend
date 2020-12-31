// Tests for the users routes

const assert = require('assert')
const db = require('../models')
// const routes = require('../controllers')

beforeEach(async () => {
    await db.User.deleteMany({})
})

describe('POST route for users/signup', () => {
    it('should create a new user', () => {
        db.User.create({
            name: 'John Doe',
            email: 'john@email.com',
            password: 'john1234'
        })
    })
})