const teamData = (req, res, db) => {
    // ensin pelkkä joukkue parametrinä
    const {team} = req.body;
    if (team !== undefined) {
        console.log('team ',team);
        res.json('joo');
    }
};

module.exports = {
    teamData
};