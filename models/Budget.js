// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Budget Schema
const budgetSchema = new Schema({
    suggestions: [{}],
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Budget
module.exports = Budget = mongoose.model('Budget', budgetSchema)