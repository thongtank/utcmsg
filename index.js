var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var LINEBOT = require('line-messaging');
var path = require('path');
var bodyParser = require('body-parser');

var pug = require('pug');

var cookieParser = require('cookie-parser');
var csrf = require('csurf');

io.on('connection', function(socket){
    console.log('IO connected');
    socket.on('welcome', function(){
        socket.emit('msg-welcome', '1', '2', '3');
    });
});

app.use('/static', express.static(__dirname));

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var csrfProtection = csrf({ cookie: true });
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.get('/', csrfProtection, function(req, res){
    // res.send('Hello World!');
    // res.sendFile(path.join(__dirname, 'home.html'));
    // res.render('home', { title: 'KUY', message: 'Hello there!', tokens: req.csrfToken()});
    var view = app.get('views');
    var html = pug.compileFile(path.join(view, 'template.pug'))({
        name: 'TONG'
    });
    res.send(html);
});

app.get('/create', csrfProtection, function(req, res){
    // res.send('Hello World!');
    // res.sendFile(path.join(__dirname, 'home.html'));
    res.render('home', { title: 'KUY', message: 'Hello there!', tokens: req.csrfToken()});
});

app.post('/save', function(req, res){
    res.json(req.body);
});

http.listen(3000, function(req, res){
    console.log('Application used port 3000');
});