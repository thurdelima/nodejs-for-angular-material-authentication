var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  'name': String,
  'deparment': String,
  'price': String

});


module.exports = mongoose.model('Product', ProductSchema);
