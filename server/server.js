const express = require('express');

const database = {
  matches: [{

  }]
}

const app = express();

app.get('/', (req, res) => {
  res.send('root');
});

app.get('/matches', (req, res) => {
  res.send('matches');
});

app.listen(3001, () => {
  console.log('web server listening');
});

// - sarjataulukko
// - sarjataulukko käyttäen xgoals
// - joukkuekohtainen data
// - kahden joukkueen vertailudata