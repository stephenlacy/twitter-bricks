var express = require('express')
  , app = express()
  , hbs = require('hbs')
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , io = require('socket.io').listen(server)

server.listen(5000)

app.set('view engine', 'html')
app.use(express.static('static'))
app.engine('html', hbs.__express)
app.use(express.bodyParser())



var index = {
  title:'Twitter Bricks - Twitter stream'
, listhint:''
, change: 'Change Hash'
, about: 'Created by: Steve Lacy slacy.me'
, example:{
      name:'Steve L '
    , username:'AZInventor'
    , tweet:'Tweet! This is an example Tweet brick'
    , icon: 'https://si0.twimg.com/profile_images/378800000449713578/a0d0be39063109369aef6765c83c1bad.png'
  }
}

app.get('/', function(req, res){
  res.render('index', {index:index})
})


 var T = new Twit({
    consumer_key:         'ZEZnKlOuys5lE7MxXtUwg'
  , consumer_secret:      'hjOUNrZaA6Lhd45CJMPjeRCZotXgsnz0uoO6dkxd4cU'
  , access_token:         '402765441-S4JulpyfHVsnVMNxoEhisrlg31f3IxZHfBnFQrbq'
  , access_token_secret:  'zcb1IxWdDRwJbRIRnaQED2wEicygdMrqPi1C2PdSLL0'
})


io.sockets.on('connection', function (socket) {
  console.log('Socket.io connected')

  socket.on('hash', function(hash){
    var streamHash = hash.hash
    var stream = T.stream('statuses/filter', { track: streamHash })

    stream.on('tweet', function (tweet) {
      io.sockets.emit('stream', {text:tweet.text, name:tweet.user.name, username:tweet.user.screen_name, icon:tweet.user.profile_image_url, hash:streamHash})
    })
  })
})

 