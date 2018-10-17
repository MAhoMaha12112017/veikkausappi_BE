const matchDataById = (req, res, db) => {
  const id = req.params.id;

  db.select('*').from('matches')
  .where({  'id': id  })
  .then(data => {
        if (data[0].id) {
            console.log(data[0]);
            res.json(data[0]); 
        } else {
            res.json('mitään ei löytynyt');
        }
  })
  .catch((err) => res.status(400).json('haku ei onnistunut'));
}

module.exports = {
    matchDataById
}