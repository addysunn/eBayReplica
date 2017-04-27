var ebay = angular.module('ebay',[]);

ebay.controller('ebay', function($scope,$http,$window){


	
	$scope.submit = function() {


		$http({
			method : "POST",
			url : '/login',
			params : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			
			if (data.statusCode == 200) {
				alert(data.results);
				window.location.assign("/homepage"); 
			
			}
			else if (data.statusCode == 401)
			{			
				alert("failed logged in");
				$scope.username = "Email or password inccorect";
			}
				
			}).error(function(error) {
				
			});
		};

		$scope.signup = function() {

		 alert($scope.password);
		$http({
			method : "POST",
			url : '/signup',
			params : {
				"email" : $scope.email,
				"reemail" : $scope.reemail,
				"password" : $scope.password,
				"fname" : $scope.fname,
				"lname" : $scope.lname
			}
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				// alert("callback");
				window.location.assign("/homepage"); 		
				
			}
			else if (data.statusCode == 401)
			{			
				$window.alert("failed sign up");
				$scope.error = "Please fix the errors listed below:";
				// $scope.error_email = "Please enter a valid email address.";
				$scope.error_reemail = "Email addresses don’t match.";
				$scope.error_pass = "Please enter password.";
				$scope.error_fname = "Please enter your first name.";
				$scope.error_lname = "Please enter your last name.";
			}
			else if (data.statusCode == 2000)
			{			
				$window.alert("This email is already registered");
			
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		$scope.listing = function() {

		alert("now in controller");
		alert($scope.sellingType);
		$http({
			method : "POST",
			url : '/listing',
			params : {
				"item_name" : $scope.item_name,
				"item_desc" : $scope.item_desc,
				"price" : $scope.price,
				"quantity" : $scope.quantity,
				"selling type" : $scope.sellingType
				// "auction" : $scope.auction	
			}
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got statusCode");	
				window.location.assign("/sell_review"); 
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";
			}
			else if (data.statusCode == 401)
			{			
				alert("failed logged in");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		$scope.listing_db = function() {

		alert("in controller");

		$http({
			method : "POST",
			url : '/listing_db',
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got listing");	
				window.location.assign("/homepage"); 
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		// $scope.item = function() {

		// alert("in controller");
		// alert(item);


		// alert(password);

		// $http({
		// 	method : "POST",
		// 	url : '/login',
		// 	params : {
		// 		"email" : $scope.email,
		// 		"password" : $scope.password
		// 	}
		// }).success(function(data) {
		// 	//checking the response data for statusCode
		// 	//$scope.random = "skvjsd";
		// 	if (data.statusCode == 200) {
				
		// 		window.location.assign("/homepage"); 
		// 		// $window.alert("successfully logged in");	
		// 		// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
		// 		//$scope.random = "Enter different location";
		// 	}
		// 	else if (data.statusCode == 401)
		// 	{			
		// 		$window.alert("failed logged in");
		// 	}
		// 		//Making a get call to the '/redirectToHomepage' API
		// 		//window.location.assign("/homepage"); 
		// 	}).error(function(error) {
				
		// 	});
		// };

});

ebay.controller('ebay_home', function($scope,$http,$window){


		$http({
			method : "POST",
			url : '/home',
			// params : {
			// 	"email" : $scope.email,
			// 	"password" : $scope.password
			// }
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				// alert(data.results[0].name);
				$scope.records = data.results;



				// $scope.records = [
    //    			{
    //         		"Name" : "Alfreds Futterkiste",
    //         		"Country" : "Germany"
    //     		},{
    //         		"Name" : "Berglunds snabbköp",
    //         		"Country" : "Sweden"
    //     		},{
    //         		"Name" : "Centro comercial Moctezuma",
    //         		"Country" : "Mexico"
    //     		},{
    //         		"Name" : "Ernst Handel",
    //         		"Country" : "Austria"
    //     		}
    // 			]
				// window.location.assign("/homepage"); 
				// $window.alert("successfully logged in");	
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";




			}
			else if (data.statusCode == 401)
			{			
				alert("failed logged in");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});

			$scope.type = function(type,id) {
			alert(type);
			alert(id);
			if(type == 'shop now'){
			$http({
			method : "GET",
			url : '/item2',
			 params : {
				"type" : type,
				"item" : id
			}
			}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("item");
				// alert(data.results[0].user_id);
				// alert(data.results[0].item_id);
				window.location.assign("/item?id="+id); 
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";
			}
			else if (data.statusCode == 401)
			{			
				alert("can not logout");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
			} else {
				alert("auction");
				$http({
				method : "GET",
				url : '/auction_item2',
				 params : {
				"type" : type,
				"item" : id
			}
			
			}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("logged out");
				// alert(data.results[0].user_id);
				// alert(data.results[0].item_id);
				window.location.assign("/auction_item?id="+id); 
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";
			}
			else if (data.statusCode == 401)
			{			
				alert("can not logout");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
			}
			// $scope.link = type+"?id="+id;
			};
		

});




ebay.controller('ebay_item', ['$scope', '$http', '$window', function($scope,$http,$window){

		// $scope.cart_quantity = $window.quantity;
		$scope.checkq = function() {

			var a = $scope.item_quantity;
			var b = $scope.cart_quantity;

			// alert(a);
			// alert(b);
			if(b<a){
				$scope.cart_quantity = b;
			}
			else{
				alert("Enter valid quantity");
			}
		};

		$scope.logout = function() {
		alert("logout");
		// alert($scope.cart_quantity);
		$http({
			method : "POST",
			url : '/logout',
					
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("logged out");
				
			}
			else if (data.statusCode == 401)
			{			
				alert("can not logout");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};



		$scope.cart_init = function() {
		alert("in cart");
		// alert($scope.cart_quantity);
		$http({
			method : "POST",
			url : '/display_cart',
			// params : {
			// 	"cart_quantity" : $scope.cart_quantity	
			// }
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got cart");
				$scope.cart	= data.results;
				$scope.total = data.total;
				
			}
			else if (data.statusCode == 401)
			{			
				alert("can not get cart");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};
		// alert("controller");
		$scope.id = $window.id;
  
  		$scope.getMember = function(id) {
    	// alert(id);

 		$http({
			method : "POST",
			url : '/item',
			params : {
				"item_id" : $scope.id,		
			}
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got listing");	
				alert(data.results[0].item_id);
				$scope.item_id = data.results[0].item_id;
				$scope.item_name = data.results[0].name;
				$scope.item_desc = data.results[0].description;
				$scope.item_price = data.results[0].price;
				$scope.item_quantity = data.results[0].quantity;
				$scope.fname = data.results[0].fname;
				$scope.lname = data.results[0].lname;
				$scope.city = data.results[0].zip;
			
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		$scope.item = function() {
		
		if ($scope.cart_quantity) {
		$http({
			method : "POST",
			url : '/cart',
			params : {
				"cart_quantity" : $scope.cart_quantity,		
			}
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got listing");	
				// alert(data.results[0].user_id);
				// alert(data.results[0].item_id);
				window.location.assign("/cart"); 
				// $scope.dataset.push({'source':data.source, 'destination':data.destination});	
				//$scope.random = "Enter different location";
			}
			else if (data.statusCode == 401)
			{			
				alert("In order to purchase an item you need to sign in first");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		} else {
			alert("Enter quantity more than 1");
		}
		};

		// $scope.quantity = $window.quantity
		$scope.updateQuantity = function() {
			// $scope.quantity;
			alert($scope.quantity);

		$http({
			method : "POST",
			url : '/updateQuantity',
			params : {
				"quantity" : $scope.quantity	
			}
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				// alert("got listing");	
				alert("in checkout");
				$scope.cart	= data.results;
				$scope.total = data.total;
			
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		

}]);


ebay.controller('ebay_auction_item', ['$scope', '$http', '$window', function($scope,$http,$window){

		$scope.id = $window.id;
		$scope.auction_item = function(id) {
		alert("in auction controller");
		alert($scope.bid);
		alert($scope.id);
		$http({
			method : "POST",
			url : '/auction',
			params : {
				"item_bid" : $scope.bid,
				"auction_item_id" : $scope.id		
			}
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				alert("got auction");	
			
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
			else if (data.statusCode == 2000)
			{			

				alert("auction item displayed");
				$scope.item_id = data.results[0].item_id;
				$scope.item_name = data.results[0].name;
				$scope.item_desc = data.results[0].description;
				$scope.item_price = data.results[0].price;
				$scope.item_quantity = data.results[0].quantity;
				$scope.fname = data.results[0].fname;
				$scope.lname = data.results[0].lname;
				$scope.city = data.results[0].zip;
			}
			else if (data.statusCode == 401)
			{			
				alert("auction item not displayed");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};
}]);

ebay.controller('ebay_checkout', ['$scope', '$http', '$window', function($scope,$http,$window){


		$scope.sold = function() {
			alert("in prfile");
			$scope.err2 = false;
			$http({
			method : "POST",
			url : '/profile',
			params : {
				"itemType" : "sold",		
			}
			
		}).success(function(data) {

			if (data.statusCode == 200) {
				
				alert("got items");	
				// alert(data.soldItems);
				$scope.sold = data.soldItems;
				
			}
			else if (data.statusCode == 401)
			{
				$scope.err2 = true;			
				alert("no items to show");
			} 
			}).error(function(error) {
				
			});
		};

		$scope.bought = function() {
			alert("in prfile");
			$scope.err1 = false;	
			$http({
			method : "POST",
			url : '/profile',
			params : {
				"itemType" : "bought",		
			}
			
		}).success(function(data) {


		
			if (data.statusCode == 200) {
				
				alert("got items");	
				
				$scope.bought = data.boughtItems;
		
			}
			else if (data.statusCode == 401)
			{	
				$scope.err1 = true;		
				$scope.err1 = "no items to shaow";
			}
			
			}).error(function(error) {
				
			});
		};

		$scope.checkout = function() {
			alert("checkout started");
			// alert(quantity);

		$http({
			method : "POST",
			url : '/display_cart',
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
				// alert("got listing");	
				alert("in checkout");
				$scope.checkout	= data.results;
				$scope.total = data.total;
				
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		$scope.validate = function() {
			alert("checkout started");
			alert($scope.emonth);

		$http({
			method : "POST",
			url : '/validate_card',
			params : {
				"enumber" : $scope.enumber,
				"emonth" : $scope.emonth,
				"eyear" : $scope.eyear,
				"ecvv" : $scope.ecvv		
			}
			
		}).success(function(data) {
			//checking the response data for statusCode
			//$scope.random = "skvjsd";
			if (data.statusCode == 200) {
				
					
				alert("credit cart is valid");
			
			}
			else if (data.statusCode == 401)
			{			
				alert("Enter valid card details");
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});
		};

		$scope.pay = function() {
			// alert("checkout started");
		$http({
			method : "POST",
			url : '/pay',
			
		}).success(function(data) {
			
			if (data.statusCode == 200) {
				
				// alert("got listing");	
				alert("payment successfull");
				// $scope.checkout = data.results;
				
				window.location.assign("/homepage"); 
				
			}
			else if (data.statusCode == 401)
			{			
				alert("failed listing");
			}
				
			}).error(function(error) {
				
			});
		};
}]);