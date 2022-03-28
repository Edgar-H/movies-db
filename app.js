const express = require('express');
const cors = require('cors');

const { globalErrorHandler } = require('./src/middlewares/error.controller');
const { usersRouter } = require('./src/routes/users.routes');
const { moviesRouter } = require('./src/routes/movies.routes');
const { actorsRouter } = require('./src/routes/actors.routes');
const { AppError } = require('./src/util/appError');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/actors', actorsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };
