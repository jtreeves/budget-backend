// Import external dependencies
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create JSON web token
const JWT_SECRET = process.env.JWT_SECRET

// Create POST route for budgets/:id
router.post('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { housing, utility, food, transportation, misc, income, entertainment } = req.body.categories
    try {
        const newBudget = await db.Budget.create({
            user: req.params.id,
            title: req.body.title,
            colorScheme: req.body.colorScheme,
            location: req.body.location,
            categories: {
                housing: {inputs: housing.inputs},
                utility: {inputs: utility.inputs},
                food: {inputs: food.inputs},
                transportation: {inputs: transportation.inputs},
                entertainment: {inputs: entertainment.inputs},
                misc: {inputs: misc.inputs},
                income: {inputs: income.inputs}  
            }
        })
        res.status(200).json({budget: newBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const allBudgets = await db.Budget.find({
            user: req.params.id
        })
        res.status(200).json({budgets: allBudgets})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({
            _id: req.params.id
        })
        res.status(200).json({budget: currentBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if (!req.body.title || !req.body.colorScheme) {
        try {
            const updatedBudget = await db.Budget.updateOne(
                {_id: req.params.id},
                {$set: {categories: req.body.categories}}
            )
            res.status(200).json({budget: updatedBudget})
        } catch(error) {
            res.status(400).json({msg: error})
        }
    } else {
        try {
            const updatedBudget = await db.Budget.updateOne(
                {_id: req.params.id},
                {$set: {
                    title: req.body.title,
                    location: req.body.location,
                    colorScheme: req.body.colorScheme,
                    categories: req.body.categories
                }}
            )
            res.status(200).json({budget: updatedBudget})
        } catch(error) {
            res.status(400).json({msg: error})
        }
    }
})

// Create DELETE route for budgets/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await db.Budget.deleteOne({_id: req.params.id})
        res.status(200).json({msg: 'Budget deleted'})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router