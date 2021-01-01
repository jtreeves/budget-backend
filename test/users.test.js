// Import external dependencies
const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
chai.should()

// Import internal dependencies
const app = require('../server')
const db = require('../models')
// const route = require('../controllers/users')

// Delete all users before running each test
beforeEach(async () => {
    await db.User.deleteMany({})
})

// Test POST route for users/signup
describe('POST route for users/signup', () => {
    it('should create a new user', (done) => {
        request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'John Doe',
                email: 'john@email.com',
                password: 'john1234'
            })
            .expect(201, done)
    })
})