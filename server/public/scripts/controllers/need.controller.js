myApp.controller('NeedController', function ($http, $location, UserService) {
    console.log('need controller created');
    var vm = this;

    // UserService.getUserInformation();



    vm.userNeed = {
        Groceries: null,
        Clothing: null,
        Household_Products: null,
        Over_The_Counter_Medicine: null
        
    };

    vm.needs = {
        list: ['None','Groceries', 'Clothing', 'Household Products', 'Over-The-Counter Medicine'],
    };

    vm.addingNeeds = function () {
        vm.userNeed.user_id = UserService.userObject.details.user_id
        console.log('sending these needs', vm.userNeed);
        UserService.userNeeds(vm.userNeed)
    };

});