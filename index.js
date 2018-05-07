const influx = require("influx");
const uuid = require("uuid");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const client = new influx.InfluxDB("http://localhost:8086/paperpirates");

io.on("connection", socket => {
  console.info("client connected");

  const sessionID = uuid.v4();
  let gameID = -1;

  socket.on("gameover", results => {
    client.writeMeasurement("deaths", [
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

  socket.on("gamestarted", () => {
    gameID = uuid.v4();
    console.info("Game Started");
  });
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
