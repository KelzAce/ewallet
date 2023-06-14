const CONFIG = require('./config/config');
const express = require('express');
const router = require('express').Router();
const dotenv = require('dotenv');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const walletRouter = require('./routes/walletRouter');
const paymentRouter = require('./routes/paymentRouter');
const profileRouter = require('./routes/profileRouter');
const bankAccountRouter = require('./routes/bankAccoutRouter');
const transactionRouter = require('./routes/transactionRouter');
const transactionCategoryRouter = require('./routes/transactionCategoryRouter');

// connect to db
require('./middleware/db')(CONFIG.DATABASE_URI);
require('dotenv').config();

const connectToDatabase = require('./middleware/db.js');

const URI = process.env.DATABASE_URI; // Access the DB_URI variable from .env
connectToDatabase(URI);

PORT = process.env.PORT;

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/profile', profileRouter);
app.use('/api/bankAccount/:id', bankAccountRouter);
app.use('/api/transaction/:id', transactionCategoryRouter);

//LIMIT REQUEST FROM SAME API
const limiter = rateLimit({
  //100 request per hour
  max: 100,
  //1hour
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});

app.use('/api', limiter);

//BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10kb' }));

//DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());

//DATA SANITIZATION AGAINST XSS(CROSS SITE SCRIPTING)
app.use(xss());

app.use(express.static(`${__dirname}/public`));

//SERVIN STATIC FILES
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
