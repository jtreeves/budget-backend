// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Grocery Schema
const grocerySchema = new Schema({
    categories: {
        food: Number,
        drink: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Grocery
module.exports = grocerySchema