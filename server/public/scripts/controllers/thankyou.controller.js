myApp.controller('ThankyouController', function ($http, $location, UserService, NgMap, ngAlertsMngr) {
    console.log('Thankyou controller loaded');
    var vm = this;

    UserService.getUserInformation();
    UserService.getUserNeeds();

    vm.userObject = UserService.userObject;
    vm.userInformationObject = UserService.userInformationObject;
    vm.userLocation = UserService.userLocation;
    vm.userNeeds = UserService.userNeeds;

    vm.map = {};
    NgMap.getMap("map").then(function (map) {
        console.log('this is that map', map);
        vm.map = map;
    });

    vm.showDeets = function (e, user) {
        vm.userInformationObject.user = user
        console.log('user information object in show deets', vm.userInformationObject.user)
        vm.map.showInfoWindow('InfoWindow', this)
    };

    vm.deleteNeeds = function (userid) {
        console.log('user needs getting delete', userid)
        UserService.deleteUserNeeds(userid)
    };

    // vm.createAlert = function () {
    //     ngAlertsMngr.add('testing' , 'warning');
    // };

    console.log('coordinate', UserService.userLocation);
    console.log('user information', vm.userInformationObject)
    console.log('user needs', vm.userNeeds.needs)


});