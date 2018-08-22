var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function (req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
// Handles POST request with new user data
router.post('/', function (req, res, next) {
  console.log('entire request inside register route' , req.body)
  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
  };
  console.log('new user:', saveUser);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [saveUser.username, saveUser.password],
      function (err, result) {
        done();

        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });

});

// adds user profile information to database
router.post('/userprofileinformation', function (req, res, next) {
  console.log('id coming in from user.service to get inserted into db', req.body.user_id)




  var saveUserNeedInfo = {
    user_id: req.body.user_id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address.formatted_address,
    longitude: req.body.address.longitude,
    latitude: req.body.address.latitude,
    householdsize: req.body.householdsize,
    phonenumber: req.body.phonenumber
  };

  parseInt(saveUserNeedInfo.longitude);
  parseInt(saveUserNeedInfo.latitude);

  console.log('user profile information in server' , saveUserNeedInfo);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO userprofileinformation (user_id, firstname, lastname, address, longitude, latitude, householdsize, phonenumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [saveUserNeedInfo.user_id, saveUserNeedInfo.firstname, saveUserNeedInfo.lastname, saveUserNeedInfo.address, saveUserNeedInfo.longitude, saveUserNeedInfo.latitude, saveUserNeedInfo.householdsize, saveUserNeedInfo.phonenumber],
      function (err, result) {
        done();

        if (err) {
          console.log("Error inserting user profile information: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });



});

router.post('/userneeds', function (req, res, next) {

  var user_id = req.body.user_id

  var saveUserNeeds = {
    Need: req.body.Need,
    Groceries: req.body.Groceries,
    Clothing: req.body.Clothing,
  };
  console.log('user needs :', saveUserNeeds);
  /*
  { need: 'groceries', groceries: [ 'beef', 'chicken' ] }
  */

  // loop thru saveUserNeeds.grocieries
  // concatentate into a string
  // save to db
  // output: beef, chicken
  // var emptyUserNeeds = "";
  // for(var i = 0; i < saveUserNeeds.groceries.length ; i++) {
  //   emptyUserNeeds += saveUserNeeds.groceries[i];
  //   if(i < saveUserNeeds.groceries.length - 1) {
  //     emptyUserNeeds += ", ";
  //   } ;
  // }


  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO userneeds (user_id, "Need", "Groceries", "Clothing") VALUES ($1, $2, $3, $4)',
      [user_id, saveUserNeeds.Need, saveUserNeeds.Groceries, saveUserNeeds.Clothing],
      function (err, result) {
        done();

        if (err) {
          console.log("Error inserting userneeds: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }

      })

  });

}); // end of router post 




module.exports = router;
