require('dotenv').config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/fitness.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
};
