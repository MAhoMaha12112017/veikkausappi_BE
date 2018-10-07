const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

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


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kissanpierut66',
    database : 'matchdata'
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.select('*').from('matches')
    .then(data => console.log(data));
    res.json('root');
});

app.get('/matches', (req, res) => {
  res.json(database);
});

app.get('/match/:id', (req, res) => {
  const id = req.params.id;

  db.select('*').from('matches')
  .where({  'id': id  })
  .then(data => console.log(data));
  res.json(id);
});

app.post('/match', (req, res) => {
    const {league, round, homeTeam, awayTeam, homeGoals, awayGoals, homexG, awayxG} = req.body;

    db('matches')
        .returning('*')
        .insert({
        league, 
        round,
        hometeamabbr: homeTeam,
        awayteamabbr: awayTeam, 
        homegoals: homeGoals, 
        awaygoals: awayGoals, 
        homexg: homexG, 
        awayxg: awayxG 
    })
    .then((data) => { 
        if(data[0].id) {
            res.json(data[0]); 
        } else {
            res.json('tallentaminen ei onnistunut'); 
        }
    })
    .catch((err) => res.status(400).json('tallentaminen tietokantaan ei onnistunut'));
});
  
  
//  database.matches.push({
//    league,
//    round,
//    homeTeam,
//    awayTeam,
//    homeGoals,
//    awayGoals,
//    homexG,
//    awayxG
//  })
//  console.log(database);
//  res.json(database.matches[database.matches.length - 1]);
//})

app.listen(3001, () => {
  console.log('web server listening');
});

// - sarjataulukko
// - sarjataulukko käyttäen xgoals
// - joukkuekohtainen data
// - kahden joukkueen vertailudata