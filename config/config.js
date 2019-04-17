require('dotenv').config();

const envDatabase = {
  use_env_variable: "DATABASE_URL",
};

const env = {
  development: envDatabase,
  production: envDatabase
};

module.exports = env;

