const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// path for css stylesheet
const path = require('path')
// importing handlebars
const exphbs = require('express-handlebars');
const exp = require('constants');
const hbs = exphbs.create({})
// import sessions
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// config sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// css route using static keyward
app.use(express.static(path.join(__dirname, 'public')));
// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// session 
app.use(session(sess))

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});