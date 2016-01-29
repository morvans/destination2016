'use strict';

var angular = require('angular');

angular.module('jackpot.main')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$scope', '$window', '$timeout'];

function MainController($rootScope, $scope, $window, $timeout) {

  var vm = this;

  activate();

  function activate() {

    vm.showGreeting = false;
    vm.attemptStatus = 'pending';

    $rootScope.$on('attemptFailed', function () {
      vm.attemptStatus = 'failure';
      $scope.$digest();
    });
    $rootScope.$on('attemptSucceeded', function () {
      vm.showGreeting = true;
      vm.attemptStatus = 'success';
      $scope.$digest();
    });


    $window.addEventListener('keydown',function (event) {
      if(event.keyCode == 32){
        $timeout(function(){
          vm.random();
        });
      }
    },false);


  }

  vm.random = function random() {
    vm.attemptStatus = 'pending';
    $rootScope.$broadcast('randomClicked');
  };

  Object.defineProperty(vm, 'btnLabel', {
    'get': function () {
      switch (vm.attemptStatus) {
        case 'success':
          return 'Bravo ! Encore une fois ?';
          break;
        case 'failure':
          return 'Essayez encore !';
        default:
          return '';
      }
    }
  })

}
