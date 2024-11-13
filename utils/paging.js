const fs = require("fs");
const path = require("path");
const pMovie = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);
const pGenre = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);
const pVideo = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);
const pToken = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

exports.Movie = () => JSON.parse(fs.readFileSync(pMovie, "utf8"));
exports.Genre = () => JSON.parse(fs.readFileSync(pGenre, "utf8"));
exports.video = () => JSON.parse(fs.readFileSync(pVideo, "utf8"));
const token = () => JSON.parse(fs.readFileSync(pToken, "utf8"));

exports.Author = (tk, NO, YES) => {
  if (Boolean(tk)) {
    fs.readFile(pToken, (err, data) => {
      if (err) console.log("Loi doc file!!");
      else {
        const tt = JSON.parse(data).findIndex((x) => x.token == tk);
        if (tt > -1) {
          YES();
        } else {
          NO();
        }
      }
    });
  } else {
    NO();
  }
};

exports.readFile = (filename, CB) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    filename
  );
  fs.readFile(p, (er, strData) => {
    if (Boolean(er)) {
      console.log(er);
    } else CB(JSON.parse(strData));
  });
};
