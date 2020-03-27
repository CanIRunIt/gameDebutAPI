const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CPUDetailsSchema = mongoose.Schema({
     CPU : {type: String,required:true ,index: {unique: true}},
     Price:String
  });
  
  // compile schema to model
  var CPUDetails = mongoose.model('CPUDetail', CPUDetailsSchema, 'CPUDetails');

  module.exports = CPUDetails ;