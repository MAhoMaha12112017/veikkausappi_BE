const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const matches = require('./controllers/matches');
const matchDataById = require('./controllers/matchdatabyid');
const saveMatch = require('./controllers/savematch');
const matchSearch = require('./controllers/matchsearch');
const teamData = require('./controllers/teamdata');
const teamHomeData = require('./controllers/teamhomedata'); // deprecated
const teamAwayData = require('./controllers/teamawaydata'); // deprecated

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

app.get('/', (req, res) => { res.json('root'); });

app.get('/matches', (req, res) => matches.matchesData(req, res, db));
app.get('/match/:id', (req, res) => matchDataById.matchDataById(req, res, db));
app.post('/match', (req, res) => saveMatch.saveMatch(req, res, db));
app.post('/matchsearch', (req, res) => matchSearch.matchSearch(req, res, db));
app.post('/teamdata', (req, res) => teamData.teamData(req, res, db));
app.post('/teamhomedata', (req, res) => teamHomeData.teamHomeData(req, res, db));
app.post('/teamawaydata', (req, res) => teamAwayData.teamAwayData(req, res, db));

app.listen(3001, () => {
  console.log('web server listening');
});
