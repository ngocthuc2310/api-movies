const paging = require("../utils/paging.js");

module.exports = class Video {
  constructor(id, video) {
    this.id = id;
    this.video = video;
  }
  static getTrailer() {
    const trailerArr = paging.video();
    let list = [];
    trailerArr.forEach((x) => {
      let video = [];
      x.videos.forEach((y) => {
        if (
          y.official &&
          y.site == "YouTube" &&
          (y.type == "Teaser" || y.type == "trailer")
        )
          video.push(y);
      });
      video.sort((a, b) => {
        let aa = new Date(a.published_at);
        let bb = new Date(b.published_at);
        return bb - aa;
      });
      list.push({
        id: x.id,
        video,
      });
    });
    return list;
  }
};
