
/**
 * New node file
 */
 var ejs = require("ejs");
 var mysql = require('./mysql');
 var logs = require('./logs');
 
 function afterSignIn(req,res)
 {
 	
 	var json_responses;
	// check user already exists
	var getUser="select * from user where email='"+req.param("email")+"' and password=aes_encrypt('" + req.param("password") +"','aditya')";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			console.log("wrong query");
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("valid Login");
				
				console.log(results[0].fname);
				req.session.fname = results[0].fname;
				req.session.lname = results[0].lname;
				console.log(results[0].user_id);
				req.session.user_id = results[0].user_id;


				var logg="select last_logged from user where user.user_id = '"+req.session.user_id+"'";
				//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
				console.log("Query is: " +logg);
				mysql.fetchData(function(err,logged){
					if(err){
						throw err;
					}
					else
					{
						if(logged.length > 0){
							console.log("log updated");
							console.log(logged[0].last_logged);
							req.session.log = logged[0].last_logged;	
							console.log(req.session.log);

							logs.logged_data.log('info', "user having id"+ req.session.user_id +   "| signed in at " + req.session.log);	
							
							var log="update user SET last_logged = now() where user.user_id = '"+req.session.user_id+"'";
							//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
							console.log("Query is: " +log);
							mysql.fetchData(function(err,result){
								if(err){
									throw err;
								}
								else
								{
									if(result.length == null){
										console.log("quantity updated");
										json_responses = {"statusCode" : 200 , "results" : results[0].fname};
										res.send(json_responses);
									}
									else {
										console.log("can not update");
										
									}
								}
							},log);


						}
						else {
							console.log("log can not update");
						}
					}
				},logg);

				
			

				
			}
			else {
				console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
										res.send(json_responses);
			}
		}
	},getUser);

	

}

function signup(req,res)
 {
 	var json_responses;
 	var email = req.param("email");
 	var fname = req.param("fname");
 	if(req.param("email") == req.param("reemail")) {
	// check user already exists

	var mail="select * from user where email = '"+req.param("email")+"'";
	//"insert into users (username, password) values ('"+req.param("username")+"', '"+req.param("password")+"')";
	console.log("Query is: " +mail);
	mysql.fetchData(function(err,email){
		if(err){
			throw err;
		}
		else
		{
			if(email.length > 0){
				if(email[0].email == email)
				console.log("user already exists");
								
				json_responses = {"statusCode" : 2000};
				res.send(json_responses);
			}
			else {
				console.log("No duplicate user");

				var getUser="insert into user (email, password, fname, lname) values ('"+req.param("email")+"',aes_encrypt('"+req.param("password")+"','aditya'),'"+req.param("fname")+"','"+req.param("lname")+"')";
				//"insert into users (username, password) values ('"+req.param("username")+"', '"+req.param("password")+"')";
				console.log("Query is: " +getUser);
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else
					{
						if(results.length == null){
							console.log("valid signup");

							req.session.fname = fname;
							json_responses = {"statusCode" : 200 , "results" : results};
							res.send(json_responses);
						}
						else {
							console.log("Invalid Login");
							json_responses = {"statusCode" : 401};
							res.send(json_responses);
						}
					}
				},getUser);}
			}
		
	},mail);}


	else{
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
	}
}



	// exports.signin=signin;
exports.afterSignIn=afterSignIn;
exports.signup=signup;
// exports.getAllUsers=getAllUsers;

exports.register = function(req, res){
  res.render('register');
};

exports.signin = function(req,res){
	res.render('signin');
}


exports.adds = function(req,res) {
	var json_responses;
	// check user already exists
	var getUser="select * from item where item.seller_id != '"+req.session.user_id+"'";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("valid Login");
				
				console.log(results[0].name);
				
				json_responses = {"statusCode" : 200 , "results" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
}

exports.listing = function(req,res){

	var json_responses;
	req.session.item_name = req.param("item_name");
	req.session.item_desc = req.param("item_desc");
	req.session.price = req.param("price");
	req.session.quantity = req.param("quantity");
	req.session.selling_type = req.param("selling type");
	// console.log(req.session.item_name);
	json_responses = {"statusCode" : 200};
	res.send(json_responses);
};

exports.listing_db = function(req,res){

	var json_responses;
	
	var getUser="insert into item (name, description, price, quantity, seller_id, selling_type, ad_expire) values ('"+req.session.item_name+"', '"+req.session.item_desc+"', '"+req.session.price+"', '"+req.session.quantity+"', '"+req.session.user_id+"', '"+req.session.selling_type+"', (select NOW() + INTERVAL 4 DAY from dual))";
	//"insert into users (username, password) values ('"+req.param("username")+"', '"+req.param("password")+"')";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length == null){
				console.log("valid listing");
				json_responses = {"statusCode" : 200 , "results" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);

};

exports.item_db = function(req,res) {
	var json_responses;
	// check user already exists
	req.session.item_id = req.param("item_id");
	var getUser="select * from item,user where item.seller_id = user.user_id and item.item_id='"+req.session.item_id+"' ";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("valid db");
				console.log(results);
				// console.log(results[0].item_id);
				
				json_responses = {"statusCode" : 200 , "results" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
}

exports.cart = function(req,res) {


	var cart_quantity = Number(req.param("cart_quantity"));
	if(req.session.user_id){	
		
		var query = "select * from cart where item_id = '"+req.session.item_id+"' and buyer_id = '"+req.session.user_id+"'";
		
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				
				if (results.length > 0) {
					console.log("already exist!");
					var current_qty = results[0].cart_quantity;
					var new_qty = cart_quantity + current_qty;
					var query = "update cart SET cart.cart_quantity ='"+ new_qty+"' where cart.item_id = '"+req.session.item_id+"'";
					
					mysql.fetchData(function(err, answer) {
						if (err) {
							throw err;
						} else {
							if (answer.length == null) {
								console.log("qty updated to cart");	
								json_responses = {"statusCode" : 200 , "results" : answer};
								res.send(json_responses);
							}else{
								console.log("no records!");
							} 
						}
					}, query); 			
			
				} else {
					console.log("no entries found in DB!");
					var getUser="insert into cart (buyer_id, item_id, cart_quantity) values ('"+req.session.user_id+"', '"+req.session.item_id+"', '"+cart_quantity+"')";
					
					mysql.fetchData(function(err,result){
					if(err){
						throw err;
					}
					else
					{
						if(result.length == null){
							console.log("valid cart db");
							// console.log(result[0].user_id);
							// console.log(result[0].item_id);
							// console.log(result[0].cart_quantity);

							json_responses = {"statusCode" : 200 , "results" : result};
							res.send(json_responses);
						}
						else {
							console.log("invalid cart db");
							json_responses = {"statusCode" : 401};
							res.send(json_responses);
						}
					}
				},getUser);
					 
				}
			}
		}, query); 		
		
							
	}else{		
		// res.send({success : 401});
	}
}

exports.display_cart = function(req,res) {

	var json_responses;
	// check user already exists
	// req.session.item_id = req.param("item_id");
	var getUser="select * from item,cart,user where cart.item_id=item.item_id and item.seller_id=user.user_id and cart.buyer_id='"+req.session.user_id+"'";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("displaying cart");
				var total = 0;
				for(i=0; i<results.length; i++) {
					
					console.log(results[i].price);
					console.log(results[i].cart_quantity);
					total = total + parseFloat(results[i].price)*parseFloat(results[i].cart_quantity);
				}
				console.log(total);
				req.session.total = total;
				console.log(results);
				
				json_responses = {"statusCode" : 200 , "results" : results, "total" : total};
				res.send(json_responses);
			}
			else {
				console.log("can not display cart");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
}

exports.updateQuantity = function(req,res) {

	var json_responses;
	// check user already exists
	// req.session.item_id = req.param("item_id");
	var getUser="update cart SET cart.cart_quantity ='"+ req.param("quantity") +"' where cart.item_id = '"+req.session.item_id+"'";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length == null){
				console.log("quantity updated");				
			}
			else {
				console.log("can not update");
			}
		}
	},getUser);


	var getUser="select * from item,cart,user where cart.item_id=item.item_id and item.seller_id=user.user_id and cart.buyer_id='"+req.session.user_id+"'";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("displaying cart");
				var total = 0;
				for(i=0; i<results.length; i++) {
					
					console.log(results[i].price);
					console.log(results[i].cart_quantity);
					total = total + parseFloat(results[i].price)*parseFloat(results[i].cart_quantity);
				}
				console.log(total);
				req.session.total = total;
				console.log(results);
				
				json_responses = {"statusCode" : 200 , "results" : results, "total" : total};
				res.send(json_responses);
			}
			else {
				console.log("can not display cart");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
}

exports.profilec = function(req,res) {
 	var username = req.params.username;
 	var json_responses;
 	var getUser="select * from user where email = '"+username+"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("details collected");
				//req.session.fname = fname;
				json_responses = {"statusCode" : 200 , "results" : results};
				console.log(results[0].email);
				// res.send(json_responses);
				res.render('profile.ejs', { 'userc' : results[0].email,'passc' : results[0].password,'fnamec' : results[0].fname,'lnamec' : results[0].lname});
			}
			else {
				console.log("failed to get details");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);}

exports.auction = function(req,res){

	var json_responses;
	var auction_item_id = req.param("auction_item_id");
	console.log("auction_item_id" + auction_item_id);

	

	if(req.param("item_bid")) {
	var getUser="insert into bidding (item_id, seller_id, buyer_id, buyer_bid, current_bid) values ('"+auction_item_id+"', (select seller_id from item where item_id='"+auction_item_id+"'), '"+req.session.user_id+"', '"+req.param("item_bid")+"', (select max(buyer_bid) from (select * from bidding)as x where item_id='"+auction_item_id+"'))";
	//"insert into users (username, password) values ('"+req.param("username")+"', '"+req.param("password")+"')";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length == null){
				console.log("valid listing");

				json_responses = {"statusCode" : 200 , "results" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
	}
	else {
		var getUser="select * from item,user where item.seller_id=user.user_id and item_id='"+req.param("auction_item_id")+"'";
	//"insert into users (username, password) values ('"+req.param("username")+"', '"+req.param("password")+"')";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,result){
		if(err){
			throw err;
		}
		else
		{
			if(result.length > 0){
				console.log("valid listing");
				console.log(result);
				json_responses = {"statusCode" : 2000 , "results" : result};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 4010};
				res.send(json_responses);
			}
		}
	},getUser);

	}
};




exports.profilee = function(req,res){

	var json_responses;
	// var auction_item_id = req.param("auction_item_id");
	// console.log("auction_item_id" + auction_item_id);

	// var getUser="select * from item where item.seller_id = '"+req.session.user_id+"'";
	var item = req.param("itemType");
	if(item == "bought") {
	var getUser = "select * from item,transaction,sell_transaction where sell_transaction.item_id = item.item_id and transaction.buy_id = '"+req.session.user_id+"' and transaction.trans_id = sell_transaction.trans_id";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,boughtItems){
		if(err){
			throw err;
		}
		else
		{
			if(boughtItems.length > 0){
				console.log("buyer info");
				console.log(boughtItems);
				
				json_responses = {"statusCode" : 200 , "boughtItems" : boughtItems};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getUser);
	}
	else if(item == "sold"){
	var getSoledItems = "select * from item where item.seller_id = '"+req.session.user_id+"'";
	console.log("Query is: " +getSoledItems);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0){
				console.log("seller info");
				console.log(results);
				
				json_responses = {"statusCode" : 200 , "soldItems" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},getSoledItems);
	}
};

