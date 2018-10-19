const matchSearch = (req, res, db) => {
    const {league, team, team1, team2, round, id, homeaway} = req.body;
    
    // query object
    let queryObject = {};
    let homeTeamQueryObject = {};
    let mirrorTeamQueryObject = {};
    
    // if id, league or round given, added as a search parameter
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
        // home-away-check
        if (homeaway === 'home') {
            mirrorTeamQueryObject = {}
        } else if (homeaway === 'away') {
            homeTeamQueryObject = {}
        }
    } else if (team1 !== undefined && team2 !== undefined) { // data of 2 selected teams
        homeTeamQueryObject = {'hometeamabbr':team1, 'awayteamabbr':team2}; 
        mirrorTeamQueryObject = {'hometeamabbr':team2, 'awayteamabbr':team1};
    }

    console.log('queryObject ', JSON.stringify(queryObject));
    console.log('homeTeamQueryObject ', JSON.stringify(homeTeamQueryObject));
    console.log('mirrorTeamQueryObject ', JSON.stringify(mirrorTeamQueryObject));

    db.select('*').from('matches')
      .where(queryObject)
      .andWhere(function() {
        this.where(homeTeamQueryObject)
        .orWhere(mirrorTeamQueryObject)
      })
      .orderBy('round', 'asc')
    .then((data) => { 
        if(data[0].id) { // mieti tätä
            res.json(data); 
        } else {
            res.json('mitään ei löytynyt'); 
        }
    })
    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
}
      
module.exports = {
    matchSearch
}