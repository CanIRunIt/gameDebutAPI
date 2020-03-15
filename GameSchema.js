const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = mongoose.Schema({
    title:String,
    OS: String,
    Processor: String,
    Memory: String,
    Graphics: String,
    Storage: String
  });
  
  // compile schema to model
  var Game = mongoose.model('Game', GameSchema, 'gameDetails');

  module.exports = Game ;