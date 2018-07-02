'use strict';

// Modules
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Express Application
const app = express();

// Server configuration
const port = process.env.PORT || '3020';
const env = process.env.NODE_ENV || 'development';

// PathResolve
const pathResolve = (...args) => path.resolve(__dirname, ...args);
const PUBLIC_DIR = pathResolve('../public');
const MOCK_DIR = pathResolve('../mock');

// Middlewares
app.disable('x-powered-by');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (env === 'development') {
  app.use(morgan('dev', { mode: 'dev' }));
}

// Routing
app.use('/api', express.static(MOCK_DIR));
app.use('/static', express.static(pathResolve(PUBLIC_DIR, 'static')));

app.get('/', (req, res, next) =>
  res.status(200).sendFile(pathResolve('index.html')));

// Listener
app.listen(port, () =>
  console.log(`NODEJS IS RUNNING ON PORT ${port} - ENV: ${env}.`)
);