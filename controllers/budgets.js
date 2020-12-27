// Import external dependencies
require('dotenv').config()
const express = require('express')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create POST route for budgets/:id
router.post('/:id', async (req, res) => {
    try {
        const newBudget = await db.Budget.create({
            user: req.params.id,
            housing: {
                categories: {
                    rent: 0,
                    mortgage: 0,
                    hostel: 0
                }
            },
            utility: {
                categories: {
                    electric: 0,
                    water: 0
                }
            },
            grocery: {
                categories: {
                    food: 0,
                    drink: 0
                }
            },
            transportation: {
                categories: {
                    plane: 0,
                    train: 0,
                    automobile: 0
                }
            },
            entertainment: {
                categories: {
                    movies: 0,
                    books: 0
                }
            },
            income: {
                categories: {
                    salary: 0,
                    investment: 0,
                    trust: 0,
                    lottery: 0
                }
            }
        })
        res.status(200).json({budget: newBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/all/:id
router.get('/all/:id', async (req, res) => {
    try {
        const allBudgets = await db.Budget.find({user: req.params.id})
        res.status(200).json({budgets: allBudgets})
    } catch(error) {
        res.status(400).json({msg: error})
    }
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

// Create GET route for budgets/:id/transportation
router.get('/:id/transportation', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({transportation: currentBudget.transportation})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for budgets/:id/entertainment
router.get('/:id/entertainment', async (req, res) => {
    try {
        const currentBudget = await db.Budget.findOne({_id: req.params.id})
        res.status(200).json({entertainment: currentBudget.entertainment})
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

// Create PUT route for budgets/:id/transportation
router.put('/:id/transportation', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'transportation.categories.plane': req.body.plane,
                'transportation.categories.train': req.body.train,
                'transportation.categories.automobile': req.body.automobile
            }}
        )
        res.status(200).json({budget: updatedBudget})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for budgets/:id/entertainment
router.put('/:id/entertainment', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'entertainment.categories.movies': req.body.movies,
                'entertainment.categories.books': req.body.books
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