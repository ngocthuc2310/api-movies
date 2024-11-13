const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
router.use(body.urlencoded({ extended: true }));
const MovieControler = require("../controllers/movie-co.js");

router.get("/api/movies/trending/:page", MovieControler.getTrendingMovie);
router.get("/api/movies/top-rate/:page", MovieControler.getRatingMovie);
router.get("/api/movies/discover/:page/:genid", MovieControler.getMoviByGenre);
router.post("/api/movies/search/:page", MovieControler.postSearch);
router.get("/api/movies/bymore/:page", MovieControler.getSearchByMore);

module.exports = router;
