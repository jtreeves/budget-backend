// Import external dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')

// Import internal configuration
require('./configurations/passport')(passport)

// Import internal controller
const users = require('./controllers/users')

// Use external middleware
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())

// Use internal controller
app.use('/users', users)

// Get home route
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Viewing the backend of a MERN app'})
})

// Create port
const PORT = process.env.PORT || 8000

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})