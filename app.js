const express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    app = express();

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

passport.use(new LocalStrategy(function (username, password, done) {
    if (username == 'admin' && password == process.env.ADMIN_PWD)
        done(null, 'admin');
    else {
        done(null, false);
    }
}));
passport.serializeUser(function (user, done) {
    done(null, process.env.ADMIN_SIGNATURE);
});
passport.deserializeUser(function (data, done) {
    if (data == process.env.ADMIN_SIGNATURE)
        done(null, 'admin');
    else
        done(null, false);
});

app.listen(3000, function () {
    console.log('Server started on 3000 port.');
});
