// Import external dependencies
require('dotenv').config()
const express = require('express')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Export router
module.exports = router