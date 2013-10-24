!["Twitter Bricks](http://stevelacy.github.io/twitter-bricks/images/twitter-bricks.png)


#Twitter Bricks

### Realtime Streaming Tweet feed written in JavaScript for node.js
Twitter Bricks will display a real-time feed of all tweets based on the entered Hash tweeted. It uses [Twit](https://github.com/ttezel/twit) to connect to the Twitter 1.1 API.

####Features:

* Real-time [Socket.io](https://github.com/LearnBoost/socket.io) streaming of tweets
* Responsive CSS UI
* Real time tweet feed on all connected browsers



*** 

#Instalation instructions

Extract to desiered folder and install the dependencies:
``` javascript
npm install
```

Use [dev.twitter.com](https://dev.twitter.com) to create an app, ensure that the URL is set correctly and enable Access tokens

Edit  `server.js` and insert your Twitter app keys into the following section:

```javascript
var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})
```

Edit `js/jquery.js` and change the host and port to your node server:
```javascript
var socket = io.connect('http://localhost:5000'); 
```

Run the node.js app:
```javascript
node server.js
```

Twitter Bricks will now be running on [http://localhost:5000](http://localhost:5000)

Once running click Change Hash to enter the desired Twitter hash to stream.




***




#License

The MIT License (MIT)

Copyright (c) 2013 Steve Lacy (me@slacy.me)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.