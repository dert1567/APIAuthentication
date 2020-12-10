const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/APIAuthenticationTEST", 
  );
} else {

mongoose.connect(
    "...." +
     process.env.MONGO_ATLAS_PW + 
     "....",{
      useNewUrlParser: true
    });

  
}

 

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());
// Routes

app.use('/users', require('./routes/users'))

// this is an nex comment 
// Start the server

//const port = process.env.PORT || 3000;
//app.listen(port);
//console.log(`Server listening at ${port}`);

app.get('oauth/google/', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

module.exports = app;