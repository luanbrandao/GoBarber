// yarn add pg pg-hstore
require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  // host: process.env.DB_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PAST,
  // database: process.env.DB_NAME,
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
