const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgress",
    password: "kady3alaam",
    host: "localhost",
    port: 5432,
    database: "booktradingapp"
})

module.exports = pool;