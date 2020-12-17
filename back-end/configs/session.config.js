const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
 
module.exports = app => {

  const isDevMode = process.env.ENV === 'development'

  if (!isDevMode) {
    app.set('trust proxy', 1);
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { 
        maxAge: 60000 * 100,
        secure: !isDevMode,
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24 
      })
    })
  );
};