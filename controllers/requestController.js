const request = require('request');
const bing = require('node-bing-api')({accKey: process.env.SECRET});

exports.getSearch = (req, res, next) => {
  const default_offset = 5;
  var offset = req.query && req.query.offset && !isNaN(req.query.offset)
      ? req.query.offset : default_offset;
  
  // make the request using the bing api
  bing.images(req.params.search, {
    count: offset              
  }, function(b_error, b_res, body){
    // Save the response on the 'locals' property so we can access it in the next middlewarre
    res.locals.response = body.value;
    next();
  });
}

exports.formatResponse = (req, res, next) => {
  var formattedResp = [];
  var response = res.locals.response;
  for (var prop in response) {
    formattedResp.push({
      url: response[prop].webSearchUrl,
      snippet: response[prop].name,
      thumbnail: response[prop].hostPageUrl
    });
  }
  res.json(formattedResp);
}