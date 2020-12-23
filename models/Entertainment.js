// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Entertainment Schema
const entertainmentSchema = new Schema({
    categories: {
        movies: Number,
        books: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Entertainment
module.exports = entertainmentSchema