// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Misc. Schema
const miscSchema = new Schema({
    inputs: {
        random1: Number,
        random2: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Misc.
module.exports = miscSchema