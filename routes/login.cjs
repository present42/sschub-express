var express = require('express');
var app = express.Router();
var db = require('../database.cjs');

app.get('/', function (req, res, next) {
    console.log(req.session);
    res.render('login');
});

app.post('/auth', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                console.log(req.session);
                // Authenticate the user
                req.session.loggedin = true;
                req.session.username = username;
                // Redirect to home page
                res.redirect('/admin');
            } else {
                res.redirect('/login');
            }
            res.end();
        });
    }
});

app.get('/signout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
}) 

module.exports = app;
