myApp.service('UserService', function ($http, $location, $route) {
  console.log('UserService Loaded');

  var self = this;

  self.userObject = { details: {} };

  self.userInformationObject = { list: [] };

  self.userLocation = { coordinates: {} };

  self.userNeeds = { needs: {} };

  self.allUserInformationInDb = { list: [] };



  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.details = response.data;
        console.log('UserService -- getuser -- User Data: ', self.userObject);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });

  }; // end of get user 


  // get user information 
  self.getUserInformation = function () {
    $http.get('/user/userinformation').then(function (response) {
      console.log('response from get user information', response)
      self.userInformationObject.list = response.data
    })
  }; // end of get user 

  self.getUserLocation = function () {
    $http.get('/user/userlocation').then(function (response) {
      self.userLocation.coordinates = response.data;
      console.log('UserService -- getuserlocation -- User Location Data: ', self.userLocation.coordinates)
    })
  }; // end of get user 

  self.userProfileInformation = function (information) {
    console.log('sending information to db', information)
    $http.post('/register/userprofileinformation', information).then(function (response) {
      console.log(' post response from register/userneedinformation', response)
      $location.path('/need')
    });
  } // end of user need information 

  // post new user needs into userneeds table 
  self.userNeeds = function (userneeds) {
    console.log('sending these user needs to db ', userneeds)
    $http.post('/register/userneeds', userneeds).then(function (response) {
      console.log('post response from register/userneeds', response)
      $location.path('/thankyou')
    });
  };

  self.getUserNeeds = function () {
    $http.get('/user/userneeds').then(function (response) {
      self.userNeeds.needs = response.data
      console.log('needs data from /user/userneeds ', response.data)
    });
  };

  self.allUserInformation = function () {
    $http.get('/user/allrequestinformation').then(function (response) {
      self.allUserInformationInDb.list = response.data
      console.log('all user data in service ', self.allUserInformationInDb.list)
    });
  };


  self.deleteUserNeeds = function (userid) {
    console.log('user id getting deleted ', userid)
    $http.delete('user/deleteuserneeds/' + userid).then(function (response) {
      console.log('post response from delete user needs route', response);
      self.getUserInformation();
      $location.path("/user");
    })
  }

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });

  }; // end of logout 

});
