(function() {
    "use strict";
    angular.module('App', ['dropdown-multiselect']).controller('MainCtrl', MainCtrl);

    function MainCtrl() {
        var vm = this;
        vm.options = [{
                'Id': 1,
                'Name': 'Batman',
                'Costume': 'Black'
            }, {
                'Id': 2,
                'Name': 'Superman',
                'Costume': 'Red & Blue'
            }, {
                'Id': 3,
                'Name': 'Hulk',
                'Costume': 'Green'
            }];

        vm.config = {
            options: vm.options,
            trackBy: 'Id',
            displayBy: ['Name', 'Costume'],
            divider: ':',
            icon: 'glyphicon glyphicon-heart',
            displayBadge: true,
            filter: true,
            height:'200px'
        };
    }
}).call(this);
