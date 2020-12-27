// Import external dependencies
require('dotenv').config()
const express = require('express')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create GET route for budgets/test
router.get('/test', (req, res) => {
    res.json({msg: 'Viewing the test page for the Budget model'})
})

// Create GET route for budgets/:id
router.get('/:id', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({budget: currentBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/housing
router.get('/:id/housing', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({housing: currentBudget.housing})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/utility
router.get('/:id/utility', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({utility: currentBudget.utility})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/grocery
router.get('/:id/grocery', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({grocery: currentBudget.grocery})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/income
router.get('/:id/income', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({income: currentBudget.income})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id/housing
router.put('/:id/housing', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'housing.categories.rent': req.body.rent,
                'housing.categories.mortgage': req.body.mortgage,
                'housing.categories.hostel': req.body.hostel
            }}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id/utility
router.put('/:id/utility', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'utility.categories.electric': req.body.electric,
                'utility.categories.water': req.body.water
            }}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id/grocery
router.put('/:id/grocery', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'grocery.categories.food': req.body.food,
                'grocery.categories.drink': req.body.drink
            }}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id/income
router.put('/:id/income', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'income.categories.salary': req.body.salary,
                'income.categories.investment': req.body.investment,
                'income.categories.trust': req.body.trust,
                'income.categories.lottery': req.body.lottery
            }}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router