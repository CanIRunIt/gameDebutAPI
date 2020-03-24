const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameDetailsSchema = mongoose.Schema({
     title : {type: String,required:true ,index: {unique: true}},
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
  var GameDetails = mongoose.model('GameDetail', GameDetailsSchema, 'game_Details');

  module.exports = GameDetails ;