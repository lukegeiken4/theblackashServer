var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
	res.send(JSON.stringify({"result": "Welcome to The Black Ash server"}));
});

app.post('/', function (req, res) {
	console.log(req.body);
	var mes = req.body.message;

	// Twilio Credentials
	var accountSid = 'AC90db3907fb02910f021c0f34de5cbde2';
	var authToken = '3f35cb4fd71d0dcd2ca308bb68eb7dc2';

	//require the Twilio module and create a REST client
	var client = require('twilio')(accountSid, authToken);
	console.log(mes);
	client.sms.messages.create({
	    to:'+14022148577',
	    from: '+14027692710',
	    body: mes
	}, function(error, message) {
	    console.log(error);
	    console.log(message);
	    if (!error) {
	        var response = {error: false, status: "Successfully send request"};
	        res.send(response);
	    } else {
	    	var response = {error: true, status: "Error sending request"};
	         res.send(response);
	    }
	});

});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
