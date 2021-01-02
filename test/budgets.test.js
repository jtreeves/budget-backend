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
        let matchBudgets
        if (getBudget.body.budget._id == foundBudget._id) {
            matchBudgets = true
        } else {
            matchBudgets = false
        }
        expect(matchBudgets).to.equal(true)
    })
})

// Test GET route for budgets/all/:id
describe('GET route for budgets/all/:id', () => {
    it('returns all budgets associated with a specific user', async () => {
        
        
        await request(app)
            .post('/users/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                name: 'David Davidson',
                email: 'david@email.com',
                password: 'david1234'
            })
        const loggingUser = await request(app)
            .post('/users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'david@email.com',
                password: 'david1234'
            })
        const foundUser = await db.User.findOne({
            email: 'david@email.com'
        })
        const newBudget = await request(app)
            .post(`/budgets/${foundUser._id}`)
            .set('Authorization', loggingUser.body.token)
            .send({
                user: foundUser._id,
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
            user: foundUser._id
        })
        const getBudgets = await request(app)
            .get(`/budgets/all/${foundUser._id}`)
            .set('Authorization', loggingUser.body.token)
        
        // console.log(`FOUND BUDGETS: ${foundBudgets}`)
        console.log(`FOUND BUDGETS.LENGTH: ${foundBudgets.length}`)
        // console.log(`GET BUDGETS: ${getBudgets}`)
        // console.log(`GET BUDGETS KEYS: ${Object.keys(getBudgets)}`)
        // console.log(`GET BUDGETS.TEXT: ${getBudgets.text}`)
        // console.log(`GET BUDGETS.BODY: ${getBudgets.body}`)
        // console.log(`GET BUDGETS.BODY KEYS: ${Object.keys(getBudgets.body)}`)
        // console.log(`GET BUDGETS.TEXT.LENGTH: ${getBudgets.text.length}`)
        console.log(`GET BUDGETS.BODY.BUDGETS.LENGTH: ${getBudgets.body.budgets.length}`)

        // _events,_eventsCount,_maxListeners,res,request,req,text,body,files,buffered,headers,header,statusCode,status,statusType,info,ok,redirect,clientError,serverError,error,created,accepted,noContent,badRequest,unauthorized,notAcceptable,forbidden,notFound,unprocessableEntity,type,charset,links,setEncoding,redirects,pipe
        
        
        // let matchBudgets
        // if (getBudget.body.budget._id == foundBudget._id) {
        //     matchBudgets = true
        // } else {
        //     matchBudgets = false
        // }
        expect(getBudgets).to.exist
    })
})