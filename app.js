const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const laporanRouter = require('./routes/laporan');
const keluargaRouter = require('./routes/keluarga');
const dataWargaRT = require('./routes/dataWargaRT')
const dataPositif = require('./routes/dataPositif')
const vaksinRouter = require('./routes/vaksin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Middleware to setHeader
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(keluargaRouter);
app.use(laporanRouter);
app.use(dataWargaRT)
app.use(dataPositif)
app.use(vaksinRouter);

module.exports = app;
