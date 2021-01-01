// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Utility Schema
const utilitySchema = new Schema({
    inputs: { type: Schema.Types.Mixed, default: {} },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })

// Export Utility
module.exports = utilitySchema