// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Import schemas
const housingSchema = require('./schema/Housing')
const utilitySchema = require('./schema/Utility')
const foodSchema = require('./schema/Food')
const transportationSchema = require('./schema/Transportation')
const entertainmentSchema = require('./schema/Entertainment')
const miscSchema = require('./schema/Misc')
const incomeSchema = require('./schema/Income')

// Create Budget Schema
const budgetSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {
        type: Date,
        default: Date.now()
    },
    categories: {
        housing: housingSchema,
        utility: utilitySchema,
        food: foodSchema,
        transportation: transportationSchema,
        entertainment: entertainmentSchema,
        misc: miscSchema,
        income: incomeSchema
    },
})

// Export Budget
module.exports = Budget = mongoose.model('Budget', budgetSchema)