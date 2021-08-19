const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => res.render('beers', { beers }))
    .catch(e => console.log(e));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => res.render('random-beer', { beers }))
    .catch(e => console.log(e));
});

app.get('/beers/:id', (req, res) => {
  const { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(beers => res.render('details', { beers }))
    .catch(e => console.log(e));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
