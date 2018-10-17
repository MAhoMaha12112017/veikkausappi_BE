const matchesData = (req, res, db) => {
    db.select('*').from('matches')
    .then(data => {
        console.log(data);
        res.json(data);
    });
}

module.exports = {
    matchesData
};