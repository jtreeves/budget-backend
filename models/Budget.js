// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

const utilitySchema = require('./Utility')
const grocerySchema = require('./Grocery')
const transportationSchema = require('./Transportation')
const entertainmentSchema = require('./Entertainment')
const incomeSchema = require('./Income')

// Create Budget Schema
const budgetSchema = new Schema({
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    date: {
        type: Date,
        default: Date.now()
    },
    utility: utilitySchema,
    grocery: grocerySchema,
    transportation: transportationSchema,
    entertainment: entertainmentSchema,
    income: incomeSchema
})

// Export Budget
module.exports = Budget = mongoose.model('Budget', budgetSchema)