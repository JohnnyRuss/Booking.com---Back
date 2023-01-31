const { config } = require("dotenv");

config();

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
    console.log(`DB Is Connected Successfully`);
    SERVER.listen(port, () => console.log(`App Listens On Port ${port}`));
  })
  .catch((err) => {
    process.on("unhandledRejection", (err) => {
      console.log("Unhandled Rejection, server is closed >", err.message);
      SERVER.close(() => process.exit(1));
    });
  });

// mongoose.connection.on("disconnected");
// mongoose.connection.on("connected");
