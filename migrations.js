const { up, down } = require("serverless-pg-migrations/handlers");

module.exports.up = up;

module.exports.down = down;