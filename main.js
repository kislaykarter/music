var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kislay:kislay@5@cluster0-rxnqh.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	
	client.connect(err => {
		const collection = client.db("music").collection("songs");
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

app.listen(3003,function(){
	console.log('App running at http://localhost:3003');
});
