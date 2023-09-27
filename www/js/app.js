// (function(){
'use strict';

var chigago=angular.module('chigago', ['ionic','base64', 'ionic.native'])

.run(function($ionicPlatform, storageService, $rootScope, $cordovaAdMobFree, charFactory, $http,utilityFctr, worlds, $state,$window, $timeout, $ionicPopup) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $ionicPlatform.onHardwareBackButton(function(event){
      event.preventDefault();
      event.stopPropagation();
    }, false);

    $ionicPlatform.registerBackButtonAction(function (event) {
          event.preventDefault();
          event.stopPropagation();
    }, 100);

    $rootScope.banner=$cordovaAdMobFree.interstitial;
    $rootScope.banner.config({
              // id: 'ca-app-pub-3940256099942544/1033173712', //this is the test ad unit
              // isTesting: true,

              id: 'ca-app-pub-9766939604775958/5095234923',
              isTesting: false
              
        });

    $rootScope.runAdverts=function(){
              try{

                  $rootScope.banner.prepare();
                  return $rootScope.banner.show();
                  
                  }catch(err){

                  return err;
            }
      }
  });

  document.addEventListener('deviceready', function(){

    $ionicPlatform.onHardwareBackButton(function(event){
      event.preventDefault();
      event.stopPropagation();
    }, false);

    $ionicPlatform.registerBackButtonAction(function (event) {
          event.preventDefault();
          event.stopPropagation();
    }, 100);

}, false);

  $rootScope.demoCtrl=function(){

    var hasExpired=true;
    var datum=new Date(2018, 8, 10);
    var today=new Date();

        today.setHours(0,0,0,0);
        datum.setHours(0,0,0,0);

    if (datum.valueOf()<=today.valueOf()){
        $state.go('app.demoScreen');        
        return  hasExpired=true;
    }else{

      return hasExpired=false;
    }
}

 var std_playerArr= [ 
  //it is important that these arrays match the sliders indices. refering to slider '1' must mean refering to element '1' here
    
    {id:'pl_1', name:'Khensani', url:'img/candidates/Khensani.png', quals: {speed:25,aerobics:25,agility:40}, locked: false},
    {id:'pl_2', name:'Linda', url:'img/candidates/Linda.png', quals: {speed:30,aerobics:50,agility:60}, locked: false},
    {id:'pl_3', name:'Lorna', url:'img/candidates/Lorna.png', quals: {speed:40,aerobics:35,agility:45}, locked: true},
    {id:'pl_4', name:'Moss', url:'img/candidates/Moss.png', quals: {speed:60,aerobics:30,agility:60}, locked: true},
    {id:'pl_5', name:'Refiloe', url:'img/candidates/Refiloe.png', quals: {speed:90,aerobics:100,agility:95}, locked: true},
    {id:'pl_6', name:'Rendani', url:'img/candidates/Rendani.png', quals: {speed:80,aerobics:60,agility:85}, locked: true}, 
    {id:'pl_7', name:'Sbu', url:'img/candidates/Sbu.png', quals: {speed:26,aerobics:20,agility:10}, locked: false},
    {id:'pl_8', name:'Sticks', url:'img/candidates/Sticks.png', quals: {speed:50,aerobics:50,agility:45}, locked: true}
  
  ];


  var std_constitution={
    //these are the default settings;

      permissiblePlayers: 1,
      viewThirdPlayerImg: false,
      difficulty: '1',
      stage: '1',
      lastSelectedPlayer: 'Khensani'
  };

  $rootScope.appShutdown = function() {
    ionic.Platform.exitApp();
  };

  $rootScope._SEMANTICS={};
  $rootScope._SEMANTICS.clock=new THREE.Clock();
  $rootScope._SEMANTICS.charsHaveLoaded=false;

  $rootScope.ContextLost_btn=function(){

    storageService.destroy('_ch_sess_arr');
    storageService.destroy('constitution');
    storageService.destroy('vibratos');

    $timeout(function(){
        $state.go('app.home');
        $window.location.reload();
    },1000);
};

  function setDefaults(){

      var player_arr=storageService.get('player_arr');
      if (player_arr=='undefined' || player_arr==null || player_arr==NaN) {
          storageService.set('player_arr', std_playerArr);
      };

      var constitution=storageService.get('constitution');
      if (constitution=='undefined' || constitution==null || constitution==NaN ) {
          storageService.set('constitution', std_constitution);
      };

      var _ch_sess_arr=storageService.get('_ch_sess_arr');
      if (_ch_sess_arr=='undefined' || _ch_sess_arr==null || _ch_sess_arr==NaN) {
          storageService.set('_ch_sess_arr', []);
      }

      var vibratos=storageService.get('vibratos');
      if (vibratos==undefined || vibratos==null || vibratos==NaN) {
          storageService.set('vibratos', true);
      }
  };
  
  setDefaults();
  charFactory.loadChars();
  worlds.setupContext(); //this is the visuals programming context


  worlds.setupVisualContext(); //this uses the visuals programming context to create the visuals
  worlds.createClouds();
  worlds.createSurroundings();
  worlds.loadBoards();

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
  
  $stateProvider

    .state('app',{
      url: '/app',
      abstract: true,
      templateUrl: 'templates/states/app.html',
      disableHardwareBackButton : true
    })
    .state('app.home',{
      url: '/home',
      views:{
        'menuContent2': {
          templateUrl: 'templates/states/home.html',
          disableHardwareBackButton : true,
          controller:  'appCtrl'
        }
      }
    })
    .state('app.sessConfig',{
      url: '/sessConfig',
      views:{
        'menuContent2': {
          templateUrl: 'templates/states/sessConfig.html',
          disableHardwareBackButton : true,
          controller:  'appCtrl'
        }
      }
    })

    .state('app.play', {
      url: '/play',
      views: {
        'menuContent2': {
          templateUrl: 'templates/states/play.html', 
          disableHardwareBackButton : true,
          controller: 'gameCtrl'
        }
      }
    })

    .state('app.demoScreen', {
      url: '/demoScreen',
      views: {
        'menuContent2': {
          templateUrl: 'templates/states/demoScreen.html', 
          disableHardwareBackButton : true
        }
      }
    })
    .state('app.instructions', {
      url: '/instructions',
      views: {
        'menuContent2': {
          templateUrl: 'templates/states/instructions.html', 
          disableHardwareBackButton : true,
          controller: 'appCtrl'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent2': {
          templateUrl: 'templates/states/about.html', 
          disableHardwareBackButton : true,
          controller: 'appCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
  $ionicConfigProvider.views.maxCache(0);
});





