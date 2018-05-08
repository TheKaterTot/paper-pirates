const influx = require("influx");
const uuid = require("uuid");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const express = require("express");
const influxExpress = require("influx-express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("dotenv").config()

const influxOptions = {
  database: "paperpirates",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  protocol: "https"
}

app.use(influxExpress(influxOptions));

const client = new influx.InfluxDB(influxOptions)

io.on("connection", socket => {
  console.info("client connected");

  const sessionID = uuid.v4();
  let gameID = -1;

  socket.on("gameover", results => {
    client.writeMeasurement("events", [
      {
        tags: { sessionID, gameID, event: "death" },
        fields: {
          deaths: 1,
          score: results.score
        }
      }
    ]);
    console.info("Game Over");
  });

  socket.on("gamestart", results => {
    gameID = uuid.v4();
    client.writeMeasurement("events", [
      {
        tags: { sessionID, gameID, event: "newGame" },
        fields: {
          newGames: 1,
        }
      }
    ]);
    console.info("Game Started");
  });

  socket.on("playerfire", results => {
    client.writeMeasurement("events", [
      {
        tags: { sessionID, gameID, event: "playerMissile" },
        fields: {
          fires: 1,
        }
      }
    ]);
  });

  socket.on("enemyfire", results => {
    client.writeMeasurement("events", [
      {
        tags: { sessionID, gameID, enemyID: results.enemyID, event: "enemyMissile" },
        fields: {
          enemyFires: 1,
        }
      }
    ])
  })
});

// Serve static assets
const staticMiddleware = express.static(path.join(__dirname, "public"));
app.use("/public", staticMiddleware);

// Render main page
app.get("/", (req, res) => {
  res.writeHead(200, {
    "content-type": "text/html"
  });

  fs.createReadStream(path.join(__dirname, "views", "index.html")).pipe(res);
});

const port = _.get(process.env, "PORT", 4000);
server.listen(port, () => {
  console.info(`Now listening on port ${port}`);
});
