// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Import schemas
const housingSchema = require('./schemas/Housing')
const utilitySchema = require('./schemas/Utility')
const foodSchema = require('./schemas/Food')
const transportationSchema = require('./schemas/Transportation')
const entertainmentSchema = require('./schemas/Entertainment')
const miscSchema = require('./schemas/Misc')

// Create Budget Schema
const budgetSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    colorScheme: String,
    location: String,
    income: String,
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
        misc: miscSchema
    },
})

// Export Budget
module.exports = Budget = mongoose.model('Budget', budgetSchema)