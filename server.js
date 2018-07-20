const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 8080 ;
var app = express();
hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine','hbs');
// Express middleware use to link external module like app.use and registerHelper
hbs.registerHelper('currentYear', function(){
    return new Date().getFullYear();
});
hbs.registerHelper('textUpper', (text)=>{
    return text.toUpperCase()
});
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
    var dat= new Date().toString();
    var log=`${dat}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});
/*app.use(function(req, res, next){
    res.render('maintenance.hbs');
});
*/
/*app.get('/', function(req, res){
    //res.send('<h1>Hello Express<h1>');
    res.send({
        name: 'infinijith',
        lan: [
            'nodejs',
            'angularjs'
        ]
    });
    
});*/
app.get('/', function(req, res){
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'welcomt to My Website',
        //currentYear: new Date().getFullYear()
    })
})
app.get('/about', function(req, res){
    res.render('about.hbs', {
        pageTitle: 'welcome to About Page',
        //currentYear: new Date().getFullYear()
    
    });
    //res.send('about us');
});
app.get('/bad', function(req, res){
    res.send({ErrorMessage: 'unable to handle error'});

    
});
app.listen(8080);
console.log(`The server is running on ${port}`);