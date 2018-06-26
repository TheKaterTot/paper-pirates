# paper-pirates

## Welcome to Paper Pirates

### If you want to run Paper Pirates locally, either for fun or to make improvements (or both!), follow these steps:

1. Clone this repo
2. Yarn install
3. In the command line, $ node index.js
4. Celebrate appropriately

### To monitor with InfluxDB:

Follow steps 1-4 above. To set up a local instance of the InfluxData platform to monitor the game, you'll need to install at
least InfluxDB (and Chronograf or a similar visualization tool if you want to visualize your data).

In index.js:
```
const influxOptions = {
  database: "paperpirates",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  protocol: "https"
}
```

Change the database details to match your desired InfluxDB instance. 

Play the game and watch the metrics roll in.
