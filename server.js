var express = require('express')
  , app = express()
  , hbs = require('hbs')
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , io = require('socket.io').listen(server)

server.listen(5000)
console.log('Server listening on port 5000')

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
    , username:'SteveDeLacy'
    , tweet:'Tweet! This is an example Tweet brick'
    , icon: 'https://si0.twimg.com/profile_images/378800000449713578/a0d0be39063109369aef6765c83c1bad.png'
  }
}

app.get('/', function(req, res){
  res.render('index', {index:index})
})


 var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
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

 
