const teamAwayData = (req, res, db) => {
    
    const {team, equalsParam} = req.body;
    let returnObject = {};
 
    db.select('*').from('matches')
      .where({'awayteamabbr':team}) //      .andWhere(function() { this.where(homeTeamQueryObject).orWhere(awayTeamQueryObject)})
    .then((data) => { 
        console.log(data);
        if(data[0].id) {
            
            // maalikeskiarvot // returns a string!!
            const allAwayGoals = (data.reduce((sum, game) => sum + game.awaygoals, 0)).toFixed(2);
            const avgAwayGoals = (allAwayGoals / data.length).toFixed(2); 
            // xG-maalikeskiarvot // returns a string!!
            const allAwayXG = (data.reduce((sum, game) => sum + game.awayxg, 0)).toFixed(2);
            const avgAwayXG = (allAwayXG / data.length).toFixed(2); 
            // voitetut-hävityt-tasapelit. lasketaan voitot ja häviöt, loput tasapelejä
            const wins = data.filter((game) => game.homegoals < game.awaygoals );
            const losses = data.filter((game) => game.homegoals > game.awaygoals);
            const draws = data.filter((game) => game.homegoals === game.awaygoals);
            
            returnObject = {
                allAwayGoals,
                avgAwayGoals,
                allAwayXG,
                avgAwayXG, 
                wins: wins.length,
                losses: losses.length,
                draws: draws.length
            }
            
          res.json(returnObject);  
            
        } else {
            res.json('mitään ei löytynyt'); 
        }
    })
    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
};

module.exports = {
    teamAwayData
};

// voitetut-hävityt-tasapelit xG (parametri)
// käytetään paremetriä 0.2 --> pienempi kuin 0.2 ero tuottaa tasapelin
//            let statForResult = 0.2; // <-- equalsParam
