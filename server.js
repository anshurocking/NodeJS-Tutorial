const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

app.use(express.static(__dirname + '/Public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log =  `${now} ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentDate', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/' , (req, res) => {
res.render('home.hbs', {
  titlePage: 'About the page',
  homePage: 'Welcome to the page'
});
// res.send({
//   name: 'anshu',
//   likes: [
//     'cricket',
//     'table tennis'
//   ],
//   abc: ['a','b','c']
// });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    titlePage: 'About the page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    Errormessage: 'Unable to get the message'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
