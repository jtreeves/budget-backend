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
    try {
        const newBudget = await db.Budget.create({
            user: req.params.id,
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
        res.status(200).json({budget: newBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const allBudgets = await db.Budget.find({user: req.params.id})
        res.status(200).json({budgets: allBudgets})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({budget: currentBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/housing
router.get('/:id/housing', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({housing: currentBudget.housing})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/utility
router.get('/:id/utility', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({utility: currentBudget.utility})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/grocery
router.get('/:id/grocery', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({grocery: currentBudget.grocery})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/transportation
router.get('/:id/transportation', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({transportation: currentBudget.transportation})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/entertainment
router.get('/:id/entertainment', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({entertainment: currentBudget.entertainment})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/income
router.get('/:id/income', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({income: currentBudget.income})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {categories: req.body.categories}}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({ msg: error })
    }
})

// Export router
module.exports = router