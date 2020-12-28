// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Housing Schema
const housingSchema = new Schema({
    inputs: {
        rent: Number,
        mortgage: Number,
        hostel: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Housing
module.exports = housingSchema