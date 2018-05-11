var express = require("express");
var path = require("path");

const app = express();

const server = require("http").createServer(app);

app.use(express.static("data"));

require("./config/socket")(server);
require("./config/routes")(app);

module.exports = {app, server};
