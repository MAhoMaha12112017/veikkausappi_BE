const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

const database = {
  matches: [{
    league: 'PREMIERLEAGUE',
    round: 0,
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    homeGoals: 0,
    awayGoals: 0,
    homexG: 0,
    awayxG: 0
  }]
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('root');
});

app.get('/matches', (req, res) => {
  res.json(database);
});

app.get('/match/:id', (req, res) => {
  const id = req.params.id;
  res.json(id);
});

app.post('/match', (req, res) => {
  const {league, round, homeTeam, awayTeam, homeGoals, awayGoals, homexG, awayxG} = req.body;
  database.matches.push({
    league,
    round,
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    homexG,
    awayxG
  })
  console.log(database);
  res.json(database.matches[database.matches.length - 1]);
})

app.listen(3001, () => {
  console.log('web server listening');
});

// - sarjataulukko
// - sarjataulukko käyttäen xgoals
// - joukkuekohtainen data
// - kahden joukkueen vertailudata