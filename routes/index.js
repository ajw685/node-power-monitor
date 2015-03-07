var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Helloworld page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Helloworld!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET Adds Power data to DB */
router.get('/senddata', function(req, res) {
	console.log(res.send(req.query));
	//res.send('power: ' + req.query.power);

	//Get date & time
	var datetime = new Date()

	//Set our internal DB variable
	var db = req.db;

	//Get our power usage values
	var power = req.query.power;
	
	//Set out collection
	var collection = db.get('powerdata');

	//Submit power value to db
	collection.insert({
	"kw" : power,
	"time" : datetime
	}, function (err, doc) {
		if (err) {
            	// If it failed, return error
            	res.send("There was a problem adding the information to the database.");
        	}
        	else {
		// If it worked, set the header so the address bar doesn't still say /senddata
		// res.location("powerdata");
		// And forward to success page
		//res.redirect("powerdata");
		}
 	});
});

/* GET Powerdata page. */
router.get('/powerdata', function(req, res) {
    var db = req.db;
    var collection = db.get('powerdata');
    collection.find({},{},function(e,docs){
        res.render('powerdata', {
            "powerdata" : docs
        });
    });
});

module.exports = router;
