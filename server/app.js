const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const routes = require("./routes");
const initDatabase = require("./startUp/initDatabase");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("port") ?? 4000;
// "mongoUri": "mongodb://11.198.152.172:27017/test",
// set PORT=3000&&
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });

    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.yellow(`MongoDB connected.`));
    app.listen(PORT, () => {
      console.log(chalk.blue(`Server haas been started on port ${PORT}....`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
