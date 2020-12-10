const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

// Create a schema

const userSchema = new Schema({

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true,

    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }


    },
    facebook: {

        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }


    }





});

userSchema.pre('save', async function (next) {
    try {

        if(this.method !== 'local') {
            next();
        }


        // Generate a salt 
        const salt = await bcrypt.genSalt(10);
        // Geneare passwordhas ( salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // reassign hash version over original plain test password
        this.local.password = passwordHash
        next();
    } catch {
        next(error);
    }
})

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password)
    } catch {
        throw new Error(error)
    }
}


// crtae model  

const User = mongoose.model('userr', userSchema)

// export modell
module.exports = User;