const teamData = (req, res, db) => {
    res.json('deprecated');
//    const {team, homeaway, equalsParam} = req.body;
//    let homeTeamQueryObject = {};
//    let awayTeamQueryObject = {};
//    let queryObject = {};
//    let returnObject = {};
//    if (team !== undefined) { 
//        console.log('team ',team);
//        homeTeamQueryObject = {...homeTeamQueryObject, 'hometeamabbr':team};
//        awayTeamQueryObject = {...awayTeamQueryObject, 'awayteamabbr':team};
//        // home-away-check
//        if (homeaway === 'home') {
//            awayTeamQueryObject = {}
//        } else if (homeaway === 'away') {
//            homeTeamQueryObject = {}
//        }
//    }
//    
//    console.log('queryObject ', JSON.stringify(queryObject));
//    console.log('homeTeamQueryObject ', JSON.stringify(homeTeamQueryObject));
//    console.log('awayTeamQueryObject ', JSON.stringify(awayTeamQueryObject));
//    
//    db.select('*').from('matches')
//      .where(queryObject)
//      .andWhere(function() {
//        this.where(homeTeamQueryObject)
//        .orWhere(awayTeamQueryObject)
//      })
////      .orderBy('round', 'asc')
//    .then((data) => { // vois hakea SQLllä, no tehdään ensin näin, ehkä voi dynaamisesti muokkailla..
//        if(data[0].id) {
//            
//            // lasketaan maalikeskiarvot // returns a string!!
//            const allHomeGoals = (data.reduce((sum, game) => sum + game.homegoals, 0)).toFixed(2);
//            const avgHomeGoals = (allHomeGoals / data.length).toFixed(2); 
//            console.log('allHomeGoals ', allHomeGoals);
//            console.log('avgHomeGoals ', avgHomeGoals);
//            
//            // lasketaan xG-maalikeskiarvot // returns a string!!
//            const allHomeXG = (data.reduce((sum, game) => sum + game.homexg, 0)).toFixed(2);
//            const avgHomeXG = (allHomeXG / data.length).toFixed(2); 
//            console.log('allHomeXG ', allHomeXG);
//            console.log('avgHomeXG ', avgHomeXG);
//            
//            // lisätään objectiin
//            returnObject = {
//                allHomeGoals,
//                avgHomeGoals,
//                allHomeXG,
//                avgHomeXG
//            }
//            
//            // voitetut-hävityt-tasapelit. lasketaan voitot ja häviöt, loput tasapelejä
//            
//            const wins = data.filter((game) => {
//                (game.homegoals > game.awaygoals && game.hometeamabbr === team) 
//                || (game.homegoals < game.awaygoals && game.awayteamabbr === team)
//            });
//            const losses = data.filter((game) => game.homegoals < game.awaygoals);
//            const draws = data.filter((game) => game.homegoals === game.awaygoals);
//            
//            // voitetut-hävityt-tasapelit xG (parametri)
//            // käytetään paremetriä 0.2 --> pienempi kuin 0.2 ero tuottaa tasapelin
//            let statForResult = 0.2; // <-- equalsParam
//            
//            // palautetaan data - muoto? 
//            returnObject = {
//                ...returnObject,
//                wins: wins.length,
//                losses: losses.length,
//                draws: draws.length
//            }
//            
//            
//            res.json(returnObject); 
//        } else {
//            res.json('mitään ei löytynyt'); 
//        }
//    })
//    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
};

module.exports = {
    teamData
};