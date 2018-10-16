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
    const {league, team, team1, team2, round, id, homeaway} = req.body;
    
    // query object
    let queryObject = {};
    let homeTeamQueryObject = {};
    let mirrorTeamQueryObject = {};
    
    if (id !== undefined) {
        console.log('id',id);
        queryObject = {...queryObject, 'id':id};
    }

    if (league !== undefined) {
        console.log('league',league);
        queryObject = {...queryObject, 'league':league};
    }
    if (round !== undefined) {
        console.log('round',round);
        queryObject = {...queryObject, 'round':round};
    }
    
    if (team !== undefined) { // data of single team only
        console.log('team ',team);
        homeTeamQueryObject = {...homeTeamQueryObject, 'hometeamabbr':team};
        mirrorTeamQueryObject = {...mirrorTeamQueryObject, 'awayteamabbr':team};
    } else if (team1 !== undefined && team2 !== undefined) { // data of 2 selected teams
        homeTeamQueryObject = {'hometeamabbr':team1, 'awayteamabbr':team2}; 
        mirrorTeamQueryObject = {'hometeamabbr':team2, 'awayteamabbr':team1};
    }

//    console.log('queryObject ', JSON.stringify(queryObject));
//    console.log('homeTeamQueryObject ', JSON.stringify(homeTeamQueryObject));
//    console.log('mirrorTeamQueryObject ', JSON.stringify(mirrorTeamQueryObject));
    
    // home-away-check
    if (homeaway === 'home') {
        mirrorTeamQueryObject = {}
    } else if (homeaway === 'away') {
        homeTeamQueryObject = {}
    }

    db.select('*').from('matches')
      .where(queryObject)
      .andWhere(function() {
        this.where(homeTeamQueryObject)
        .orWhere(mirrorTeamQueryObject)
    })    
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
