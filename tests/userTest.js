// Tests for the users routes

const assert = require('assert')
const db = require('../models')

describe('POST route for users/signup', () => {
    it('should save a new user without error', (done) => {
        const johnDoe = new db.User({
            name: 'John Doe',
            email: 'john@email.com',
            password: 'john1234'
        })
        johnDoe.save(done)
    })
})