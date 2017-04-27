
exports.item = function(req, res){
	if(req.session.fname) {
		res.header('Cache-Control', 'no-cache, privare,no-store,must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("item", { fname: req.session.fname, last_logged: req.session.log, or: '', register: ''});
	}
  res.render('item');
};

exports.auction_item = function(req, res){
  res.render('auction_item', { fname: req.session.fname, last_logged: req.session.log, or: '', register: ''});
};
