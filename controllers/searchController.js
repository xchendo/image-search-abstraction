var mongoose = require('mongoose');
var Search = mongoose.model('Search');

// Old way using promises, try this out with async.
exports.saveSearch = (req, res, next) => {
  console.log('Hello from search controller');
  const search = new Search({
  term: req.params.search});
  search
    .save()
    .then(term => {
        next();
    })
    .catch(err => {
        return next(new Error(err));
    });

}

// Default: 5 
exports.returnLatest = (req, res) => {
  var search = Search
    .find()
    .select({"term": 1, "when":1, "_id":0})
    .sort({"when": -1})
    .limit(5)
    .then(recent => {
      res.send(recent);
    })
    .catch(err => {
      throw Error(err);
    });

}
