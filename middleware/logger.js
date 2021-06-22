//3.2 Middleware

const moment = require('moment'); //deals with date format

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}${moment().format()}`);
  next();
}

module.exports = 'logger';