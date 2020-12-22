// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Grocery Schema
const grocerySchema = new Schema({
    categories: {},
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Grocery
module.exports = Grocery = mongoose.model('Grocery', grocerySchema)