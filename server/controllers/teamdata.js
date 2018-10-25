const teamData = (req, res, db) => {
    
    const {team, equalsParam, homeaway} = req.body;
    let returnObject = {};
    let searchObject = {};
    
    console.log('team', team);
    console.log('homeaway ', homeaway)
    
    // hakuobjektiin joko kotiottelut tai vierasottelut
    if (homeaway === 'home') {
        searchObject = {'hometeamabbr':team}
    } else if (homeaway === 'away') {
        searchObject = {'awayteamabbr':team}
    }
 
    db.select('*').from('matches')
      .where(searchObject) //      .andWhere(function() { this.where(homeTeamQueryObject).orWhere(awayTeamQueryObject)})
    .then((data) => { 
        if (data[0].id) {
            let wins = [];
            let losses = [];
            console.log('data taasen ', data);
            // maalikeskiarvot // returns a string!!
            const AwayGoals = (data.reduce((sum, game) => sum + game.awaygoals, 0)).toFixed(2);
            const avgAwayGoals = (AwayGoals / data.length).toFixed(2); 
            const HomeGoals = (data.reduce((sum, game) => sum + game.homegoals, 0)).toFixed(2);
            const avgHomeGoals = (HomeGoals / data.length).toFixed(2);
            // xG-maalikeskiarvot // returns a string!!
            const AwayXG = (data.reduce((sum, game) => sum + game.awayxg, 0)).toFixed(2);
            const avgAwayXG = (AwayXG / data.length).toFixed(2); 
            const HomeXG = (data.reduce((sum, game) => sum + game.homexg, 0)).toFixed(2);
            const avgHomeXG = (HomeXG / data.length).toFixed(2); 
            
            // voitetut-hävityt-tasapelit. lasketaan voitot ja häviöt, loput tasapelejä
            if (homeaway === 'away') {
                wins = data.filter(game => game.homegoals < game.awaygoals );
                losses = data.filter(game => game.homegoals > game.awaygoals);
            } else if (homeaway === 'home') {
                wins = data.filter(game => { return (game.homegoals > game.awaygoals) } );
                losses = data.filter(game => { return (game.homegoals < game.awaygoals) });
            }
            
            const draws = data.filter((game) => { return (game.homegoals === game.awaygoals) } );
            returnObject = {
                AwayGoals,
                avgAwayGoals,
                AwayXG,
                avgAwayXG, 
                HomeGoals,
                avgHomeGoals,
                HomeXG,
                avgHomeXG, 
                wins: wins.length,
                losses: losses.length,
                draws: draws.length
            }
         console.log('returnObject ', returnObject)
         res.json(returnObject);  
            
        } else {
            res.json('mitään ei löytynyt'); 
        }
    })
    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
};

module.exports = {
    teamData
};

// voitetut-hävityt-tasapelit xG (parametri)
// käytetään paremetriä 0.2 --> pienempi kuin 0.2 ero tuottaa tasapelin
//            let statForResult = 0.2; // <-- equalsParam
