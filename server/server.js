const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

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
    res.json('root');
});

app.get('/matches', (req, res) => {
    db.select('*').from('matches')
    .then(data => {
        console.log(data);
        res.json(data);
    });
});

app.get('/match/:id', (req, res) => {
  const id = req.params.id;

  db.select('*').from('matches')
  .where({  'id': id  })
  .then(data => {
        if (data[0].id) {
            console.log(data[0]);
            res.json(data[0]); 
        } else {
            res.json('mitään ei löytynyt');
        }
  })
  .catch((err) => res.status(400).json('haku ei onnistunut'));
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

app.post('/matchsearch', (req, res) => {
    const {league, team, team2, round, id} = req.body;
    
    // query object
    let queryObject = {};
    let homeTeamQueryObject = {};
    let awayTeamQueryObject = {};

    if (league !== undefined) {
        console.log('league',league);
        queryObject = {...queryObject, 'league':league};
    }
    if (round !== undefined) {
        console.log('round',round);
        queryObject = {...queryObject, 'round':round};
    }
    if (team !== undefined) {
        console.log('team ',team);
        homeTeamQueryObject = {...homeTeamQueryObject, 'hometeamabbr':team};
        awayTeamQueryObject = {...awayTeamQueryObject, 'awayteamabbr':team};
    }

    console.log('queryObject ', JSON.stringify(queryObject));
    console.log('homeTeamQueryObject ', JSON.stringify(homeTeamQueryObject));
    console.log('awayTeamQueryObject ', JSON.stringify(awayTeamQueryObject));

    db.select('*').from('matches')
      .where(queryObject)
      .andWhere(homeTeamQueryObject)
      .orWhere(awayTeamQueryObject)
        
    .then((data) => { 
        if(data[0].id) { // mieti tätä
            res.json(data); 
        } else {
            res.json('mitään ei löytynyt'); 
        }
    })
    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
});


app.listen(3001, () => {
  console.log('web server listening');
});

// - sarjataulukko
// - sarjataulukko käyttäen xgoals
// - joukkuekohtainen data
// - kahden joukkueen vertailudata