const expess = require("express");
const app = expess();
const movieRouter = require("./routes/movie-ro.js");
const videoRouter = require("./routes/video-ro.js");
const Controller404 = require("./controllers/404.js");

app.use(movieRouter);
app.use(videoRouter);
app.use(Controller404);

app.listen(5000, () => {
  console.log("server running!");
});
