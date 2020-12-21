// Import external dependencies
require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

// Import internal model
const User = require('../models/User')

// Establish options
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

// Export anonymous function upon its creation
module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User
            .findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch(error => {
                console.log(`PASSPORT ERROR: ${error}`)
            })
    }))
}