// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Budget Schema
const budgetSchema = new Schema({
    suggestion: {},
    date: {
        type: Date,
        default: Date.now()
    },
    utility: utilitySchema,
    grocery: grocerySchema
})

// Export Budget
module.exports = Budget = mongoose.model('Budget', budgetSchema)