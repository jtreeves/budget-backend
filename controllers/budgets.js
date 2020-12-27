// Import external dependencies
require('dotenv').config()
const express = require('express')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create GET route for budgets/test
router.get('/test', (req, res) => {
    res.json({msg: 'Viewing the test page for the budgets routes'})
})

// Create GET route for budgets/:id
router.get('/:id', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(201).json({budget: currentBudget})
    } catch(error) {
        console.log(`BUDGET ERROR: ${error}`)
    }
})

// Export router
module.exports = router