myApp.controller('UserController', function (UserService, $http, NgMap, $route) {
  console.log('UserController created');
  var vm = this;

  // UserService.getuser( );
  
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userInfo = UserService.userInformationObject;

  vm.user = {};


  vm.placeChanged = function () {
    vm.place = this.getPlace();
    vm.user.address = vm.place
    console.log('here is all the data in vm.place ==>', vm.place)
    console.log('location', vm.place.geometry.location);
    // vm.map.setCenter(vm.place.geometry.location);
    vm.user.address.latitude = vm.place.geometry.location.lat();
    vm.user.address.longitude = vm.place.geometry.location.lng();
  };
  // NgMap.getMap().then(function(map) {
  //   vm.map = map;
  // });

  vm.userInformation = function () {
    vm.user.user_id  = vm.userObject.details.user_id;
    console.log('User Controller -- inside userInformation function',
      'sending to service',vm.user)
    UserService.userProfileInformation(vm.user)
  }; // end of user information function 
}); // end of controller 





