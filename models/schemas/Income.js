// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Income Schema
const incomeSchema = new Schema({
    inputs: { type: Schema.Types.Mixed, default: {} },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })

// Export Income
module.exports = incomeSchema