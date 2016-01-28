'use strict';


angular.module('jackpot.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope'];

function MainController($rootScope) {


  var vm = this;

  activate();

  function activate(){

    vm.attemptStatus = null;

    $rootScope.$on('attemptFailed', function(){
      vm.attemptStatus = 'failure';
    });
    $rootScope.$on('attemptSucceeded', function(){
      vm.attemptStatus = 'success';
    });

  }

  vm.random = function random(){
    vm.attemptStatus = null;
    $rootScope.$broadcast('randomClicked');
  };


}
