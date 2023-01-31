import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { fileURLToPath } from "url";
import path from "path";

import { getOrigins } from "./src/lib/index.js";
import { AppError, ErrorController } from "./src/utils/index.js";

import authenticationRoutes from "./src/routes/authenticationRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import hotelRoutes from "./src/routes/hotelRoutes.js";
import roomsRoutes from "./src/routes/roomsRoutes.js";
import articleRoutes from "./src/routes/articleRoutes.js";

const App = express();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

export default App;
