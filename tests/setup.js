jest.setTimeout(30000)

require("../models/User");
const mongoose = require("mongoose");
const keys = require("../config/keys");


mongoose.Promise = global.Promise //Make use of the global nodejs Promise
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
