const paging = require("../utils/paging.js");

module.exports = class Movies {
  constructor(
    id,
    adult,
    backdrop_path,
    title,
    original_language,
    original_title,
    overview,
    poster_path,
    media_type,
    genre_ids,
    popularity,
    release_date,
    video,
    vote_average,
    vote_count
  ) {
    this.id = id;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.title = title;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.media_type = media_type;
    this.genre_ids = genre_ids;
    this.popularity = popularity;
    this.release_date = release_date;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
  static getTrending(page) {
    let trendingArr = paging.Movie();
    const total_pages = Math.floor(trendingArr.length / 20);
    trendingArr.sort((a, b) => a.popularity - b.popularity);
    const results = trendingArr.slice((page - 1) * 20, page * 20);
    return { results, page, total_pages };
  }
  static getRating(page) {
    let RatingArr = paging.Movie();
    const total_pages = Math.floor(RatingArr.length / 20);
    RatingArr.sort((a, b) => b.vote_average - a.vote_average);
    const results = RatingArr.slice((page - 1) * 20, page * 20);
    return { results, page, total_pages };
  }
  static getMoviByGenre(genreId, page) {
    const moviesArr = paging.Movie();
    const genreArr = paging.Genre();
    let tt = moviesArr.filter((x) => x.genre_ids.includes(Number(genreId)));
    const results = tt.slice((page - 1) * 20, page * 20);
    const genre_name = genreArr.filter((y) => y.id == genreId)[0].name;
    const total_pages = Math.floor(tt.length / 20);
    return { results, page, total_pages, genre_name };
  }
  static SearchByKeyword(keyWord, page) {
    const moviesArr = paging.Movie();
    const tt = moviesArr.filter(
      (x) =>
        (x.title ? x.title : x.name).includes(keyWord) ||
        x.overview.includes(keyWord)
    );
    const total_pages = Math.floor(tt.length / 20);
    const results = tt.slice((page - 1) * 20, page * 20);
    let y;
    return { results, page, total_pages };
  }
  static SearchByMore(genreName, mediaType, language, year, page, AA) {
    paging.readFile("movieList.json", (mo) => {
      paging.readFile("genreList.json", (ge) => {
        let tt = [];
        mo.forEach((x) => {
          ge.forEach((y) => {
            let da = new Date(x.release_date);
            let ye = da.getFullYear();
            if (
              (genreName
                ? x.genre_ids.includes(y.id) && y.name == genreName
                : true) &&
              (mediaType ? x.media_type == mediaType : true) &&
              (language ? x.original_language : true) &&
              (year ? ye == year : true)
            )
              tt.push(x);
          });
        });
        const total_pages = Math.floor(tt.length / 20);
        const results = tt.slice((page - 1) * 20, page * 20);
        AA({ results, page, total_pages });
      });
    });
  }
};
