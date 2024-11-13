const Movie = require("../models/Movies-mo.js");
const paging = require("../utils/paging.js");

exports.getTrendingMovie = (req, res, next) => {
  paging.Author(
    req.query.token,
    () => {
      res.status(401).json({ message: "Unauthorized" });
    },
    () => {
      const page = req.params.page;
      const obj = Movie.getTrending(page);
      res.status(200).json(obj);
    }
  );
};

exports.getRatingMovie = (req, res, next) => {
  paging.Author(
    req.query.token,
    () => {
      res.status(401).json({ message: "Unauthorized" });
    },
    () => {
      const page = req.params.page;
      const obj = Movie.getRating(page);
      res.status(200).json(obj);
    }
  );
};

exports.getMoviByGenre = (req, res, next) => {
  paging.Author(
    req.query.token,
    () => {
      res.status(401).json({ message: "Unauthorized" });
    },
    () => {
      const page = req.params.page;
      const genreId = req.params.genid;
      const obj = Movie.getMoviByGenre(genreId, page);
      res.status(200).json(obj);
    }
  );
};

exports.postSearch = (req, res, next) => {
  paging.Author(
    req.query.token,
    () => {
      res.status(401).json({ message: "Unauthorized" });
    },
    () => {
      const keyWord = req.body.q;
      const page = req.params.page;
      if (!Boolean(keyWord)) {
        res.status(400).json({ message: "Not found keyword parram" });
        return;
      }
      const obj = Movie.SearchByKeyword(keyWord, page);
      res.status(200).json(obj);
    }
  );
};

exports.getSearchByMore = (req, res, next) => {
  paging.Author(
    req.query.token,
    () => {
      res.status(401).json({ message: "Unauthorized" });
    },
    () => {
      const gen = req.query.gen,
        medi = req.query.medi,
        lang = req.query.lang,
        year = req.query.year;
      page = req.params.page;
      Movie.SearchByMore(gen, medi, lang, year, page, (obj) => {
        res.status(200).json(obj);
      });
    }
  );
};
