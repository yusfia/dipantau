/**
 * Created by CT on 10/12/2017.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./configuration/DB')
var debug = require('debug')('gate:server');
var http = require('http');
var app = express();
var csrf = require('csurf');
var router = express.Router();
var bcrypt = require('bcryptjs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

database.connect(function(err, dbconnection) {
    if (err) {
        console.log(err);
    } else {
        app.use(function(err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        });

        var port = normalizePort(process.env.PORT || '1307');
        app.set('port', port);
        var server = http.createServer(app);
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);

        function normalizePort(val) {
            var port = parseInt(val, 10);
            if (isNaN(port)) {
                return val;
            }
            if (port >= 0) {
                return port;
            }
            return false;
        }

        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }
            var bind = typeof port === 'string' ?
                'Pipe ' + port :
                'Port ' + port;
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }

        function onListening() {
            var addr = server.address();
            var bind = typeof addr === 'string' ?
                'pipe ' + addr :
                'port ' + addr.port;
            debug('Listening on ' + bind);
        }
        module.exports = app;
        app.db = dbconnection;
        var optionFilter = require('./dipantauapps/optionFilter/optionFilterRoute');
        var loginPetugas = require('./dipantauapps/loginPetugasSurvey/loginPetugasSurveyRoute');
        var listSurveyByUser = require('./dipantauapps/listSurveyMenaraByUser/listSurveyMenaraByUserRoute');
        var menaraByFilter = require('./dipantauapps/MenaraByFilter/MenaraByFilterRoute');
        var addLaporan = require('./dipantauapps/addLaporan/addLaporanRoute');

        var middleware = function(req, res, next) {
            var secretkey = "e4577c7d0efb7cb7b0085f38256b13cab93415bd8222b384aaf3af03840d6326";
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(secretkey, salt);
            if (bcrypt.compareSync(req.headers.api_key, hash)) {
                next();
            } else {
                res.sendStatus(403);
            }
        };

        app.use(middleware);
        app.use('/dipantauapps', optionFilter);
        app.use('/dipantauapps', loginPetugas);
        app.use('/dipantauapps', listSurveyByUser);
        app.use('/dipantauapps', menaraByFilter);
        app.use('/dipantauapps', addLaporan);
    }
});