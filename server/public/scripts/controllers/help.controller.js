myApp.controller('HelpController', function (UserService, NgMap) {
    console.log('HelpController created');

    var vm = this;


    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.allUserInformation = UserService.allUserInformationInDb




    vm.map = {};
    NgMap.getMap("map").then(function (map) {
        console.log('this is that map', map);
        vm.map = map;
    });

    vm.showDeets = function (e, userhelp) {
        console.log('user help', userhelp)
        vm.allUserInformation.userhelp = userhelp;
        vm.map.showInfoWindow('InfoWindow', this)
    }


    console.log('all user information', vm.allUserInformation)



});
