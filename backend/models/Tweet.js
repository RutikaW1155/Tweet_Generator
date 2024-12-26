const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tweet", tweetSchema);
