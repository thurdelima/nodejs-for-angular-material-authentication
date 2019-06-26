var mongoose = require("mongoose");
var faker = require("faker");

var ProductModel = require("../models/ProductModel");

mongoose.connect("mongodb://arthur:arthur@192.168.99.100:27017/admin", {
  useNewUrlParser: true
});

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const p = new ProductModel();
      p.name = faker.commerce.productName();
      p.deparment = faker.commerce.department();
      p.price = faker.commerce.price();
      await p.save();
    }
  } catch (err) {
    console.log(err);
  }
}

add(100).then(() => {
  console.log("OK");
  mongoose.disconnect();
});
