const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');

const { database, port } = require('./config');

// Intializations
const app = express();
require('./lib/cookies');
require('./lib/passport');

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

// Settings
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		helpers: require('./lib/handlebars'),
	})
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
	session({
		secret: 'mamaducktopsecrettoken',
		resave: false,
		saveUninitialized: false,
		store: new MySQLStore(database),
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
	app.locals.message = req.flash('message');
	app.locals.success = req.flash('success');
	app.locals.user = req.user;
	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/index.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/form', require('./routes/form.routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res) {
	res.render('404');
});

module.exports = app;
