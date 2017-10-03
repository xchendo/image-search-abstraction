var mongoose = require('mongoose');
var searchSchema = new mongoose.Schema({
  term: {
    type: String,
    trim: true,
    required: 'Needs a search term'
  },
  when: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Search', searchSchema);