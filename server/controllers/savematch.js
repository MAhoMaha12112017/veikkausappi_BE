const saveMatch = (req, res, db) => {
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
}

module.exports = {
    saveMatch
}