exports.pay = function(req,res){

	var json_responses;

	var transaction="insert into transaction (price, date, buy_id) values ('"+req.session.total+"', current_timestamp, '"+req.session.user_id+"')";
	console.log("Query is: " +transaction);
	mysql.fetchData(function(err,result){
		if(err){
			throw err;
		}
		else
		{
			if(result.length == null){
				console.log("buyer info");
				console.log(result);
				var total = req.session.total;

				var query = "select user.user_id,item.item_id,cart_quantity from user,item,cart where item.seller_id = user.user_id and item.item_id = cart.item_id and cart.buyer_id = '"+req.session.user_id+"'";
				console.log("Query is: " + query);

				mysql.fetchData(function(err,answers){
					if(err){
						throw err;
					}
					else
					{
						if(answers.length > 0 ){
							for(x in answers){

							console.log(answers[x].user_id);
							 var sell="insert into sell_transaction (trans_id, sell_id,item_id,trans_quantity) values ((select trans_id from transaction where buy_id = '"+req.session.user_id+"' and date = (select max(date) from transaction)), '"+answers[x].user_id+"','"+answers[x].item_id+"','"+answers[x].cart_quantity+"')";

								console.log("sell Query is: " + sell);

								mysql.fetchData(function(err,answer){
									if(err){
										throw err;
									}
									else
									{

										if(answer.length == null){
											console.log("insertion done");
											
										}
										else {
											console.log("Invalid listing");
											
										}
									}
								},sell);

								var update_quantity="update item set quantity = quantity - '"+answers[x].cart_quantity+"' where item.item_id = '"+answers[x].item_id+"' and item.seller_id = '"+answers[x].user_id+"' ";

								console.log("sell Query is: " + update_quantity);

								mysql.fetchData(function(err,answer){
									if(err){
										throw err;
									}
									else
									{

										if(answer.length == null){
											console.log("insertion done");
											
											var cart_quantity="delete from cart where cart.buyer_id = '"+req.session.user_id+"'";

											console.log("Query is: " + cart_quantity);

											mysql.fetchData(function(err,answer2){
												if(err){
													throw err;
												}
												else
												{

													if(answer2.length == null){
														console.log("insertion done");
														console.log(answer2);
														
													}
													else {
														console.log("Invalid listing");
														
													}
												}
											},cart_quantity);

										}
										else {
											console.log("Invalid listing");
											
										}
									}
								},update_quantity);
								

							}

						}
						else {
							console.log("Invalid listing");
							
						}
					}
				},query);

				//
				// }
				json_responses = {"statusCode" : 200 , "results" : result};
				res.send(json_responses);
			}
			else {
				console.log("Invalid listing");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}
	},transaction);
	// console.log("pay");
	
};

exports.validate = function(req,res){

	var enumber =  req.param("enumber");
	
	var emonth =  req.param("emonth");
	var eyear =  req.param("eyear");
	var ecvv =  req.param("ecvv");

	console.log("number entered " + enumber);
	
	console.log("expiry month " + emonth);
	console.log("expiry year " + eyear);
	console.log("cvv number " + ecvv);

	var len1=enumber.length;
	var len2=ecvv.length;
	
	var today=new Date();
	var month=(today.getMonth()+1).toString();
	var year=(today.getFullYear()).toString();

	var str1=eyear+emonth;
	var str2=year+month;

	console.log(str1);
	console.log(str2);

	console.log("month" + month);
	console.log("year" + year);


	if(len1==16 && isNaN(enumber)==false){
		if(len2==3 && isNaN(enumber)==false){
			if(str1>=str2){
				json_responses = {"statusCode" : 200 , "boughtItems" : 'credit card is valid'};
				res.send(json_responses);
			}
			json_responses = {"statusCode" : 401 , "boughtItems" : 'please enter valid expiration date'};
			res.send(json_responses);
		}
		else{
			json_responses = {"statusCode" : 401 , "boughtItems" : 'please enter valid cvv number'};
			res.send(json_responses);
		}
	}
	else{
		json_responses = {"statusCode" : 401 , "boughtItems" : 'please enter valid card number'};
			res.send(json_responses);
	}

}

exports.auction_item2 = function(req,res){
	json_responses = {"statusCode" : 200};
	res.send(json_responses);
}

exports.item2 = function(req,res){
	json_responses = {"statusCode" : 200};
	res.send(json_responses);
}