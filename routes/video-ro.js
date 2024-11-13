const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
router.use(body.urlencoded({ extended: true }));
const VideoControler = require("../controllers/video-co");

router.post("/api/movies/video", VideoControler.getTrailer);

module.exports = router;
