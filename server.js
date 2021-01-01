// Import external dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')

// Import internal configuration
require('./configurations/passport')(passport)

// Import internal controllers
const users = require('./controllers/users')
const budgets = require('./controllers/budgets')

// Use external middleware
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())

// Use internal controllers
app.use('/users', users)
app.use('/budgets', budgets)

// Get home route
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Viewing the backend of a MERN app'})
})

// Create port
const PORT = process.env.PORT || 8000

// Create server to listen on port
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export server
module.exports = server