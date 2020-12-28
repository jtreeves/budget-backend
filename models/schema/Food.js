// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Grocery Schema
const foodSchema = new Schema({
    inputs: {
        food: Number,
        drink: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export food
module.exports = foodSchema