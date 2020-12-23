// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Transportation Schema
const transportationSchema = new Schema({
    categories: {
        plane: Number,
        train: Number,
        automobile: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Transportation
module.exports = transportationSchema