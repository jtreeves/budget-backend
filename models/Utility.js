// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Utility Schema
const utilitySchema = new Schema({
    inputs: {
        electric: Number,
        water: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Utility
module.exports = utilitySchema