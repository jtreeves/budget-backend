// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Utility Schema
const utilitySchema = new Schema({
    categories: {},
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Utility
module.exports = Utility = mongoose.model('Utility', utilitySchema)