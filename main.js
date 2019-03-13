var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
	
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	
	var uri = "mongodb+srv://kislay:kislay@5@cluster0-rxnqh.mongodb.net/test?retryWrites=true";
	var client = new MongoClient(uri, { useNewUrlParser: true });
	client.connect(err => {
		var collection = client.db("music").collection("songs");
		var cursor = collection.find();
		
		var data = cursor.toArray();
		
		data
        .then((songs) => {
			res.render('home', {
				songs: songs
			});
        })
        .catch((err) => {
            console.log(err);
        })
	  client.close();
	});
	
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('App running on http://localhost:' + port);
});
