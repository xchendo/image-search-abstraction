var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = Promise;
require('../models/Search');
var url = 'mongodb://root:root@ds131480.mlab.com:31480/xchendo-image-search-abstraction';
mongoose.connect(url,{useMongoClient:true});
mongoose.connection.on('error',(err) => {
  console.log(err.message);
});

// controllers
var searchController = require('../controllers/searchController');
var requestController = require('../controllers/requestController');

// make the actual search
router.get('/imagesearch/:search', searchController.saveSearch, requestController.getSearch, 
          requestController.formatResponse);

// return the most recent searches
router.get('/latest/imagesearch', searchController.returnLatest);
module.exports = router;