// Import external dependencies
const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
chai.should()

// Import internal dependencies
const db = require('../models/Budget')
const route = require('../controllers/budgets')