const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ModelImg = mongoose.model("Picture", imageSchema);

module.exports = ModelImg;
