// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

const budgetSchema = require('./Budget')

// Create User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstTimeUser: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export User
module.exports = User = mongoose.model('User', userSchema)