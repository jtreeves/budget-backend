// Import external dependencies
require('dotenv').config()
const express = require('express')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create POST route for budgets/:id
router.post('/:id', async (req, res) => {

    const { housing, utility, food, transportation, misc, income, entertainment } = req.body.categories
    try {
        const newBudget = await db.Budget.create({
            user: req.params.id,
            title: req.body.title,
            colorScheme: req.body.colorScheme,
            categories: {
                housing: {
                    inputs: housing.inputs
                },
                utility: {
                    inputs: utility.inputs
                },
                food: {
                    inputs: food.inputs
                },
                transportation: {
                    inputs: transportation.inputs
                },
                entertainment: {
                    inputs: entertainment.inputs
                },
                misc: {
                    inputs: misc.inputs
                },
                income: {
                    inputs: income.inputs
                },  
            },
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

// Create PUT route for budgets/:id
router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.colorScheme) {
        try {
            const updatedBudget = await db.Budget.updateOne(
                {_id: req.params.id},
                {$set: {
                    'categories': req.body.categories
                }}
            )
            res.status(200).json({budget: updatedBudget})
        } catch(error) {
            res.status(400).json({ msg: error })
        }
    } else {
        try {
            const updatedBudget = await db.Budget.updateOne(
                {_id: req.params.id},
                {$set: {
                    'title': req.body.title,
                    'colorScheme': req.body.colorScheme,
                    'categories': req.body.categories
                }}
            )
            res.status(200).json({budget: updatedBudget})
        } catch(error) {
            res.status(400).json({ msg: error })
        }
    }
})

/*
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
router.put('/:id/food', async (req, res) => {
    try {
        const updatedBudget = await db.Budget.updateOne(
            {_id: req.params.id},
            {$set: {
                'food.categories.food': req.body.food,
                'food.categories.drink': req.body.drink
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
*/
// Export router
module.exports = router