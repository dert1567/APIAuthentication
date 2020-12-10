const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStragey = require('passport-facebook-token')
const { JWT_SECRET } = require('./configuration')
const config = require('./configuration');
const User = require('./models/user');
const configuration = require('./configuration');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;



//JSON web token strategy 
passport.use(new JWTStrategy({

    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET

}, async (payload, done) => {
    try {
        // Find the user specified in token 
        const user = await User.findById(payload.sub);

        // If user doesnt exists, handle it 
        if (!user) {
            return done(null, false);
        }


        // Otherwise, return the user 

        done(null, user)


    } catch (error) {
        done(error, flase);
    }
}))


// Google oautj strategy 

passport.authenticate('googleToken', { scope: 'https://www.google.com/m8/feeds' });

passport.use("googleToken", new GoogleStrategy({

    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
   

}, async (accessToken, refreshToken, profile, done) => {

    try {
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)

        // Check wether this current user exsits in our DV

        //const existingUser = await User.findOne({ "google.id": profile.id })
        const existingUser = function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
              return cb(err, user);
            });
          }
        if (existingUser) {
            console.log('user exists in DB')
            return done(null, existingUser)
        }

        console.log('User does not exist we are creating a new one')

        // if new account 
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    }
    catch (error) {
        done(error, false, error.message)

    }


}))


passport.use('facebookToken', new FacebookTokenStragey({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('proifle', profile)
        console.log('accesToken', accessToken)
        console.log('refreshtoken', refreshToken)

        const existingUser = await User.findOne({"facebook.id": profile.id})
        if (existingUser) {
            return done (null, existingUser);
        }

        const newUser = new User ({
            method:'facebook', 
            facebook : {
                id: profile.id, 
                email: profile.emails[0].value
            }
        })

        await newUser.save();
        done(null, newUser)



    } catch (error) {
        done(error, false, error.message)
    }
}))


//Local Strategy 

passport.use(new LocalStrategy({
    usernameField: 'email'


}, async (email, password, done) => {
    try {
        // Find the user given the email  
        const user = await User.findOne({ "local.email": email });






        // if not handle it 

        if (!user) {
            return done(null, false);
        }

        // passwort correkt ?
        const isMatch = await user.isValidPassword(password);


        // of not handle it 
        if (!isMatch) {
            return done(null, false);
        }
        // otherwise return the user
        done(null, user);
    }

    catch (error) {
        done(erroe, false)
    }

}))