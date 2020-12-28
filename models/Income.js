// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Income Schema
const incomeSchema = new Schema({
    inputs: {
        salary: Number,
        investment: Number,
        trust: Number,
        lottery: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Income
module.exports = incomeSchema