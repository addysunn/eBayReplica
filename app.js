
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , session = require('client-sessions')
  , user = require('./routes/user')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , reg = require('./routes/register')
  , itemm = require('./routes/item')
  , sell = require('./routes/sell')
  , cronRoute = require('./routes/cron')
  // , pool = require('./routes/pool')
  , cron = require('cron')
  , myCronJob = cron.job("*/5 * * * * *", cronRoute.processTransaction);
     
 myCronJob.start();

var app = express();

// all environments
app.use(session({ //configure the sessions
  cookieName: 'session',
  secret: 'cmpe273_test_string',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon("public/images/ebayfavicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/home', sell.home);
app.get('/homepage', sell.redirectToHomepage);
app.get('/users', user.list);
app.get('/register', reg.register);
app.post('/login', reg.afterSignIn);
app.get('/signin', reg.signin);
app.post('/signup', reg.signup);
app.get('/item', itemm.item);
app.get('/item2', reg.item2);
app.post('/item', reg.item_db);
app.get('/auction_item', itemm.auction_item);
app.get('/auction_item2', reg.auction_item2);
app.post('/auction', reg.auction);
app.get('/sell', sell.start_sell);
app.get('/sell_info', sell.sell_info);
app.get('/sell_review', sell.sell_review);
app.post('/home', reg.adds);
app.post('/listing', reg.listing);
app.post('/listing_db', reg.listing_db);
app.get('/cart', sell.cart);
app.post('/cart', reg.cart);
app.post('/display_cart', reg.display_cart);
app.post('/updateQuantity', reg.updateQuantity);
app.get('/profile', sell.profile);
app.get('/checkout', sell.checkout);
app.post('/profile', reg.profilee);
app.post('/pay', reg.pay);
app.get('/paid', sell.thanks);
app.get('/logout', sell.logout);
app.post('/validate_card', reg.validate);
app.get('/:username', reg.profilec);
// app.get('/profilec', reg.profilec);
// app.post('/fetchprofile', reg.profilec);
// app.get('/myprofile', reg.pro);

// app.post('/logout', reg.logout);
// app.post('/checkout', reg.checkout);
// var data = fs.readFileSync('./public/config/pool.conf', 'utf-8');
// if(data!=null && typeof data !='undefined'){
//   var lines = data.split("\n");
//   pool.createPool(lines[0], lines[1])
// }
// else{
//   pool.createPool(100, 400)
// }

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
