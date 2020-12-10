

const JWT = require('jsonwebtoken');
const User = require('../models/user')
const { JWT_SECRET } = require('../configuration/index')

signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead

    }, JWT_SECRET)
}


module.exports = {
    signUp: async (req, res, next) => {


        const { email, password } = req.value.body;
        // Check if there is a user with the same email

        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) { return res.status(403).json({ error: ' Email is already in use' }) }

        // create a new user

        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();



        // Generate Token 
        const token = signToken(newUser)

        // respond with new token 
        res.status(200).json({ token: token })

    },

    signIn: async (req, res, next) => {
        // Generate Token

        const token = signToken(req.user)
        res.status(200).json({ token })

    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log('req.user', req.user)
        const token = signToken(req.user)
        res.status(200).json({ token })
    },
    facebookOAuth: async (req, res, next) => {

    
        const token = signToken(req.user)
        res.status(200).json({ token })
    },


    secret: async (req, res, next) => {
        console.log(' I manged to get her')
        res.json({ secret: "resource" })
        


    }


}


