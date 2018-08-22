myApp.controller('CurrentNeedsController', function (UserService) {
    console.log('CurrentNeedsController created');

    var vm = this;


    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.currentUserNeeds = UserService.userNeeds


});
