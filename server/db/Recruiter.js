const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("RecruiterInfo", schema);
