exports.start_sell = function(req, res){
  res.render('sell');
};

exports.sell_info = function(req, res){
  res.render('sell_info');
};

exports.checkout = function(req, res){
  res.render('checkout');
};

exports.logout = function(req,res){
		req.session.destroy();
		res.header('Cache-Control', 'no-cache, privare,no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("logout", { fname: 'Sign in', or: 'or', register: 'register'});
}

exports.sell_review = function(req,res){
	if(req.session.item_name) {
		res.header('Cache-Control', 'no-cache, privare,no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("sell_review", { item_name: req.session.item_name, item_desc: req.session.item_desc, price: req.session.price, quantity: req.session.quantity, sellingType: req.session.selling_type });
	}
	else {
		res.render('home');
	}
}


exports.redirectToHomepage = function(req,res){
	if(req.session.fname) {
		res.header('Cache-Control', 'no-cache, privare,no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage", { fname: req.session.fname, last_logged: req.session.log, or: '', register: '',});
	}
	else {
		res.render('home');
	}
}

exports.home = function(req, res){
  res.render('homepage', {fname: 'Sign in', last_logged: req.session.log, or: 'or', register: 'register'});
};

exports.cart = function(req,res){
	if(req.session.user_id) {
		res.header('Cache-Control', 'no-cache, privare,no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("cart", {fname: req.session.fname, last_logged: req.session.log, or: '', register: '',});
	}
	else {
		res.render('home');
	}
}

exports.profile = function(req,res){
	res.render('user_info', { user_id: req.session.user_id});
}

exports.thanks = function(req,res){
	res.render('thanks', { user_id: req.session.user_id});
}

