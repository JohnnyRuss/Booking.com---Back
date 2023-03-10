require("dotenv").config();

const App = require("./app.js");
const mongoose = require("mongoose");
const { createServer } = require("http");
const getAppConnection = require("./src/lib/getAppConnection");

process.on("uncaughtException", (err) => {
  console.log("uncaughtException ! process is exited", err);
  process.exit(1);
});

const SERVER = createServer(App);

const { port, link } = getAppConnection();

mongoose.set("strictQuery", false);
mongoose
  .connect(link)
  .then(() => {
    SERVER.listen(port, () => console.log(`App Listens On Port ${port}`));
    console.log(`DB Is Connected Successfully`);
  })
  .catch((err) => {
    process.on("unhandledRejection", (err) => {
      console.log("Unhandled Rejection, server is closed >", err.message);
      SERVER.close(() => process.exit(1));
    });
  });
