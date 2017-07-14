import path from 'path';
import _ from '../utils/fp';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 7000;
/**
 * @property {bool}  logStatic         - Log 404 errors for static files.
 * @property {bool}  logHeaders        - Log http headers to console.
 * @property {array}  gzip             - Array of file types which have to be compressed with gzip. Based on MIME types
 * @property {bool}  html5HistoryAPI   - Redirect all request accept ajax and static files to '/' index route
 */
let base = {
  app: {
    env,
    logStatic: true,
    logHeaders: false,
    root: path.resolve(__dirname, '../'),
    gzip: ['text', 'css', 'javascript'],
    html5HistoryAPI: true,
  },
  postgres: {
    user: 'darmikon', //env var: PGUSER
    database: 'test2', //env var: PGDATABASE
    password: 'postgres-hero', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  }
};


let specific = {
  development: {
    app: {
      port: DEFAULT_PORT,
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || DEFAULT_PORT,
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  },
};

export default _.merge(specific[env])(base);
