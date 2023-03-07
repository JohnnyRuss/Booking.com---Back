const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// const { fileURLToPath } = require("url");
const path = require("path");

const getOrigins = require("./src/lib/getOrigins");
const AppError = require("./src/utils/AppError");
const ErrorController = require("./src/utils/ErrorController");

const authenticationRoutes = require("./src/routes/authenticationRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const hotelRoutes = require("./src/routes/hotelRoutes.js");
const roomsRoutes = require("./src/routes/roomsRoutes.js");
const articleRoutes = require("./src/routes/articleRoutes.js");

const App = express();

App.use(function (req, res, next) {
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization"
  );

  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

App.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (!getOrigins().includes(origin))
        return cb(new Error("this originn is no allowed on this API !"), true);

      return cb(null, true);
    },
  })
);

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
App.use(express.static(path.join(__dirname, "public/assets")));

App.use(cookieParser());

App.use(morgan("dev"));

App.use("/api/v1/authentication", authenticationRoutes);
App.use("/api/v1/user", userRoutes);
App.use("/api/v1/hotels", hotelRoutes);
App.use("/api/v1/rooms", roomsRoutes);
App.use("/api/v1/inspiration", articleRoutes);

App.use("*", (req, res, next) => {
  next(new AppError(404, `can't find ${req.originalUrl} on this server`));
});

App.use(ErrorController);

module.exports = App;
