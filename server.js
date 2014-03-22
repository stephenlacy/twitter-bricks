var express = require('express');
var app = express();
var jade = require('jade');
var http = require('http');
var server = http.createServer(app);
var Twit = require('twit');
var io = require('socket.io').listen(server);

var keys = require('./keys');

server.listen(5000);

app.set('view engine', 'jade');
app.use(express.static('static'));
app.use(express.bodyParser());



var index = {
  title:'Twitter Bricks - Twitter stream',
  listhint:'',
  change: 'Change Hash',
  about: 'Created by: Steve Lacy slacy.me',
  example:{
    name:'Steve L ',
    username:'SteveDeLacy',
    tweet:'Tweet! This is an example Tweet brick',
    icon: 'http://slacy.me/images/social.png',
  }
};

app.get('/', function(req, res){
  res.render('index', {index:index});
});


var T = new Twit({
  consumer_key:         keys.consumer_key,
  consumer_secret:      keys.consumer_secret,
  access_token:         keys.access_token,
  access_token_secret:  keys.access_token_secret,
});



io.sockets.on('connection', function (socket) {
  console.log('Socket.io connected');

  socket.on('hash', function(hash){
    var streamHash = hash.hash;
    var stream = T.stream('statuses/filter', { track: streamHash });

    stream.on('tweet', function (tweet) {
      io.sockets.emit('stream', {text:tweet.text, name:tweet.user.name, username:tweet.user.screen_name, icon:tweet.user.profile_image_url, hash:streamHash});
    });
  });
});

 