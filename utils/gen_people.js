var mongoose = require("mongoose");
var faker = require("faker");
var PersonModel = require("../models/PersonModel");

mongoose.connect("mongodb://arthur:arthur@192.168.99.100:27017/admin", {
  useNewUrlParser: true
});

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const p = new PersonModel();
      p.name = faker.name.firstName();
      p.contry = faker.address.country();
      p.email = faker.internet.email();
      p.company = faker.company.companyName();
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
