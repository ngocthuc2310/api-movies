const Video = require("../models/Video-mo.js");

exports.getTrailer = (req, res, next) => {
  const vd = Video.getTrailer();
  res.status(200).json(vd);
};
