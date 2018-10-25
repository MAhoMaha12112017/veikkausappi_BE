const teamHomeData = (req, res, db) => {
    
    res.json('deprecated')
}
    
//    const {team, equalsParam} = req.body;
//    let returnObject = {};
// 
//    db.select('*').from('matches')
//      .where({'hometeamabbr':team}) //      .andWhere(function() { this.where(homeTeamQueryObject).orWhere(awayTeamQueryObject)})
//    .then((data) => { 
////        console.log(data);
//        if(data[0].id) {
//            
//            // maalikeskiarvot // returns a string!!
//            const allHomeGoals = (data.reduce((sum, game) => sum + game.homegoals, 0)).toFixed(2);
//            const avgHomeGoals = (allHomeGoals / data.length).toFixed(2); 
//            const allAwayGoals = (data.reduce((sum, game) => sum + game.awaygoals, 0)).toFixed(2);
//            const avgAwayGoals = (allAwayGoals / data.length).toFixed(2); 
//            // xG-maalikeskiarvot // returns a string!!
//            const allHomeXG = (data.reduce((sum, game) => sum + game.homexg, 0)).toFixed(2);
//            const avgHomeXG = (allHomeXG / data.length).toFixed(2); 
//            const allAwayXG = (data.reduce((sum, game) => sum + game.awayxg, 0)).toFixed(2);
//            const avgAwayXG = (allAwayXG / data.length).toFixed(2); 
//            // voitetut-hävityt-tasapelit. lasketaan voitot ja häviöt, loput tasapelejä
//            const wins = data.filter((game) => game.homegoals > game.awaygoals );
//            const losses = data.filter((game) => game.homegoals < game.awaygoals);
//            const draws = data.filter((game) => game.homegoals === game.awaygoals);
//            
//            returnObject = {
//                allHomeGoals,
//                avgHomeGoals,
//                allHomeXG,
//                avgHomeXG, 
//                allAwayGoals,
//                avgAwayGoals,
//                allAwayXG,
//                avgAwayXG,
//                wins: wins.length,
//                losses: losses.length,
//                draws: draws.length
//            }
//            
//          res.json(returnObject);  
//            
//        } else {
//            res.json('mitään ei löytynyt'); 
//        }
//    })
//    .catch((err) => res.status(400).json('haku tietokannasta ei onnistunut'));
//};
//
module.exports = {
    teamHomeData
};

// voitetut-hävityt-tasapelit xG (parametri)
// käytetään paremetriä 0.2 --> pienempi kuin 0.2 ero tuottaa tasapelin
//            let statForResult = 0.2; // <-- equalsParam

//            console.log('allHomeXG ', allHomeXG);
//            console.log('avgHomeXG ', avgHomeXG);
//            console.log('allHomeGoals ', allHomeGoals);
//            console.log('avgHomeGoals ', avgHomeGoals);