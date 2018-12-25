const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();

    var log = now + req.method + req.url;
    console.log(log);

    fs.appendFile('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {

    res.render('maintenance.hbs');

});

/*app.get('/maintenance', (req, res) => {

    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'Maintenance Page ',
        currentYear: new Date().getFullYear()
    });
});*/
app.get('/', (req, res) => {

    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'About Page ',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {

    //res.send('about page');
    res.render('about.hbs', {
        pageTitle: 'About Page ',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(port, () => {
    console.log('server is up on port 3000');
});