var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
var collection = db.collection('restaurants');	

var action = prompt("What would you like to do? (view, add, edit or delete)");

if (action === "view"){
	var viewChoice = prompt("Which restaurant would you like to view?: ");
	collection.find({"name": viewChoice }).forEach( function(doc) {
		console.log(doc);
	});	
} else if (action === "add"){
	var foodName = prompt("New restaurant name?: ");
	var foodStreet = prompt("Street address?: ");
	var foodZip = prompt("Zip code?: ");
	var yelpUrl = prompt("Yelp page?: ");
	
	collection.insert([
	  {
	    "name": foodName,
	    "address": {
	      "street" : foodStreet,
	      "zipcode" : foodZip
	    },
	    "yelp": yelpUrl }
	  ])
} else if (action ==="edit") {
	var editFood = prompt("Which restaurant would you like to edit?");
	var newName = prompt("What is the new name?: ");
	var newAddress = prompt("New street address?: ");
	var newZip = prompt("New zip code?: ");
	var newYelp = prompt("New Yelp URL?: ");
	collection.update([
		{ "name": editFood},
		{ "name": newName,
	    "address": {
	      "street" : newAddress,
	      "zipcode" : newZip
	    },
	    "yelp": newYelp }
	  ])
} else if (action ==="delete") {
	var deleteFood = prompt("Which restaurant would you like to delete?");
	collection.remove({"name": deleteFood});
}
});
