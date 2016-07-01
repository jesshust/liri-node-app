var keys = require('./keys.js'); //grab the data from keys.js
var fs = require('fs'); //fs package to read and write 

//takes in one of the three arguments //tweets, spotify, movie, do what it says
var action = process.argv[2]; 
var results; //output when functions are run

//switch-case will determine which function gets run
switch(action){
	case 'my-tweets':
		twitter();  
		break;

	case 'spotify-this-song': 
		spotify(); 
		break; 

	case 'movie-this':
		movie();   
		break; 

	case 'do-what-it-says': 
		textFile(); 
		break;  
}


//if the twitter function is called
	function twitter(){
		var Twitter = require('twitter'); 
		var user = new Twitter(keys.twitterKeys); 
		var parameters = {screen_name: 'jkbradford'}; 
		
		user.get('statuses/user_timeline', parameters, function (err, tweets, response) {

					for (var i = 0; i < 20; i++) {
						console.log(tweets[i].text); 
						console.log(tweets[i].created_at); 
						console.log(""); 
						console.log("My last 20 Tweets:"); 

					} 

		}); 
	}	

//if the spotify function is called
	function spotify() {
		var spotify = require('spotify'); 
		var song = results; 

			if(song == null){
				song = process.argv[3]; 

			for(var i = 4; i < process.argv.length; i++){
				song = song + " " + process.argv[i]; 
			}
			}

			if(song == null) {
				console.log("You forgot to request a song! Hope you enjoy the default song!"); 
				song = "What's My Age Again"; 
			}

			spotify.search({ type: 'track', query:song}, function(err, data){
				if(err){
					console.log("Error! Error! " + err); 
					return; 
				}

				console.log(""); 
				console.log("Song Name: " + data.tracks.items[0].name); 
				console.log("Artist: " + data.tracks.items[0].artists[0].name);
				console.log("Album: " + data.tracks.items[0].album.name);
				console.log("Preview Link: " + data.tracks.items[0].preview_url);
			}); 

	}

//if the movie function is called
	function movie() {
		var request = require('request'); 
		var movie = results; 

			if(movie == null){
				movie = process.argv[3]; 

			for(var i = 4; i < process.argv.length; i++){
				movie = movie + " " + process.argv[i]; 
			}
			}	
			
			if(movie == null) {
				console.log("You forgot to request a movie! Enjoy Mr. Nobody.")
				movie = "Mr. Nobody"; 
			}
			
			var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true"

			request(queryURL, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log("");
					console.log("Title: " + JSON.parse(body)["Title"]);
					console.log("Year: " + JSON.parse(body)["Year"]);
					console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
					console.log("Country: " + JSON.parse(body)["Country"]);
					console.log("Language: " + JSON.parse(body)["Language"]);
					console.log("Plot: " + JSON.parse(body)["Plot"]);
					console.log("Actors: " + JSON.parse(body)["Actors"]);
					console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
					console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
				} else {
					console.log(error); 
				}
			}); 
		}
//if the textFile function is called 
	function textFile (){
		fs.readFile('random.txt', 'utf8', function(err, data){ //read random.txt file
			var dataArr = data.split(",");

			action = dataArr[0]; 

				if (dataArr.length > 1) {
					results = dataArr[1]; 
				}
			switch(action){
				case 'my-tweets':
					twitter();  
					break;

				case 'spotify-this-song': 
					spotify(); 
					break; 

				case 'movie-this':
					movie();   
					break; 

			}

		});

	} 
	