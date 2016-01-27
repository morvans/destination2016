'use strict';


angular.module('jackpot.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope'];

function MainController($rootScope) {


  var vm = this;

  vm.random = function random(){

    $rootScope.$broadcast('randomClicked');

  };


}
