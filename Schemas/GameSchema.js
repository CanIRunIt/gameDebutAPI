const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = mongoose.Schema({
     title : String,
     OS : String,
     Intel_CPU : String,
     AMD_CPU : String,
     NVIDIA_Graphics : String,
     AMD_Graphics:String,
     VRAM:String,
     RAM:String,
     HDD:String
  });
  
  // compile schema to model
  var Game = mongoose.model('Game', GameSchema, 'gameDetails');

  module.exports = Game ;