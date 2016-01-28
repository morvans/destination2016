'use strict';

angular.module('jackpot.main')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$scope'];

function MainController($rootScope, $scope) {

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
          return '...';
      }
    }
  })

}
