var ejs= require('ejs');
var mysql = require('./mysql');
var pay = require('./register');

exports.processTransaction =  function(){

	var json_responses;
	// check user already exists
	var getUser="select ad_expire,item_id from item where selling_type = 'make bid'";
	//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
	console.log("Query is: " +getUser);
	mysql.fetchData(function(err,logged){
		if(err){
			throw err;
		}
		else
		{
			if(logged.length > 0){
							console.log("log updated");
							console.log(logged[0].ad_expire);
								
							var getTime="select sysdate() as ad_ex from dual";
							//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
							console.log("Query is: " +getTime);
							mysql.fetchData(function(err,time){
								if(err){
									throw err;
								}
								else
								{
									if(time.length > 0){
													console.log("log updated");
													console.log(time[0].ad_ex);
														
													for(x in logged){

														if(logged[x].ad_expire <= time[0].ad_ex) {
															console.log("bid expired");

															
															var getBid="select max(buyer_bid) as fuck from bidding,item where item.item_id = bidding.item_id and item.item_id = '"+logged[x].item_id+"'";
															//"select * from users where username='"+req.param("username")+"' and password='" + req.param("password") +"'";
															console.log("Query is: " +getBid);
															mysql.fetchData(function(err,bid){
																if(err){
																	throw err;
																}
																else
																{
																	if(bid.length > 0){
																					console.log("max bid: "+bid[0].fuck);
																					// pay.pay();
																					var sell="select * from bidding where bidding.buyer_bid = '"+bid[0].fuck+"'";

																					console.log("sell Query is: " + sell);

																					mysql.fetchData(function(err,answer){
																						if(err){
																							throw err;
																						}
																						else
																						{

																							if(answer.length > 0){
																								console.log("got info");
																								console.log(answer);


																								var update_quantity="insert into transaction (price,date,buy_id) values ('"+bid[0].fuck+"', sysdate(), '"+answer[0].buyer_id+"')";

																								console.log("sell Query is: " + update_quantity);

																								mysql.fetchData(function(err,answers){
																									if(err){
																										throw err;
																									}
																									else
																									{

																										if(answers.length == null){
																											console.log("transaction done");
																											console.log(answers);

																											var sell_tra="insert into sell_transaction (trans_id, sell_id,item_id,trans_quantity) values ((select trans_id from transaction where price='"+bid[0].fuck+"' and date = (select max(date) from transaction)), '"+answer[0].seller_id+"','"+answer[0].item_id+"', 1)";

																											console.log("sell Query is: " + sell_tra);

																											mysql.fetchData(function(err,answer2){
																												if(err){
																													throw err;
																												}
																												else
																												{

																													if(answer2.length == null){
																														console.log("insertion done");
																														console.log(answer2);
																														var del="delete from bidding where item_id = '"+answer[0].item_id+"'";

																														console.log("sell Query is: " + del);

																														mysql.fetchData(function(err,answer3){
																															if(err){
																																throw err;
																															}
																															else
																															{

																																if(answer3.length == null){
																																	console.log("insertion done");
																																	
																																}
																																else {
																																	console.log("Invalid listing");
																																	
																																}
																															}
																														},del);
																													}
																													else {
																														console.log("Invalid listing");
																														
																													}
																												}
																											},sell_tra);



																											
																										}
																										else {
																											console.log("Invalid listing");
																											
																										}
																									}
																								},update_quantity);





																								
																							}
																							else {
																								console.log("Invalid listing");
																								
																							}
																						}
																					},sell);





																					
																				}
																				else {
																					console.log("log can not update");
																	}
																}
															},getBid);
															
															//bid finished

														}
														else {
															console.log("true");
														}

													}

												}
												else {
													console.log("log can not update");
									}
								}
							},getTime);


						}
						else {
							console.log("log can not update");
			}
		}
	},getUser);


	console.log("done");

}