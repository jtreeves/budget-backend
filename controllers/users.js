// Import external dependencies
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create JSON web token
const JWT_SECRET = process.env.JWT_SECRET

// Create GET route for users/test (Public)
router.get('/test', (req, res) => {
    res.json({msg: 'Viewing the test page for the backend of a MERN app'})
})

// Create POST route for users/signup (Public)
router.post('/signup', async (req, res) => {
    try {
        // Find user by email
        const currentUser = await db.User.findOne({
            email: req.body.email
        })
        if (currentUser) {
            // Send 400 response if email already in use
            return res.status(400).json({msg: 'Email already in use'})
        } else {
            // Create new user if email not already in use
            const newUser = new db.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            // Create salt for password
            bcrypt.genSalt(10, (error, salt) => {
                if (error) throw Error
                // Hash password with salt
                bcrypt.hash(newUser.password, salt, async (error, hash) => {
                    try {
                        if (error) throw Error
                        // Change password to the hash version
                        newUser.password = hash
                        // Save new user with hashed password
                        const createdUser = await newUser.save()
                        res.status(201).json(createdUser)
                    } catch(error) {
                        console.log(`HASHING ERROR: ${error}`)
                    }
                })
            })
        }
    } catch(error) {
        console.log(`SIGNUP ERROR: ${error}`)
    }
})

// Create POST route for users/login (Public)
router.post('/login', async (req, res) => {
    try {
        // Grab email and password from form
        const email = req.body.email
        const password = req.body.password
        // Find user by email
        const currentUser = await db.User.findOne({email})
        if (!currentUser) {
            // Send 400 response if user does not exist
            res.status(400).json({msg: 'User not found'})
        } else {
            // Log in user if user exists
            const isMatch = await bcrypt.compare(password, currentUser.password)
            // Check password for match
            if (isMatch) {
                // Create a token payload if match
                const payload = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                // Sign token to finalize login
                jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                })
            } else {
                // Send 400 response if no match
                return res.status(400).json({msg: 'Password is incorrect'})
            }
        }
    } catch(error) {
        console.log(`LOGIN ERROR: ${error}`)
    }
})

// Create GET route for users/current (Private)
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

// Export router
module.exports = router