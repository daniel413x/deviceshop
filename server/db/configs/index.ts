const {
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  DEV_DB_HOSTNAME,
  DEV_DB_PORT,
  TEST_DB_USERNAME,
  TEST_DB_PASSWORD,
  TEST_DB_NAME,
  TEST_DB_HOSTNAME,
  TEST_DB_PORT,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
  PROD_DB_HOSTNAME,
  PROD_DB_PORT,
} = process.env;

export const development = {
  dialect: 'postgres',
  username: DEV_DB_USERNAME,
  password: DEV_DB_PASSWORD,
  database: DEV_DB_NAME,
  host: DEV_DB_HOSTNAME,
  port: Number(DEV_DB_PORT),
};

export const test = {
  dialect: 'postgres',
  username: TEST_DB_USERNAME,
  password: TEST_DB_PASSWORD,
  database: TEST_DB_NAME,
  host: TEST_DB_HOSTNAME,
  port: Number(TEST_DB_PORT),
};

export const production = {
  dialect: 'postgres',
  username: PROD_DB_USERNAME,
  password: PROD_DB_PASSWORD,
  database: PROD_DB_NAME,
  host: PROD_DB_HOSTNAME,
  port: Number(PROD_DB_PORT),
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
};
