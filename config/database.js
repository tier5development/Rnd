const mysql       = require("mysql"),
      db_config   = require('./config.json')

/* Configuration for remote database */
const config = {
  adapter         : "mysql",
  host            : db_config.dbConn.host,
  port            : db_config.dbConn.port,
  user            : db_config.dbConn.user,
  password        : db_config.dbConn.password,
  database        : db_config.dbConn.database,
  debug           : db_config.dbConn.debug
}


/* Main method to do connection */
const getConnection = function(callback) {
  const pool = mysql.createPool(config)

  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err)
    }

    callback(err, conn)
  })
}


module.exports.getConnection = getConnection
