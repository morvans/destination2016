'use strict';

var PIXI = require('pixi.js');


angular.module('quiz.main')
    .controller('MainController', MainController);

MainController.$inject = ['$log', '$timeout', '$window', 'PlayerService'];

function MainController($log, $timeout, $window, PlayerService) {

    var sound;


    var successSound, errorSound;

    var vm = this;

    vm.debug = false;

    function activate() {

        vm.avatarClass = 'col-xs-6';


        PlayerService.initialize().then(function () {
            successSound = soundManager.createSound({
                id: 'success',
                url: 'data/success.mp3',
                autoLoad: true,
                autoPlay: false
            });
            errorSound = soundManager.createSound({
                id: 'error',
                url: 'data/error.mp3',
                autoLoad: true,
                autoPlay: false
            });

        });

        if ($window.hasOwnProperty('orientation')) {
            $window.addEventListener('orientationchange', function () {
                $timeout(function () {
                    doOnOrientationChange()
                });
            });
        }
        doOnOrientationChange();


        vm.people = {

            'sarah': {
                label: 'Sarah',
                'avatar': 'data/avatars/sarah.jpg'
            },

            'simon': {
                'label': 'Simon',
                'avatar': 'data/avatars/simon.jpg'
            },

            'samuel': {
                'label': 'Samuel',
                'avatar': 'data/avatars/samuel.jpg'
            },

            'solene': {
                'label': 'Solène',
                'avatar': 'data/avatars/solene.jpg'
            }

        };

        vm.peopleList = [
            'sarah', 'simon', 'samuel', 'solene'
        ];

        vm.sounds = [
            {
                'url': 'data/sounds/samuel-aurevoiraurevoir.mp3',
                'person': 'samuel'
            },
            {
                'url': 'data/sounds/samuel-bonjour.mp3',
                'person': 'samuel'
            },
            {
                'url': 'data/sounds/simon-bonjour.mp3',
                'person': 'simon'
            },
            {
                'url': 'data/sounds/solene-aurevoir.mp3',
                'person': 'solene'
            }
        ];

        vm.currentSound = 0;


    }

    function doOnOrientationChange() {
        switch ($window.orientation) {
            case -90:
            case 90:
                vm.orientation = 'landscape';
                vm.avatarClass = 'col-xs-3';
                break;
            default:
                vm.orientation = 'portrait';
                vm.avatarClass = 'col-xs-6';
                break;
        }
    }

    vm.selectPerson = function selectPerson(person) {

        $log.debug('select ' + person);

        vm.selectedPerson = person;

        if (vm.sounds[vm.currentSound].person === person) {

            vm.sounds[vm.currentSound].answer = 'success';

            playSuccess();

            vm.next();


        } else {

            vm.sounds[vm.currentSound].answer = 'error';

            playError();

        }

        $timeout(function(){
            vm.selectedPerson = null;
        }, 1000);

    };

    vm.previous = function previous() {
        vm.stop();
        vm.currentSound = (((vm.currentSound - 1) % vm.sounds.length) + vm.sounds.length) % vm.sounds.length;


    };

    vm.next = function next() {
        vm.stop();
        vm.currentSound = (vm.currentSound + 1) % vm.sounds.length;

    };

    vm.goto = function goto(index){
        vm.stop();
        vm.currentSound = (index) % vm.sounds.length;
        vm.play();
    };

    vm.play = function play() {

        sound = soundManager.createSound({
            url: vm.sounds[vm.currentSound].url
        });

        sound.play();

    };

    vm.stop = function stop() {

        if (sound) {
            sound.stop();
        }
    };


    function playError() {


        errorSound.play();

    }

    function playSuccess() {

        successSound.play();

    }





//    activate();

}
