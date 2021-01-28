const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
require("./middlewares/session")(app);
require("./middlewares/passport")(app);
require("./middlewares/locals")(app);

// middleware
if (process.env.NODE_ENV === 'production') {
  app.use(
    logger('common', {
      stream: fs.createWriteStream('./access.log', { flags: 'a' }),
    }),
  );
} else {
  app.use(logger('dev'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./routes/book.route'));
app.use(require('./routes/admin.route'));
app.use(require('./routes/account.route'));
app.use(require('./routes/user.route'));
app.use(require('./routes/librarian.route'));
app.use(require('./routes/stockkeeper.route'));

// catch 404 and forward to error handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({
    error: '404 Notfound',
  });
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message: '',
      error: 'Invalid token.',
      data: {},
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
