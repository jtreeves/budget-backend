// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Transportation Schema
const transportationSchema = new Schema({
    inputs: { type: Schema.Types.Mixed, default: {} },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })

// Export Transportation
module.exports = transportationSchema