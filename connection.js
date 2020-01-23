const keys = require("./config/keys");
var knex = require("knex")({
  client: "mysql",
  connection: {
    host: keys.mysqlHost,
    user: keys.mysqlUser,
    password: keys.mysqlPassword,
    database: keys.mysqlDatabase
  },
  pool: { min: 0, max: 10 }
});

module.exports = knex;
