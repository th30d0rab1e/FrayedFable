var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /user route');
  console.log('req user in user route', req.user)
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    var userInfo = {
      username: req.user.username,
      user_id: req.user.id
    };
    console.log('user info inside user route sending back to service', userInfo)
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

router.get('/userinformation', function (req, res, next) {
  // check if logged in
  if (req.isAuthenticated()) {
    var userid = req.user.id

    var userNameInfo = {
      username: req.user.username,

    }
    console.log('req.user in userinformation ', req.user.username);
    pool.connect(function (err, client, done) {
      if (err) {
        console.log("Error connecting: ", err);
        res.sendStatus(500);
      }
      client.query("SELECT * FROM userprofileinformation WHERE user_id = $1", [userid],
        function (err, result) {
          done();
          if (err) {
            console.log("Error getting data: ", err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
    });

  };

});

router.get('/userlocation', function (req, res, next) {
  // check if logged in
  if (req.isAuthenticated()) {
    var userid = req.user.id;

    console.log('req user id', req.user)

    pool.connect(function (err, client, done) {
      if (err) {
        console.log("Error connecting: ", err);
        res.sendStatus(500);
      }
      client.query("SELECT longitude, latitude FROM userprofileinformation WHERE user_id = $1", [userid],
        function (err, result) {
          done();
          if (err) {
            console.log("Error getting data: ", err);
            res.sendStatus(500);
          } else {
            console.log('location rows getting sent to getuserlocation in user service', result.rows)
            res.send(result.rows);

          }
        });
    });

  };

});


router.get('/allrequestinformation', function (req, res, next) {
  // check if logged in
  if (req.isAuthenticated()) {
    var userid = req.user.id;

    console.log('req user', req.user)

    pool.connect(function (err, client, done) {
      if (err) {
        console.log("Error connecting: ", err);
        res.sendStatus(500);
      }
      client.query(`select userneeds.user_id, latitude, longitude, firstname, lastname, address, householdsize, phonenumber, array_agg (Groceries) 
      from userprofileinformation 
      join userneeds
      on userprofileinformation.user_id = userneeds.user_id
group by userneeds.user_id, latitude, longitude, firstname, lastname, address, householdsize, phonenumber`,
        function (err, result) {
          done();
          if (err) {
            console.log("Error getting data: ", err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);

          }
        });
    });

  };

});

router.get('/userneeds', function (req, res, next) {
  // check if logged in
  if (req.isAuthenticated()) {
    var userid = req.user.id;

    console.log('req user id', req.user)

    pool.connect(function (err, client, done) {
      if (err) {
        console.log("Error connecting: ", err);
        res.sendStatus(500);
      }
      client.query("SELECT * FROM userneeds WHERE user_id = $1", [userid],
        function (err, result) {
          done();
          if (err) {
            console.log("Error getting data: ", err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);

          }
        });
    });

  };

});

router.delete('/deleteuserneeds/:id', function (req, res) {
  console.log('id inside delete userneeds' , req.params.id)
  console.log('/deleteuserneeds route', req.body);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting to db: ", err);
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "userneeds" WHERE "user_id" = $1';
      client.query(queryText, [req.params.id], function (errorMakingQuery, result) {
        done();
        if (errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});


// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
