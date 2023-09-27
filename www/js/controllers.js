(function(){
'use strict';

chigago.controller('appCtrl',function($rootScope, activeSessionFactory, worlds, $ionicPlatform,$ionicSlideBoxDelegate, $ionicActionSheet, $ionicHistory, $ionicLoading, $filter, $ionicModal, $ionicPopover, utilityFctr, $http, $window, $state, $ionicPopup, $stateParams, $timeout, $scope, $base64,storageService){
    
 
    $scope.plSelectionLeftInit=true;
    $scope.plSelectionLeft=true;
    $scope.plSelectionRight=true;
     $scope.desiredDifficulty=1;

    $scope.player_arr=storageService.get('player_arr');
    $scope.constitution=storageService.get('constitution');

    $scope.flickerImg='img_1';
    $scope.NotaBene=false;

    $scope.pendinguser=$scope.player_arr[0];
    $scope.pendinguser.selectivity=true;

    var defaultMsg='Pick your player...';
    $scope.molaetsa=defaultMsg;
    $scope.firstPlayer=null;

    $scope.homeInit=function(){
       // $rootScope.demoCtrl();

        var _ch_sess_arr=storageService.get('_ch_sess_arr');
        var index=_ch_sess_arr.length-1;

        if (_ch_sess_arr[index] && _ch_sess_arr[index].sessionType==='open') {
            $scope.openSess=true;
        }else{
            $scope.openSess=false;
        };

         $scope.HighScoreAvailable=false;
        if (_ch_sess_arr.length>0) {
            
            _ch_sess_arr.forEach(function(sess){
                if (sess.sessionType==='closed') {$scope.HighScoreAvailable=true;}
            });
        };

      
    };

    $rootScope.instructionsPager=function(fn){
        
        switch(fn){
            case 'next':
               $ionicSlideBoxDelegate.next();
            break;
            case 'previous':
               $ionicSlideBoxDelegate.previous();
            break;
        }
    };

    $rootScope.instSlideChanged=function(index){
      $rootScope.instructionSlideIndex=index+1;
    };

    $rootScope.instInit=function(){

        switch($state.current.name){

            case 'app.instructions':
              $rootScope.instructionSlideIndex=1;
            break;
            case 'app.sessConfig':
              var playerList=storageService.get('player_arr');
              var i=0, k=playerList.length, ctrlI;

              for(i; i<k; i++){

                  if (playerList[i].name==storageService.get('constitution').lastSelectedPlayer) {
                      
                      ctrlI=i;
                      $rootScope.instructionSlideIndex=i;
                      break;
                  }
              };

              $timeout(function(){
                $ionicSlideBoxDelegate.slide(ctrlI);
                if($rootScope.instructionSlideIndex===1){$scope.plSelectionPrev=false;}
              },200);  
            break;
        }
    };

    $scope.viewNxtPlayer=function(operation, index){
 
          switch(operation){
              case 'left':
                
                $ionicSlideBoxDelegate.previous();
                if ($scope.slideIndex==undefined || $scope.slideIndex==0) {
                         $scope.plSelectionLeft=false;
                         return;
                }
                        $scope.plSelectionRight=true;
              break;
              case 'right':
              $ionicSlideBoxDelegate.next();
                if ($scope.slideIndex==7) {
                         $scope.plSelectionRight=false;
                          
                         return;
                }       
                        $scope.plSelectionLeft=true;
              break;
          }
    };

    $scope.ugSlideChanged=function(index){
      $scope.slideIndex=index;
      $scope.pendinguser=$scope.player_arr[index];
      $scope.plSelectionLeftInit=false;
    };

    $scope.currentSession={};
    $scope.currentSession.players=[];
    $scope.setPlayers=true;
    $scope.setDifficulty=false;
    $scope.levelOfDifficulty=$scope.constitution.difficulty;

    $scope.bootstrap=function(operation){
      $scope.settingsPop.hide();
        switch(operation){ 
          case 'refresh':

            $ionicLoading.show({templateUrl: 'loaderText.html'});
            $window.location.reload();
          break;
          case 'reset':

            $ionicPopup.confirm({
             scope: $scope,
             content:  '<h4 style="text-align: center; color: grey;">Are you sure you want to reset the application? All your records will be cleared.</h4>',
             cancelType: 'nix',
             okType: 'nix',
             cancelText: '<p class="confBtn">Nope</p>',
             okText: '<p class="confBtn">Yes</p>'
             }).then(function(res){
                if (res){
                    $ionicLoading.show({templateUrl: 'loaderText.html'});
                    localStorage.clear();
                    $window.location.reload();
                }
          });
          break;
        }
    };

    $scope.setVibratos=function(val){

        if (val) {
          storageService.set('vibratos', true);
          return;
        }

        storageService.set('vibratos', false);
    };

  $scope.starlet;
  $scope.HighScore=function(){

      var sess_arr=storageService.get('_ch_sess_arr');
      var scores=[];
      var i=0;
      var k=sess_arr.length;
      var highestScore;

      if (k>0) {
        for(i;i<k;i++){
              if (sess_arr[i].sessionType==='closed') {
                  scores.push(sess_arr[i].score);
              };
        };

        highestScore=utilityFctr.arrMaxMin('max', scores);

        sess_arr.forEach(function(sess){
            if (sess.score==highestScore) {
                $scope.starlet=sess;
            };
        });

        $ionicPopup.show({
          scope: $scope,
          template: 
                    '<div style="padding-left: 10px; padding-right: 10px;"><br>'
                  + '<div style=" color: black;">Score :  <strong class="balanced" style="float: right;">{{starlet.score}}</strong></div>'
                  + '<div style="color: black;">Stages completed :  <strong class="balanced" style="float: right;">{{starlet.lvls.length}}</strong></div>'
                  + '<div style="color: black;">Player :   <strong class="balanced" style="float: right;">{{starlet.livePlayer.name}}</strong></div>'
                  + '<div style="color: black;">Got hit :  <span style="float: right;"><strong class="assertive">{{starlet.hits}}</strong> time<span ng-if="starlet.hits!==1">s</span></span></div></div>',
              
          title: 'High Score',
          buttons: [{ text: '<p class="confBtn">Done</p>' }]
         
        });
      };
  };

  $scope.about=function(){
          $state.go('app.about');
          $scope.settingsPop.hide();
  }

  $rootScope.instructions_=function(){
    $state.go('app.instructions');
};
  
  $scope.settings=function($event){
      $scope.vibratoSwitch=storageService.get('vibratos');
      $ionicPopover.fromTemplateUrl('settingsMenu.html', {scope: $scope}).then(function(popover) {
          $scope.settingsPop=popover; 
          $scope.settingsPop.show($event);
      });
  };

    $rootScope.closeInstructionsModal=function(){
        $state.go('app.home');
    };

    $scope.closeAbout=function(){
        $state.go('app.home');
    };

    $scope.difficultyConfig=function(){

       $scope.levelOfDifficulty=storageService.get('constitution').difficulty;
       $scope.diffMsg=$scope.diffMsgCtrl(storageService.get('constitution').difficulty);
       
      if ($scope.setPlayers) {
          // $scope.setDifficulty=true;
          $scope.setPlayers=false;

        $ionicLoading.show({
           scope: $scope,
           templateUrl: 'setDifficulty.html' 

         });
      }

    $scope.DiffConf_btns=function(option){
        // $scope.setDifficulty=false;
        $scope.setPlayers=true;  

        switch(option){
           case 'set':
              var legal_=storageService.get('constitution');
                  legal_.difficulty=$scope.desiredDifficulty;
                  storageService.set('constitution', legal_);

                 /*beneath is some code to cancel a saved session if the level of difficulty is changed*/
                var _ch_sess_arr=storageService.get('_ch_sess_arr');
                var index=_ch_sess_arr.length-1;

                if (_ch_sess_arr[index] && _ch_sess_arr[index].sessionType==='open') {
                    $scope.openSess=false;
                    _ch_sess_arr[index].sessionType='closed';
                    storageService.set('_ch_sess_arr', _ch_sess_arr);
                }else{
                    $scope.openSess=true;
                } 

               $ionicLoading.hide();
            break;
            case 'cancel':
               $ionicLoading.hide();
            break;
        }
    }
  };

    $scope.adjDiff=function(option){
      switch(option){
          case 'more':

            if ($scope.levelOfDifficulty<3) {$scope.levelOfDifficulty++};
          break;
          case 'less':
            if ($scope.levelOfDifficulty>1) {$scope.levelOfDifficulty--};
          break;
      }

      $scope.diffMsg=$scope.diffMsgCtrl($scope.levelOfDifficulty);
    };

    $scope.diffMsgCtrl=function(val){
        $scope.desiredDifficulty=val;
      /*****************************************************************/
      var testval=utilityFctr.stringCaster(val);

        switch(testval){
          case 1:
            $scope.diffMsg='Friendly... (nix moya)';
          break;
          case 2:
            $scope.diffMsg='after school is after school';
          break;
          case 3:
            $scope.diffMsg='...Dzuming game!';
          break;
        }
        
        return $scope.diffMsg;
    }; 

    $scope.goToGame=function(){
      
      //this modal handles a lot of the functionality
      $state.go('app.sessConfig');
    };

    $scope.msgBroadcaster=function(msg){
      //display message for 4 seconds, make it flicker and then remove it
      
      $scope.NotaBene=true;
      $scope.molaetsa=msg;

      $timeout(function(){
        $scope.NotaBene=false;
        $scope.molaetsa=defaultMsg;

      },5500);
    };


    $scope.checkCharsLoad=function(fn){

      if ($rootScope._SEMANTICS.charsHaveLoaded===false) {
          $ionicLoading.show({templateUrl: 'loaderText.html'});

          $scope.$on('allCharsHaveLoaded', function(res){
            $ionicLoading.hide();
            fn()
          });
          
        }else{
            fn();
        }
    };

$scope.startGame=function(){

          $scope.firstPlayer=$scope.pendinguser;

        if ($scope.pendinguser.locked) {
            $scope.msgBroadcaster('This player is locked, you don\'t have enough points yet');

            }else{
            
               $ionicLoading.show({templateUrl: 'loaderText.html'}).then(function(){
                $rootScope.sessobj={};
                $rootScope.sessobj.sess_id=Date.now()+Math.floor(Math.random()*100);
                $rootScope.sessobj.difficulty=storageService.get('constitution').difficulty;
                $rootScope.sessobj.health={h1:true, h2:true, h3:true, h4:true, h5:true};
                $rootScope.sessobj.sessTimer={min:3,sec:0,milSec:0};
                $rootScope.sessobj.score=0;
                $rootScope.sessobj.lvls=[];
                $rootScope.levelScore=0;

                $rootScope.sessobj.allocatedTime=3;
                $rootScope.sessobj.stage=1;
                $rootScope.sessobj.hits=0;
                $rootScope.sessobj.livePlayer=$scope.firstPlayer;
                $rootScope.sessobj.dzumers=utilityFctr.GenerateRandomDzumers($scope.firstPlayer.name);
                $rootScope.sessobj.firstPlayer=utilityFctr.gimmeThePlayer($rootScope.sessobj.livePlayer.name+'_ms');
                $rootScope.sessobj.firstPlayer.scale.set(3,3,3);
                $rootScope.sessobj.firstPlayer.position.set(-120,0,-150);
                $rootScope.sessobj.firstPlayer.rotation.y=0;
                $rootScope.scene.add($rootScope.sessobj.firstPlayer);
                $rootScope.restorer=false;
                $rootScope.sessobj.canconfig={};
               //this packs the cans in a certain way.
                utilityFctr.tinStarterPack('start');
                $state.go('app.play');
                 
               })              
            };
       };

$scope.pickupSession=function(){

      var _ch_sess_arr=storageService.get('_ch_sess_arr');
      var index=_ch_sess_arr.length-1;
      var serialObj=_ch_sess_arr[index];

            if (_ch_sess_arr!= null || _ch_sess_arr!= undefined) {

              $ionicLoading.show({templateUrl: 'spinner.html'}).then(function(){

              $rootScope.sessobj={};
              $rootScope.sessobj.sess_id=serialObj.sess_id;
              $rootScope.sessobj.sessTimer=serialObj.sessTimer;

              $rootScope.sessobj.difficulty=serialObj.difficulty;
              $rootScope.sessobj.health=serialObj.health;
              $rootScope.sessobj.stage=serialObj.stage;
              $rootScope.sessobj.hits=serialObj.hits;
              $rootScope.sessobj.score=serialObj.score;
              $rootScope.sessobj.dzumers=serialObj.dzumers;
              $rootScope.sessobj.livePlayer=serialObj.livePlayer;
              $rootScope.sessobj.lvls=serialObj.lvls;
              $rootScope.sessobj.legalPlayers=serialObj.legalPlayers
              $rootScope.levelScore=serialObj.levelScore
              $rootScope.sessobj.allocatedTime=serialObj.allocatedTime;

              $rootScope.sessobj.firstPlayer=utilityFctr.gimmeThePlayer(serialObj.livePlayer.name+'_ms');
              $rootScope.sessobj.firstPlayer.scale.set(3,3,3);
              $rootScope.sessobj.firstPlayer.position.set(-120,0,-150);
              $rootScope.restorer=true;
              
              $rootScope.scene.add($rootScope.sessobj.firstPlayer);
              utilityFctr.restoreCans(serialObj.canconfig);
              $state.go('app.play');  

              })
                
          }else{
            $timeout(function(){$scope.pickupSession();},500);
            //handle error
     }
};

});

chigago.controller('gameCtrl',function($rootScope, activeSessionFactory, $ionicModal, worlds, theWatcher, $ionicLoading, $ionicPopover, utilityFctr, $window, $document, $state, $ionicPopup, $stateParams, $timeout, $scope, $base64, storageService){
       // $rootScope.demoCtrl();
$rootScope.zeklas='moj'
   // if ($rootScope.banner) {$rootScope.banner.hide();}
  $scope.activeZone={};
  $scope.zone_1_ops=true;
  $scope.constitution=storageService.get('constitution');
  $scope.DEBUG_PACK={};

  $rootScope.bonus=0;
  $rootScope.vibratos=storageService.get('vibratos');
  $scope.RUNTIME_MSG='';

  $rootScope.renderer.compile($rootScope.scene, $rootScope.camera);

  $scope.moj1=false;
  $scope.moj2=false;
  $scope.moj3=false;
  $scope.moj4=false;
  $scope.moj5=false;
  $scope.moj6=false;
  $scope.moj7=false;
  $scope.moj8=false;
  $scope.moj9=false;
  $scope.moj10=false;
  $scope.moj11=false;
  $scope.moj12=false;
  $scope.moj13=false;
  $scope.moj14=false;
  $scope.moj15=false;
  $scope.moj16=false;
  $scope.moj17=false;

  var dzumer_1_stdPosition=new THREE.Vector3(0,0,550);
  var dzumer_2_stdPosition=new THREE.Vector3(0,0,-550);
    
  var dz2_throwExecution=false;
  var dz2_fetchExecution=false;
  var dz2_reposExecution=false;

  var dz1_throwExecution=false;
  var dz1_fetchExecution=false;
  var dz1_reposExecution=false;

  var camOrigionalPoint=new THREE.Vector3(700,200,0);
  var _dragIsLegal=false;
  var influencer=1;

  $scope.bloodshot=false;

  var pauseSession='off';
  var INV_MAX_FPS=1/60;
  var frameDelta=0;
  var secondFrameDelta=0;
  var clock=new THREE.Clock();
  var chingwiiCoords_1={x:null,z:null};

  var step=0.0;
  var varDir='up';
  var canPick=true;
  var canDrag=false;
  var toPick=null;
  var plSpeed=0;
  var dz_speed=0;
  var bl_speed_1=0;
  var bl_speed_2=0;
  var ballTofeet, ballTohead, balltoChest;
  var chingwiiCounter=0;
      $scope.onoMarks={sec:4,milSec:0};

  var timerValid=true;
  var requestID;
  var canPlacement=0;

  const pointVector=new THREE.Vector3();
  var stats=initStats();
  $scope.showStats=false;


  function initStats(){var stats=new Stats();$("#Stats").append(stats.domElement);return stats;};
  var output=null;


function CHAR_INIT(){
  
  if ($rootScope.sessobj) {

        $scope.dzumer_1=utilityFctr.gimmeThePlayer($rootScope.sessobj.dzumers.d1+'_ms');
        $scope.dzumer_1.scale.set(3,3,3);
        $scope.dzumer_1.position.set(0,0,400);
        $scope.dzumer_1.lookAt(new THREE.Vector3($rootScope.scene.position.x,0,$rootScope.scene.position.z));

        $scope.dz_skltn_1 = new THREE.SkeletonHelper( $scope.dzumer_1 );
        $scope.dz_skltn_1.visible = false;
        $rootScope.scene.add($scope.dz_skltn_1);

        $scope.dzumer_2=utilityFctr.gimmeThePlayer($rootScope.sessobj.dzumers.d2+'_ms');
        $scope.dzumer_2.scale.set(3,3,3);
        $scope.dzumer_2.position.set(0,0,-400);
        
        $scope.dz_skltn_2 = new THREE.SkeletonHelper( $scope.dzumer_2 );
        $scope.dz_skltn_2.visible = false;
        $rootScope.scene.add($scope.dz_skltn_2);

        $scope.pl_skltn = new THREE.SkeletonHelper( $rootScope.sessobj.firstPlayer );
        $scope.pl_skltn.visible = false;
        $rootScope.scene.add($scope.pl_skltn);

        $rootScope.scene.add($scope.dzumer_1);
        $rootScope.scene.add($scope.dzumer_2);

        $scope.dzumAnim=activeSessionFactory.dzum_init($scope.dzumer_1, $scope.dzumer_2);
        $scope.playerAnim=activeSessionFactory.playerAnimInit($rootScope.sessobj.firstPlayer);
        $scope.pl_animMode=$scope.playerAnim.anims.pose;
        
        $scope.playerAnim.anims.pose.play().repetitions='Infinite';
        $scope.dzumAnim.anims.pose_1.play().repetitions='Infinite'; $scope.dzumAnimMode1=$scope.dzumAnim.anims.pose_1;
        $scope.dzumAnim.anims.pose_2.play().repetitions='Infinite'; $scope.dzumAnimMode2=$scope.dzumAnim.anims.pose_2;
        // $rootScope.levelHealth=utilityFctr.healthNumValue($rootScope.sessobj.health);

         $rootScope.scene.background=$rootScope.clouds;


        if ($rootScope.sessobj.livePlayer.quals.speed<=30) {
            plSpeed=5;
        };

        if ($rootScope.sessobj.livePlayer.quals.speed>30 && $rootScope.sessobj.livePlayer.quals.speed<=60) {
            plSpeed=6;
        };

        if ($rootScope.sessobj.livePlayer.quals.speed>60) {
            plSpeed=7;
        };

        if($scope.constitution.difficulty==='1' || $scope.constitution.difficulty===1){

          $rootScope.makt_dynamic._koti_01.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_02.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_03.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_04.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_05.material=$rootScope.phyMat;

          dz_speed=3;
          bl_speed_1=25;
          bl_speed_2=25;
          influencer=10;
        }

        if($scope.constitution.difficulty==='2' || $scope.constitution.difficulty===2){
          $rootScope.makt_dynamic._koti_01.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_02.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_03.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_04.material=$rootScope.phyMat;
          $rootScope.makt_dynamic._koti_05.material=$rootScope.phyMat;

          dz_speed=5.5;
          bl_speed_1=30;
          bl_speed_2=35;
          influencer=20;
        }

        if ($scope.constitution.difficulty==='3' || $scope.constitution.difficulty===3) {

          $rootScope.makt_dynamic._koti_01.material=$rootScope.phyMat3;
          $rootScope.makt_dynamic._koti_02.material=$rootScope.phyMat3;
          $rootScope.makt_dynamic._koti_03.material=$rootScope.phyMat3;
          $rootScope.makt_dynamic._koti_04.material=$rootScope.phyMat3;
          $rootScope.makt_dynamic._koti_05.material=$rootScope.phyMat3;

          dz_speed=8.5;
          bl_speed_1=45;
          bl_speed_2=50;
          influencer=30;
        }

        $scope.goalPos={};
        $scope.goalPos.t1=false;
        $scope.goalPos.t2=false;
        $scope.goalPos.t3=false;
        $scope.goalPos.t4=false;
        $scope.goalPos.t5=false;

         animate();
         $ionicLoading.hide();

       }else{
          $state.go('app.home'); 
          localStorage.clear(); 
          $timeout(function(){$window.location.reload();},500);
          // 
    };
        $rootScope.home6.visible=true; $rootScope.scene.add($rootScope.home6);
        $rootScope.home7.visible=true; $rootScope.scene.add($rootScope.home7);
        $rootScope.home8.visible=true; $rootScope.scene.add($rootScope.home8);
        $rootScope.home9.visible=true; $rootScope.scene.add($rootScope.home9);
        $rootScope.home10.visible=true; $rootScope.scene.add($rootScope.home10);
};

  $timeout(function(){

        output=document.getElementById('output');

        if (output) {
          output.append($rootScope.renderer.domElement);
          return;
        }

  },300);

//THIS FUNCTION CALL AND SUBSEQUENT DECLARATIONS ARE SIMPLY TO BOOTSTRAP THE SESSION
  CHAR_INIT();

  var pl_turnCtrlPoint=new THREE.Vector3($rootScope.sessobj.firstPlayer.position.x,0,$rootScope.sessobj.firstPlayer.position.z);
  var dz1_turnCtrl=new THREE.Vector3($scope.dzumer_1.position.x,0,$scope.dzumer_1.position.z);
  var dz2_turnCtrl=new THREE.Vector3($scope.dzumer_2.position.x,0,$scope.dzumer_2.position.z);

  $scope.sessMenu=function($event){
      $ionicPopover.fromTemplateUrl('sessMenu.html', {scope: $scope}).then(function(popover) {

          $scope.quickMenuPop=popover; 
          clock.stop();
          pauseSession='on';
          $scope.quickMenuPop.show($event);
      });
  };

  $scope.saveCurrentSession=function(condition){


      $rootScope.sessobj.sessTimer=sessTimer;
      $rootScope.sessobj.levelScore=$rootScope.levelScore;
      var currentSession=$rootScope.sessobj;

      $rootScope.scene.remove($rootScope.sessobj.firstPlayer);
      $rootScope.scene.remove($scope.pl_skltn);
      
      delete currentSession.firstPlayer;
      var _ch_sess_arr=storageService.get('_ch_sess_arr');
      var index=_ch_sess_arr.length-1;
      
      currentSession.sessionType=condition;
      
      if (_ch_sess_arr.length>0 && _ch_sess_arr[index].sess_id===currentSession.sess_id) {
          //replace the old with the new
          _ch_sess_arr.splice(index, 1, currentSession);
      }else{
        _ch_sess_arr.push(currentSession);
      }
       
      storageService.set('_ch_sess_arr', _ch_sess_arr);
  };

  function CHAR_REBOOT(){

          cancelAnimationFrame(requestID);

          $rootScope.scene.remove($scope.dzumer_1);
          $rootScope.scene.remove($scope.dzumer_2);
          $rootScope.scene.remove($scope.dz_skltn_1);
          $rootScope.scene.remove($scope.dz_skltn_2);
          
          delete $scope.dzumAnim;
          delete $scope.playerAnim;
          delete $scope.pl_animMode;
          delete $scope.dzumAnimMode1;
          delete $scope.dzumAnimMode2;

          delete $scope.dz_skltn_1;
          delete $scope.dz_skltn_2;
          delete $scope.pl_skltn;
   };

  $scope.$on('$destroy', function(e){
      e.preventDefault();

      if ($scope.quickMenuPop) {
          $scope.quickMenuPop.hide();
          $scope.quickMenuPop.remove();
      };

      delete $rootScope.scene.background;
      
       document.getElementById('funkyBtn').removeEventListener('touchend', onPrintTouch, false);
       document.getElementById('funkyBtn').removeEventListener('touchstart',onPrintLift, false);

       $window.cancelAnimationFrame(requestID);
       output.remove($rootScope.renderer.domElement);

  });

  $scope.PS_CTRL=function(FN, anims){

        if (anims) {                
            if ($scope.pl_animMode) {
              $scope.pl_animMode.stop();
            }

            if ($scope.playerAnim && $scope.playerAnim.anims.pose.isRunning) {
              $scope.playerAnim.anims.pose.stop();
            }
        };
        
        switch(FN){

            case 'place':
            if ($rootScope.vibratos) {navigator.vibrate(50)};
            $scope.pl_animMode=$scope.playerAnim.anims.chigago;
            $scope.playerAnim.anims.chigago.play().repetitions=0;
            chingwiiCoords_1={x:$rootScope.sessobj.firstPlayer.position.x, z:$rootScope.sessobj.firstPlayer.position.z};

            break;
            case 'squat':
            if ($rootScope.vibratos) {navigator.vibrate(50)};
            $scope.pl_animMode=$scope.playerAnim.anims.squat;
            $scope.playerAnim.anims.squat.play().repetitions=0;
            
            break;
            case 'hintsNfixes':
            if ($rootScope.vibratos) {navigator.vibrate(50)};
            utilityFctr.hintsNfixes($scope);
           
            break;
            case 'grab':
            if ($rootScope.vibratos) {navigator.vibrate(50)};
            $scope.pl_animMode=$scope.playerAnim.anims.grab; 
            $scope.playerAnim.anims.grab.play().repetitions=0;

            break;
        }
  };

  function grabCan(){
      //findout if can should be picked or dropped
      //if can should be picked, calculate player.distanceTo(allCans) and find out which is close and falls within appliccable radius. if two cans have same radius and are both legal, flip the coin
      //if can should be dropped, calculate player.distanceTo(scene) and if player is close enough to scene PLACE can appropriately, if not drop it right there

      if (canPick) {

          var distances=[];
          var tinniest=null;
          var i=0;
          
          var dA={name: 'A'},dB={name: 'B'},dC={name: 'C'},dD={name: 'D'},dE={name: 'E'};
          var ctrlPoints=[dA,dB,dC,dD,dE];

          dA.val=distances[0]=$rootScope.makt_dynamic._koti_01.position.distanceTo($rootScope.sessobj.firstPlayer.position);
          dB.val=distances[1]=$rootScope.makt_dynamic._koti_02.position.distanceTo($rootScope.sessobj.firstPlayer.position);
          dC.val=distances[2]=$rootScope.makt_dynamic._koti_03.position.distanceTo($rootScope.sessobj.firstPlayer.position);
          dD.val=distances[3]=$rootScope.makt_dynamic._koti_04.position.distanceTo($rootScope.sessobj.firstPlayer.position);
          dE.val=distances[4]=$rootScope.makt_dynamic._koti_05.position.distanceTo($rootScope.sessobj.firstPlayer.position);

          tinniest=Math.min(dA.val,dB.val,dC.val,dD.val,dE.val);
      
          var i=0;
          var k=ctrlPoints.length;


          if (tinniest && tinniest<=45){          

          for(i;i<k;i++){
              if (ctrlPoints[i].val===tinniest) {toPick=ctrlPoints[i].name;}
          };

            canPick=false;  canDrag=true;
            activeSessionFactory.massMesser('pick', toPick);

            var isRightCan=utilityFctr.isRightCan(toPick, $scope);

            if (isRightCan==false) {
                $scope.RUNTIME_MSG='you\'re holding the wrong can...';
                $scope.moj17=true;

                $timeout(function(){
                  $scope.RUNTIME_MSG='press the red circle for a hint';
                   $scope.moj17=false; 
                    $scope.moj4=true;
                  $timeout(function(){$scope.RUNTIME_MSG='';$scope.moj4=false;},2000);
                }, 2000)
            }
          }

      }else{

        //decide on where can gets dropped depending on where player is
        //drop can then activate canPick (set it to true), falsify canDrag && set toPick=null;

        if ($rootScope.scene.position.distanceTo($rootScope.sessobj.firstPlayer.position)>40) {
          activeSessionFactory.massMesser('loose_drop', toPick);
        }else{
          activeSessionFactory.massMesser('accurate_drop', toPick); 
          canPlacement++;
          if ($rootScope.vibratos) {navigator.vibrate(50)};

          $rootScope.sessobj.score+=(50*influencer);
          $rootScope.levelScore+=(50*influencer);
        }

        canPick=true;
        canDrag=false;
        toPick=null;

     }
  };

  var CD2_hand=$scope.pl_skltn.bones[24].matrixWorld;
  function canDragger(can){
    if (canDrag) {

      switch(can){
        case 'A':
            $rootScope.makt_static._koti_01.position.copy(CD2_hand.getPosition()); 
        break;
        case 'B':
            $rootScope.makt_static._koti_02.position.copy(CD2_hand.getPosition());
        break;
        case 'C':
            $rootScope.makt_static._koti_03.position.copy(CD2_hand.getPosition());
        break;
        case 'D':
            $rootScope.makt_static._koti_04.position.copy(CD2_hand.getPosition());
        break;
        case 'E':
            $rootScope.makt_static._koti_05.position.copy(CD2_hand.getPosition());
        break;

      }
    }
  };

$scope.playerAnim.pl_anim.addEventListener('finished',onAnimFinished, false);

function onAnimFinished(e){

  if ($scope.pl_animMode._clip.name==='chigago_std') {

    ////////////////////////////////////////////////////////////////////////
  
    var mgX=$rootScope.sessobj.firstPlayer.position.x;
    var mgY=$rootScope.sessobj.firstPlayer.position.y;
    var mgZ=$rootScope.sessobj.firstPlayer.position.z;

    var headNx=$rootScope.sessobj.firstPlayer.position.distanceTo(new THREE.Vector3(0,mgY,mgZ));
    var headNz=$rootScope.sessobj.firstPlayer.position.distanceTo(new THREE.Vector3(mgX,mgY,0));

      if (headNx<=600 && headNz<= 750){
          var pos=$scope.pl_skltn.bones[35].matrixWorld.getPosition();
                  $rootScope.sessobj.firstPlayer.position.set(pos.x,0,pos.z);

          chingwii();

      }else{
            switch(getQuadrant(mgX, mgZ)){

              case 'I':   $rootScope.sessobj.firstPlayer.position.set(mgX-10,0,mgZ-10); break;
              case 'II':  $rootScope.sessobj.firstPlayer.position.set(mgX-10,0,mgZ+10); break;
              case 'III': $rootScope.sessobj.firstPlayer.position.set(mgX+10,0,mgZ+10); break;
              case 'IV':  $rootScope.sessobj.firstPlayer.position.set(mgX+10,0,mgZ-10); break;    
          }
      };
  };

  if ($scope.pl_animMode._clip.name!=='Pose_cycle') {
    $scope.pl_animMode.stop();
    $scope.playerAnim.anims.pose.play().clampwhenFinished=true;
  };

  if ($scope.pl_animMode._clip.name==='grab') {
     grabCan();
  };
};

  var ZD_dfd={mgX: null, mgY: null, mgZ: null };
  var ZD_vec1=new THREE.Vector3(), ZD_vec2=new THREE.Vector3(); 
  $scope.zone_detector=function(_delta){
        //if ball is in zone 1 for more than a certain amount of time, we push it to next nearest zone
  
        if ($scope.zone_1_ops===false) {
            if ($rootScope.mogustu.position.distanceTo($rootScope.scene.position)<250) {
                $scope.zone_1_ops=true;
            };
        };

        if ($scope.zone_1_ops) {
          if ($rootScope.mogustu.position.distanceTo($rootScope.scene.position)>=250) {

                $scope.zone_1_ops=false;
          };
        };

        if($rootScope.mogustu.position.distanceTo($rootScope.scene.position)<750){
           
           if ($scope.activeZone.zone!=='B') {
             if ($rootScope.mogustu.position.z>0) {
              $scope.activeZone.zone='B'; $scope.activeZone.stamp=_delta;
              $scope.abort_zonal_missions();
              $scope.zone_2_ops=true;

              //the other dzumer must go back to their spot
             
              return;
            };
          };

          if ($scope.activeZone.zone!=='C') {
              if ($rootScope.mogustu.position.z<0){
                $scope.activeZone.zone='C'; $scope.activeZone.stamp=_delta;
                $scope.abort_zonal_missions();
                 $scope.zone_3_ops=true;
                 // $scope.ballGrab2=false;
                 //the other dzumer must go back to their spot
                return;
              };
           };
        };

        ZD_dfd.mgX=$rootScope.mogustu.position.x;
        ZD_dfd.mgY=$rootScope.mogustu.position.y;
        ZD_dfd.mgZ=$rootScope.mogustu.position.z;

        if ($rootScope.mogustu.position.distanceTo(ZD_vec1.set(0,ZD_dfd.mgY,ZD_dfd.mgZ))>=710 || $rootScope.mogustu.position.distanceTo(ZD_vec2.set(ZD_dfd.mgX,ZD_dfd.mgY,0))>= 800) {
            $scope.activeZone.zone='D'; $scope.activeZone.stamp=_delta;
            $scope.abort_zonal_missions();
             $rootScope.mogustu.setLinearVelocity(pointVector);
            shootAtSoldier('power_bouncer');
            
            return;
        };

        //here we are going to take the ball exactly where it comes from
        if ( $rootScope.mogustu.position.y<0) {

            $scope.activeZone.zone='E'; $scope.activeZone.stamp=_delta;
            $scope.abort_zonal_missions();

            $rootScope.mogustu.setLinearVelocity(pointVector);
            shootAtSoldier('power_bouncer');
            return;
        }
  };

  var UD1_dir=new THREE.Vector3(), UD1_ballIsHere, UD1_toStdPosition=new THREE.Vector3(), UD1_jonga=new THREE.Vector3(), UD1_vec=new THREE.Vector3();
  function updateDzumer1(){
      //is a throw in execution? if yes then skip over everything.
        
      if (dz1_throwExecution===false) {
        UD1_ballIsHere=isBallHere('B');


        if ($scope.zone_2_ops) { //this checks if the zonal mission is legal or not

          if ($scope.dz_skltn_1.bones[5].matrixWorld.getPosition().distanceTo($rootScope.mogustu.position)<20 || $scope.dz_skltn_1.bones[8].matrixWorld.getPosition().distanceTo($rootScope.mogustu.position)<20) {

              $scope.$emit('phosa', 'dzumer_1');

            }else{
              
              if ($scope.dzumAnim.anims.run_1.isRunning()===false) {
                   
                    $scope.dzumAnimMode1.stop();
                    $scope.dzumAnim.anims.run_1.play(); $scope.dzumAnimMode1=$scope.dzumAnim.anims.run_1;
              }
              
                  UD1_dir.set(-$scope.dzumer_1.position.x+$rootScope.mogustu.position.x,0,-$scope.dzumer_1.position.z+$rootScope.mogustu.position.z);
                  UD1_dir.normalize();
                  
                  $scope.dzumer_1.lookAt(UD1_vec.set($rootScope.mogustu.position.x,0,$rootScope.mogustu.position.z));
                  $scope.dzumer_1.position.add(UD1_dir.multiplyScalar(dz_speed));
              }

          }else{
            //if we are not the active zone we will go back to position if we are not there.
           if ($scope.dz_skltn_1.bones[7].matrixWorld.getPosition().distanceTo(dzumer_1_stdPosition)>=150 && UD1_ballIsHere===false) {

            if ($scope.dzumAnim.anims.run_1.isRunning()===false) {
                  $scope.dzumAnimMode1.stop();
                  $scope.dzumAnim.anims.run_1.play(); $scope.dzumAnimMode1=$scope.dzumAnim.anims.run_1;
            }

                UD1_toStdPosition.set(-$scope.dzumer_1.position.x+dzumer_1_stdPosition.x,0,-$scope.dzumer_1.position.z+dzumer_1_stdPosition.z);
                UD1_toStdPosition.normalize();
                $scope.dzumer_1.lookAt(dzumer_1_stdPosition);
                $scope.dzumer_1.position.add(UD1_toStdPosition.multiplyScalar(dz_speed));
   
          }else{
             UD1_jonga.set($rootScope.scene.x-$scope.dzumer_1.position.x,0,$rootScope.scene.z-$scope.dzumer_1.position.z);
              if ($scope.dzumer_1.rotation.y!==(Math.atan2(UD1_jonga.x,UD1_jonga.z))) {
                  // $scope.dzumer_1.rotation.y=-(Math.atan2(UD1_jonga.x,-UD1_jonga.z));

                  $scope.dzumer_1.lookAt($rootScope.scene.position);
            };

               
               if ($scope.dzumAnim.anims.run_1.isRunning()) {
                  $scope.dzumAnimMode1.stop();
                  $scope.dzumAnim.anims.pose_1.play().clampwhenFinished=true; $scope.dzumAnimMode1=$scope.dzumAnim.anims.pose_1;
            };
          }
        }
      }
   };

var UD2_dir=new THREE.Vector3(), UD2_ballIsHere, UD2_toStdPosition=new THREE.Vector3(), UD2_jonga, UD2_vec=new THREE.Vector3(), UD2_vec2=new THREE.Vector3();
function updateDzumer2(){ 
    if (dz2_throwExecution===false) {

    UD2_ballIsHere=isBallHere('C');
     if(UD2_ballIsHere && $scope.zone_3_ops){
        if ($scope.dz_skltn_2.bones[5].matrixWorld.getPosition().distanceTo($rootScope.mogustu.position)<20 || $scope.dz_skltn_2.bones[8].matrixWorld.getPosition().distanceTo($rootScope.mogustu.position)<20) {
            //this is the dzum cycle
            $scope.$emit('phosa', 'dzumer_2');
            dz2_throwExecution=true;
            return;
        }

        //this is the fetch cycle
        if ($rootScope.mogustu.position.z<0 && $scope.dz_skltn_2.bones[5].matrixWorld.getPosition().distanceTo($rootScope.mogustu.position)>10) {
          //this is the code that causes dzumer to simply run after ball
           if ($scope.dzumAnim.anims.run_2.isRunning()===false) {
               $scope.dzumAnimMode2.stop();
               $scope.dzumAnimMode2=$scope.dzumAnim.anims.run_2;$scope.dzumAnim.anims.run_2.play();
            }

             UD2_dir.set($rootScope.mogustu.position.x-$scope.dzumer_2.position.x,0,$rootScope.mogustu.position.z-$scope.dzumer_2.position.z);
                UD2_dir.normalize(); 
                // $scope.dzumer_2.rotation.y=Math.abs(Math.atan2(UD2_dir.x,UD2_dir.z)-Math.PI);
                $scope.dzumer_2.lookAt(UD2_vec.set($rootScope.mogustu.position.x,0,$rootScope.mogustu.position.z));
                $scope.dzumer_2.position.add(UD2_dir.multiplyScalar(dz_speed));
              return;
            };


     }else{
      //this is the retraction cycle
          if ($scope.dz_skltn_2.bones[7].matrixWorld.getPosition().distanceTo(dzumer_2_stdPosition)>150 && UD2_ballIsHere===false && dz2_throwExecution==false) {

              if ($scope.dzumAnim.anims.run_2.isRunning()===false) {
                  $scope.dzumAnimMode2.stop();
                  $scope.dzumAnim.anims.run_2.play(); $scope.dzumAnimMode2=$scope.dzumAnim.anims.run_2;
            }

               UD2_toStdPosition.set(dzumer_2_stdPosition.x-$scope.dzumer_2.position.x,0,dzumer_2_stdPosition.z-$scope.dzumer_2.position.z);
                 UD2_toStdPosition.normalize();
                // $scope.dzumer_2.rotation.y=Math.abs(Math.atan2(UD2_toStdPosition.x,UD2_toStdPosition.z));
                $scope.dzumer_2.lookAt(UD2_vec2.set(dzumer_2_stdPosition.x,0,dzumer_2_stdPosition.z));
                $scope.dzumer_2.position.add(UD2_toStdPosition.multiplyScalar(dz_speed));
            
          }else{
           
           $scope.dzumer_2.lookAt($rootScope.scene.position);

            if ($scope.dzumAnim.anims.run_2.isRunning()) {
                  $scope.dzumAnimMode2.stop();
                  $scope.dzumAnim.anims.pose_2.play().clampwhenFinished=true; $scope.dzumAnimMode2=$scope.dzumAnim.anims.pose_2;
            }
        }
      }
    }
  };


$scope.$on('phosa', function(event, args){

          switch(args){
            case 'dzumer_1':

             dz1_throwExecution=true;
             $scope.abort_zonal_missions();

                //stop the posing
                $scope.dzumAnimMode1.stop();
                $scope.dzumAnim.anims.grab_1.setDuration(0.35);
                $scope.dzumAnimMode1=$scope.dzumAnim.anims.grab_1; $scope.dzumAnimMode1.play().repetitions=0;

                $timeout(function(){
                   $scope.legalDzumer='dzumer_1';
                      $scope.updateBallctrl='LEGAL';
                      $scope.dzumAnimMode1.stop();
                      $scope.dzumAnim.anims.throw_1.setDuration(0.5);
                      $scope.dzumAnim.anims.throw_1.play().repetitions=0; $scope.dzumAnimMode1=$scope.dzumAnim.anims.throw_1;

                      $scope.dzumer_1.lookAt(new THREE.Vector3($scope.pl_skltn.bones[5].matrixWorld.getPosition().x, 0, $scope.pl_skltn.bones[5].matrixWorld.getPosition().z));
                      
                      $timeout(function(){
                                             //this is where the thrust will happen
                      $rootScope.mogustu.setLinearVelocity(pointVector, pointVector);
                      shootAtSoldier('foot');
                      $scope.updateBallctrl='NOT_LGL';
                      $scope.dzumAnimMode1.stop();
                      $scope.dzumAnim.anims.pose_1.play().clampwhenFinished=true; $scope.dzumAnimMode1=$scope.dzumAnim.anims.pose_1;
                      $timeout(function(){

                          dz1_throwExecution=false;
                        },500);
                      },500);
                    
                },500);

            break;
            case 'dzumer_2':
               
                dz2_throwExecution=true;
                $scope.abort_zonal_missions();
                //stop the posing
                $scope.dzumAnimMode2.stop();
                $scope.dzumAnim.anims.grab_2.setDuration(0.35);
                 $scope.dzumAnimMode2=$scope.dzumAnim.anims.grab_2; $scope.dzumAnimMode2.play().repetitions=0;

                $timeout(function() {
                              
                $scope.legalDzumer='dzumer_2';
                $scope.updateBallctrl='LEGAL';
                $scope.dzumAnimMode2.stop();
                $scope.dzumAnim.anims.throw_2.setDuration(0.5)
                $scope.dzumAnim.anims.throw_2.play().repetitions=0; $scope.dzumAnimMode2=$scope.dzumAnim.anims.throw_2;
                $scope.dzumer_2.lookAt(new THREE.Vector3($scope.pl_skltn.bones[5].matrixWorld.getPosition().x, 0, $scope.pl_skltn.bones[5].matrixWorld.getPosition().z));
              
                $timeout(function() {
                //this is where the thrust will happen
                $rootScope.mogustu.setLinearVelocity(new THREE.Vector3(1,1,1),pointVector);
                shootAtSoldier('head');
                $scope.updateBallctrl='NOT_LGL';
                $scope.dzumAnimMode2.stop();
               
                $scope.dzumAnim.anims.pose_2.play().repetitions='Infinite'; $scope.dzumAnimMode2=$scope.dzumAnim.anims.pose_2;
                
                $timeout(function(){dz2_throwExecution=false;},500);
              },500);
          },500);
    
            break;
      };  
  });

    
  //this guy simply checks if the ball is in the zone in question
  function isBallHere(zone){
      var isBallHere;

            if ($scope.activeZone.zone===zone) {
                isBallHere=true;
                return isBallHere;
            }

            return isBallHere=false;      
  };

  var ballSpeedTrap=0, UB_magnitude, UB_vx, UB_vy, UB_vz, UB_force=new THREE.Vector3(), UB_punch=new THREE.Vector3(0,-10,0), UB_ctrl= new THREE.Vector3(1,1,1);

  function updateBall(_delta){
      if ($scope.updateBallctrl==='LEGAL'){
          if ($scope.legalDzumer==='dzumer_1') {

             $rootScope.mogustu.__dirtyPosition=true;
            $rootScope.mogustu.position.copy($scope.dz_skltn_1.bones[24].matrixWorld.getPosition());            
            
          }else{

            $rootScope.mogustu.__dirtyPosition=true;
            $rootScope.mogustu.position.copy($scope.dz_skltn_2.bones[24].matrixWorld.getPosition());
          }
       };

       if ($rootScope.mogustu.position.y>400) {
             $rootScope.mogustu.setLinearVelocity(UB_punch);
             shootAtSoldier('_bouncer');  
       };

           UB_vx=Math.floor($rootScope.mogustu.getLinearVelocity().x);
           // UB_vy=Math.floor($rootScope.mogustu.getLinearVelocity().y);
           UB_vz=Math.floor($rootScope.mogustu.getLinearVelocity().z);

          //We removed the y coordinate so that it will calculate only a two dimentional speed with regards to x and z axes.
          UB_magnitude=Math.sqrt(Math.abs(UB_vx+UB_vz));

       if (UB_magnitude<=10) {

             ballSpeedTrap++

             //if the ball has had a linear velocity of less than 5 for 5 seconds or more we apply an impulse
             if (ballSpeedTrap>=180) {
               
                    UB_force.set(0,5,-$rootScope.mogustu.position.z);
                    UB_force.normalize(); // turn resultant into a unit vector
                    UB_force.multiplyScalar(15); //now give the unit vector some power by the power of whatever...
                    $rootScope.mogustu.applyImpulse(UB_force,UB_ctrl);
                    
                ballSpeedTrap=0;
            }
      }
      
  };

  function shootAtSoldier(option){

    var pos={};
    var offset=new THREE.Vector3(1,1,1);
    var force;

    switch(option){
      case 'foot':
        pos.x=($scope.pl_skltn.bones[5].matrixWorld.getPosition().x-$rootScope.mogustu.position.x);
        pos.y=($scope.pl_skltn.bones[5].matrixWorld.getPosition().y-$rootScope.mogustu.position.y);
        pos.z=($scope.pl_skltn.bones[5].matrixWorld.getPosition().z-$rootScope.mogustu.position.z);

        force=new THREE.Vector3(pos.x,pos.y,pos.z);

        force.normalize(); // turn resultant into a unit vector
        force.multiplyScalar(bl_speed_1); //now give the unit vector some power by the power of whatever...

        $rootScope.mogustu.setLinearVelocity(new THREE.Vector3(0,0,0));
        $rootScope.mogustu.applyImpulse(force, offset);
        $timeout(function(){
          force.multiplyScalar(bl_speed_1);
           $rootScope.mogustu.setLinearVelocity(force);
        },50);

      break;
      case 'head':
        pos.x=($scope.pl_skltn.bones[10].matrixWorld.getPosition().x-$rootScope.mogustu.position.x);
        pos.y=($scope.pl_skltn.bones[10].matrixWorld.getPosition().y-$rootScope.mogustu.position.y);
        pos.z=($scope.pl_skltn.bones[10].matrixWorld.getPosition().z-$rootScope.mogustu.position.z);

        force=new THREE.Vector3(pos.x,pos.y,pos.z);

        force.normalize(); // turn resultant into a unit vector
        force.multiplyScalar(bl_speed_1); //now give the unit vector some power by the power of whatever...

        $rootScope.mogustu.setLinearVelocity(new THREE.Vector3(0,0,0));
        $timeout(function(){
          force.multiplyScalar(bl_speed_2);
           $rootScope.mogustu.setLinearVelocity(force);
        },50);
       
      break;
      case '_bouncer':
        pos.x=($scope.dz_skltn_2.bones[5].matrixWorld.getPosition().x-$rootScope.mogustu.position.x);
        pos.y=($scope.dz_skltn_2.bones[5].matrixWorld.getPosition().y-$rootScope.mogustu.position.y);
        pos.z=($scope.dz_skltn_2.bones[5].matrixWorld.getPosition().z-$rootScope.mogustu.position.z);

        force=new THREE.Vector3(pos.x,pos.y,pos.z);

        force.normalize(); // turn resultant into a unit vector
        force.multiplyScalar(30); //now give the unit vector some power by the power of whatever...

        $rootScope.mogustu.setLinearVelocity(new THREE.Vector3(0,0,0));
        $rootScope.mogustu.applyImpulse(force, offset);
      break;

      case 'power_bouncer':

        pos.x=($scope.pl_skltn.bones[5].matrixWorld.getPosition().x-$rootScope.mogustu.position.x);
        pos.y=($scope.pl_skltn.bones[5].matrixWorld.getPosition().y-$rootScope.mogustu.position.y);
        pos.z=($scope.pl_skltn.bones[5].matrixWorld.getPosition().z-$rootScope.mogustu.position.z);

        force=new THREE.Vector3(pos.x,pos.y,pos.z);

        force.normalize(); // turn resultant into a unit vector
        force.multiplyScalar(10); //now give the unit vector some power by the power of whatever...
        $rootScope.mogustu.applyImpulse(force, offset);
      break;
    }
};

  $scope.abort_zonal_missions=function(){
        $scope.zone_2_ops=false;
        $scope.zone_3_ops=false;
        //calling this should cease all zonal operations
  };

  $scope.zone_regularizer=function(_newDelta){
      //this function will check how long mogustu has been in one zone;
      //based on what level of the game it is we will set different rules for how long the ball can be in that region
  };

  function getQuadrant(x,z){
      var quadrant;
        if (x>=0 && z>=0){return quadrant='I'};
        if (x>=0 && z<0){return quadrant='II'};
        if (x<0 && z<0){return quadrant='III'};
        if (x<0 && z>=0){return quadrant='IV'};
        // return quadrant;
  };

  var pl_runPermit=false;
  var TR_force=new THREE.Vector3();

  function tinRetriever(vector, name){
        var pos={}, offset={x:0,y:0,z:0};
        pos.x=(-vector.x);
        pos.y=(-vector.y);
        pos.z=(-vector.z);

        TR_force.set(pos.x,pos.y,pos.z);

        TR_force.normalize(); // turn resultant into a unit vector
        TR_force.multiplyScalar(1.1); //now give the unit vector some power by the power of whatever...

        switch(name){

        case '1':
        $rootScope.makt_dynamic._koti_01.setLinearVelocity(pointVector);
        $rootScope.makt_dynamic._koti_01.applyImpulse(TR_force, offset);
        break;

        case '2':
        $rootScope.makt_dynamic._koti_02.setLinearVelocity(pointVector);
        $rootScope.makt_dynamic._koti_02.applyImpulse(TR_force, offset);
        break;

        case '3':
        $rootScope.makt_dynamic._koti_03.setLinearVelocity(pointVector);
        $rootScope.makt_dynamic._koti_03.applyImpulse(TR_force, offset);
        break;

        case '4':
        $rootScope.makt_dynamic._koti_04.setLinearVelocity(pointVector);
        $rootScope.makt_dynamic._koti_04.applyImpulse(TR_force, offset);
        break;

        case '5':
        $rootScope.makt_dynamic._koti_05.setLinearVelocity(pointVector);
        $rootScope.makt_dynamic._koti_05.applyImpulse(TR_force, offset);
        break;
        }
  };

    var tMa,tMb,tMc,tMd,tMe;
    const unitVector=new THREE.Vector3();
    const unitUpVec=new THREE.Vector3(0,1,0);
function tinMonitor(){

    if($rootScope.makt_dynamic._koti_05.position.distanceTo($rootScope.scene.position)>620 && toPick!=='E' && canPick===false){
        
        tinRetriever($rootScope.makt_dynamic._koti_05.position, '5');
    };
        if($rootScope.makt_dynamic._koti_04.position.distanceTo($rootScope.scene.position)>620 && toPick!=='D' && canPick===false){
        tinRetriever($rootScope.makt_dynamic._koti_04.position, '4');
    };
        if($rootScope.makt_dynamic._koti_03.position.distanceTo($rootScope.scene.position)>620 && toPick!=='C' && canPick===false){
        tinRetriever($rootScope.makt_dynamic._koti_03.position, '3');
    };
        if($rootScope.makt_dynamic._koti_02.position.distanceTo($rootScope.scene.position)>620 && toPick!=='B' && canPick===false){
       tinRetriever($rootScope.makt_dynamic._koti_02.position, '2');
    };
        if($rootScope.makt_dynamic._koti_01.position.distanceTo($rootScope.scene.position)>620 && toPick!=='A' && canPick===false){
        tinRetriever($rootScope.makt_dynamic._koti_01.position, '1');
    };

    tMa=($rootScope.makt_dynamic._koti_01.position.y<4);
    tMb=($rootScope.makt_dynamic._koti_02.position.y<4);
    tMc=($rootScope.makt_dynamic._koti_03.position.y<4);
    tMd=($rootScope.makt_dynamic._koti_04.position.y<4);
    tMe=($rootScope.makt_dynamic._koti_05.position.y<4);

    if (tMa) {

      $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
      $rootScope.makt_dynamic._koti_01.position.y=10;
      $rootScope.makt_dynamic._koti_01.applyImpulse(unitUpVec,unitVector);

    };

   if (tMb) {

      $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
      $rootScope.makt_dynamic._koti_02.position.y=10;
      $rootScope.makt_dynamic._koti_02.applyImpulse(unitUpVec,unitVector);

    };

   if (tMc) {

      $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
      $rootScope.makt_dynamic._koti_03.position.y=10;
      $rootScope.makt_dynamic._koti_03.applyImpulse(unitUpVec,unitVector);

    }

   if (tMd) {
      $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
      $rootScope.makt_dynamic._koti_04.position.y=10;
      $rootScope.makt_dynamic._koti_04.applyImpulse(unitUpVec,unitVector);
 
    }

   if (tMe) {
      $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
      $rootScope.makt_dynamic._koti_05.position.y=10;
      $rootScope.makt_dynamic._koti_05.applyImpulse(unitUpVec,unitVector);
    };   


    // *****************************************************************************************************************************************
    theWatcher.canViewUpdateCall($scope);
    theWatcher.canCtrlValMonitor($scope);

};

$scope.canPack=null;
$scope.canDuty=null;


$scope.swopPlayerPan=function(){
    //open modul
     $rootScope.restorer=true;
     $ionicLoading.show();
     $ionicModal.fromTemplateUrl('swopPlayerMod.html', {scope: $scope}).then(function(modal){
          $scope.swopPlayerMod=modal;
          $ionicLoading.hide();
          $scope.swopPlayerMod.show();
      });
};

$scope.swopModBtn=false;
$scope.cancelSwopPlayer=function(){$scope.swopPlayerMod.hide(); $timeout(function(){$scope.swopPlayerMod.remove();},200); $scope.swopModBtn=false;};

$scope.doSwopPlayer=function(player){
  //swop players


  if (player.locked) {
    if ($rootScope.vibratos) {navigator.vibrate(200)};
  }else{
   
    $scope.swopModBtn=true;

    var squad=storageService.get('player_arr');
        squad.forEach(function(disqualified_member){

            if (disqualified_member.name==$rootScope.sessobj.livePlayer.name) {
                $rootScope.sessobj.legalPlayers.push(disqualified_member);
            };
        });

    //we put a delay in the execution of this because we don't want the scope to update the view instantly, it wouldn't look nice
    // $timeout(function(){
      var i = 0;
      var k = $rootScope.sessobj.legalPlayers.length;
      var d = undefined;

      for(i; i<k; i++){
          if (player.name===$rootScope.sessobj.legalPlayers[i].name) {d=i};
      }

      if ($rootScope.sessobj.legalPlayers[d] !== undefined) {$rootScope.sessobj.legalPlayers.splice(d,1)}

    // },300);

    $rootScope.sessobj.livePlayer=player;

   if ($rootScope.sessobj.livePlayer.quals.speed<=30) { plSpeed=3.5;};
   if ($rootScope.sessobj.livePlayer.quals.speed>30 && $rootScope.sessobj.livePlayer.quals.speed<=60) { plSpeed=5;};
   if ($rootScope.sessobj.livePlayer.quals.speed>60) { plSpeed=6.5;};

    $rootScope.scene.remove($rootScope.sessobj.firstPlayer);
    $rootScope.scene.remove($scope.pl_skltn);
    
    delete $rootScope.sessobj.firstPlayer;
    delete $scope.playerAnim;

    $timeout(function(){

        $rootScope.sessobj.firstPlayer=utilityFctr.gimmeThePlayer(player.name+'_ms');
        $rootScope.sessobj.firstPlayer.scale.set(3,3,3);
        $rootScope.sessobj.firstPlayer.position.set(-120,0,-150);
        $rootScope.sessobj.firstPlayer.rotation.y=0;
        $rootScope.scene.add($rootScope.sessobj.firstPlayer);

        $scope.pl_skltn = new THREE.SkeletonHelper( $rootScope.sessobj.firstPlayer );
        $scope.pl_skltn.visible = false;
        $rootScope.scene.add($scope.pl_skltn);

        $scope.playerAnim=activeSessionFactory.playerAnimInit($rootScope.sessobj.firstPlayer);
        $scope.pl_animMode=$scope.playerAnim.anims.pose;    
        $scope.playerAnim.anims.pose.play().repetitions='Infinite';
        $scope.playerAnim.pl_anim.addEventListener('finished',onAnimFinished, false);

         //graphics loader
        $scope.cancelSwopPlayer();
        if ($scope.quickMenuPop) {
            $scope.quickMenuPop.hide();
            $scope.quickMenuPop.remove();
        };
        
        pauseSession='off'
        $scope.activeZone={};
        $scope.greenshot=true;
        activeSessionFactory.massMesser('loose_drop', toPick);

        $scope.onoMarks={sec:4,milSec:0};

        vertVal=1350;
        timerValid=false;

        $rootScope.home6.visible=true; $rootScope.scene.add($rootScope.home6);
        $rootScope.home7.visible=true; $rootScope.scene.add($rootScope.home7);
        $rootScope.home8.visible=true; $rootScope.scene.add($rootScope.home8);
        $rootScope.home9.visible=true; $rootScope.scene.add($rootScope.home9);
        $rootScope.home10.visible=true; $rootScope.scene.add($rootScope.home10);

    },200);
  }        
};

/************************************************* PLAYER MOVEMENT LOGIC *********************************************************************/
var funkyButton=$('#funkyBtn');
    funkyButton.css({top: 40, left: 40});
    funkyButton.draggable({ containment: '#funkyBtnHolder' });

var navBtn='';
$scope.fixedBtnNav=function(fn){
    navBtn=fn;
    _dragIsLegal=true;
       //this fixes a player.rotation problemo we once had
    $rootScope.sessobj.firstPlayer.quaternion.set(0,0,0,1); 
};

$scope.releaseBtnNav=function(){
  abortPlayerMovement();
};

function abortPlayerMovement(){

      pl_runPermit=false;

    if ($scope.playerAnim.anims.run.isRunning) {
      $scope.playerAnim.anims.run.stop();
    };

    if ($scope.pl_animMode._clip.name!=='Pose_cycle') {
      $scope.pl_animMode.stop();
      $scope.playerAnim.anims.pose.play().clampwhenFinished=true;
    }

    _dragIsLegal=false;
    navBtn='';
};

var CD_coords;

function checkDrags(){
  // && dz2_throwExecution==false && dz1_throwExecution==false
    if (_dragIsLegal){
      
  
      switch(navBtn){
          case 'analog':
            CD_coords=normalizeAnalogPosition(funkyButton.position(), $rootScope.sessobj.firstPlayer.rotation.y);
          break;
      };

      playerTurner(CD_coords.set_B);
      movePlayer(CD_coords.set_A);
   
   };
};
function onPrintTouch(e){

    e.preventDefault();
    funkyButton.css({top: 40, left: 40});

    abortPlayerMovement();

}

 function onPrintLift(e){

   //this fixes a player.rotation problemo we once had
    $rootScope.sessobj.firstPlayer.quaternion.set(0,0,0,1);    

    e.preventDefault();
    if ($rootScope.vibratos) {navigator.vibrate(50)};
    navBtn='analog';
    _dragIsLegal=true;

}

document.getElementById('funkyBtn').addEventListener('touchend', onPrintTouch, false);
document.getElementById('funkyBtn').addEventListener('touchstart',onPrintLift, false);

var ballInViewPortTimer=0;
var LCMM_x,LCMM_y,LCMM_z, LFPM_x,LFPM_y,LFPM_z, LFFM_x, LFFM_y, LFFM_z;
var UCM_x, UCM_y, UCM_z;
var UC_PL_CTRL=$rootScope.sessobj.firstPlayer.position;
//LCMM_ - Legal Can Mogustu Midpoint lex
//LFPM_ = LCMM First Player Midpoint ax
//LFFM_ = LFPM First Player Midpoint fax


function updateCamera(){

 if (varDir=='up') {

  if (vertVal>450) {

      sessionGraphicsLauncher();

//the code below was used to take snap shots for the purposes of reaching out to advertisers

       // $rootScope.camera.position.x=1000; 
       // $rootScope.camera.position.z=-300; 
       // $rootScope.camera.position.y=400;
       // $rootScope.camera.lookAt(new THREE.Vector3(-1100,0,-400));


       // $scope.greenshot=false;

     }else{

      worlds.removeUnwantedHouses();
       timerValid=true;
       guardian.set($rootScope.sessobj.firstPlayer.position.x, 150, $rootScope.sessobj.firstPlayer.position.z);

        LCMM_x=$rootScope.mogustu.position.x/2;
        LCMM_y=$rootScope.mogustu.position.y/2;
        LCMM_z=$rootScope.mogustu.position.z/2;
        // LCMM_x=(legalCan.position.x+$rootScope.mogustu.position.x)/2;
        // LCMM_y=(legalCan.position.y+$rootScope.mogustu.position.y)/2;
        // LCMM_z=(legalCan.position.z+$rootScope.mogustu.position.z)/2;

        LFPM_x=(LCMM_x+UC_PL_CTRL.x)/2;
        LFPM_y=(LCMM_y+UC_PL_CTRL.y)/2;
        LFPM_z=(LCMM_z+UC_PL_CTRL.z)/2;

        LFFM_x=(LFPM_x+UC_PL_CTRL.x)/2;
        LFFM_y=(LFPM_y+UC_PL_CTRL.y)/2;
        LFFM_z=(LFPM_z+UC_PL_CTRL.z)/2;

       $rootScope.camera.lookAt(new THREE.Vector3(LFFM_x, 150, LFFM_z));
     
     if (guardian.distanceTo($rootScope.camera.position)>1100 && $rootScope.sessobj.firstPlayer.position.x<300 && $rootScope.camera.position.x>0) {
         
          $rootScope.camera.position.x-=(plSpeed);
      }

      if (guardian.distanceTo($rootScope.camera.position)<=750) {
            
         $rootScope.camera.position.x+=(plSpeed);          
      }

        $rootScope.camera.position.z=LFFM_z;
    }
  };

  //the line below will keep track of the camera's angle from origion
  // transformationAngle=getPropperAngle($rootScope.camera.position.x, $rootScope.camera.position.z);  

  //this will update the position of the marker, we put it in the camera because we want it to always be up to date since this camera runs without many conditions and permisions
  plMarkCtrl.set($scope.pl_skltn.bones[10].matrixWorld.getPosition().x,$scope.pl_skltn.bones[10].matrixWorld.getPosition().y+50,$scope.pl_skltn.bones[10].matrixWorld.getPosition().z);
  $rootScope.pl_mark.position.copy(plMarkCtrl);  
};

var knobRadius;
var MP_mgX, MP_mgY, MP_mgZ, MP_headNx, MP_headNz, MP_plDir;

function movePlayer(args){

  knobRadius=Math.sqrt((Math.pow(args.x, 2))+(Math.pow(args.z, 2)));
  
  if (knobRadius>=10) {

    pl_runPermit=true;

     MP_mgX=$rootScope.sessobj.firstPlayer.position.x;
     MP_mgY=$rootScope.sessobj.firstPlayer.position.y;
     MP_mgZ=$rootScope.sessobj.firstPlayer.position.z;

     MP_headNx=$rootScope.sessobj.firstPlayer.position.distanceTo(new THREE.Vector3(0,MP_mgY,MP_mgZ));
     MP_headNz=$rootScope.sessobj.firstPlayer.position.distanceTo(new THREE.Vector3(MP_mgX,MP_mgY,0));

    if (MP_headNx<=600 && MP_headNz<= 750) {

        MP_plDir=new THREE.Vector3(-args.x,0,-args.z);
            MP_plDir.normalize();

            $rootScope.sessobj.firstPlayer.translateOnAxis(MP_plDir, plSpeed);     
            

            if (pl_runPermit) {
               if ($scope.playerAnim.anims.pose.isRunning) {
                 $scope.playerAnim.anims.pose.stop();
               };

                $scope.pl_animMode=$scope.playerAnim.anims.run;
                $scope.playerAnim.anims.run.play().repetitions='Infinite';
            };

    }else{
      //because we have restricted the player's movements beyond certain borders, which in turn, jams the joystick,
      //this will help us get the player back in the draggable space.

      switch(getQuadrant(MP_mgX, MP_mgZ)){

          case 'I':   $rootScope.sessobj.firstPlayer.position.set(MP_mgX-10,0,MP_mgZ-10); break;
          case 'II':  $rootScope.sessobj.firstPlayer.position.set(MP_mgX-10,0,MP_mgZ+10); break;
          case 'III': $rootScope.sessobj.firstPlayer.position.set(MP_mgX+10,0,MP_mgZ+10); break;
          case 'IV':  $rootScope.sessobj.firstPlayer.position.set(MP_mgX+10,0,MP_mgZ-10); break;    
      }
    }

  }else{
    pl_runPermit=false;
    $scope.playerAnim.anims.run.stop();

    if ($scope.pl_animMode._clip.name!=='Pose_cycle') {
      $scope.pl_animMode.stop();
      $scope.playerAnim.anims.pose.play().clampwhenFinished=true;
    }
  };
};

var PT_dist;
function playerTurner(args){
  //this function basically turns the player around based on the direction that he is moving in but this happens under
  //certain conditions: the player can only turn around after he/she has moved a certain direction.
  PT_dist=pl_turnCtrlPoint.distanceTo($rootScope.sessobj.firstPlayer.position);
  if (PT_dist>=0.05){

        pl_turnCtrlPoint.set($rootScope.sessobj.firstPlayer.position.x,0,$rootScope.sessobj.firstPlayer.position.z);
        $rootScope.sessobj.firstPlayer.rotation.y=Math.abs((Math.atan2(args.x,args.z)+Math.PI));
  };
};

var plMarkCtrl=new THREE.Vector3();

var coordinates={};
function normalizeAnalogPosition(args, angl){

      coordinates.set_A={x:0, z:0};
      coordinates.set_B={x:0, z:0};

    
      coordinates.set_A.x=-((args.left+20)-60)*Math.sin(angl)+(-(args.top+20)+60)*Math.cos(angl);
      coordinates.set_A.z=((args.left+20)-60)*Math.cos(angl)+(-(args.top+20)+60)*Math.sin(angl);

      coordinates.set_B.x=-((args.left+20)-60)*Math.sin(0)+(-(args.top+20)+60)*Math.cos(0);
      coordinates.set_B.z=((args.left+20)-60)*Math.cos(0)+(-(args.top+20)+60)*Math.sin(0);

      return coordinates;
};


/**************************************************************************************************************************************/
/****************************************************** PLAYER MOVEMENT LOGIC ENDS HERE ***********************************************/
/**************************************************************************************************************************************/
/****************************************************** THE GAME SESSION ADMINISTRATION ***********************************************/
/**************************************************************************************************************************************/

function showCamContents(object){
    
    var frustum = new THREE.Frustum();
    var cameraViewProjectionMatrix = new THREE.Matrix4();
    var isItInCam=false;
    // every time the camera or objects change position (or every frame)

    $rootScope.camera.updateMatrixWorld(); // make sure the camera matrix is updated
    $rootScope.camera.matrixWorldInverse.getInverse( $rootScope.camera.matrixWorld );
    cameraViewProjectionMatrix.multiplyMatrices( $rootScope.camera.projectionMatrix, $rootScope.camera.matrixWorldInverse );
    frustum.setFromMatrix( cameraViewProjectionMatrix );

    // frustum is now ready to check all the objects we need
    isItInCam=frustum.intersectsObject(object);
    return isItInCam; 
};

$rootScope.newHealthNum=0;
function resetStage(mins){

        $scope.onoMarks={sec:4,milSec:0};
        $scope.activeZone={};
        $scope.greenshot=true;
        activeSessionFactory.massMesser('loose_drop', toPick);
        $rootScope.sessobj.firstPlayer.rotation.y=0;

        utilityFctr.tinStarterPack();
        chingwiiCounter=0;
        canPlacement=0;
        $rootScope.playerReleased=false;
        $rootScope.lifeAdded=false;
        $rootScope.newHealthNum=0;

        $rootScope.bonus=0;
        $rootScope.levelScore=0;
        
        $rootScope.sessobj.sessTimer=sessTimer={min:mins,sec:0,milSec:0};
        $rootScope.sessobj.allocatedTime=mins; 

        vertVal=1350;
        timerValid=false;
};

var vertVal=1350;
var legalCan=$rootScope.makt_dynamic._koti_05;
var pl_quad;    
var pl_quadCtrl;
var guardian=new THREE.Vector3();

$scope.greenshot=true;

function sessionGraphicsLauncher(){

      vertVal=vertVal-5;

      step+=0.0355;
   
      $rootScope.camera.position.x=Math.cos(step)*1000;
      $rootScope.camera.position.z=Math.sin(step)*1000;
      $rootScope.camera.position.y=vertVal;


      $rootScope.camera.lookAt(new THREE.Vector3(0, -100, 0));

      if ($scope.onoMarks.milSec===0 && $scope.onoMarks.sec>0) {

          $scope.onoMarks.sec--;
          $scope.onoMarks.milSec=59;
          $scope.loading_msg=$scope.onoMarks.sec;


      }else{

        if ( $scope.onoMarks.sec===0){
          $scope.loading_msg='abashwe!';
          

            var force=(new THREE.Vector3(0,5,40)).normalize();
            var revFo=(new THREE.Vector3(0,5,-40)).normalize();

            force.multiplyScalar(30);
            revFo.multiplyScalar(10);
            
            if ($rootScope.restorer===false) {$rootScope.makt_dynamic._koti_05.applyImpulse(revFo,new THREE.Vector3(0,0,0));}            
            $rootScope.mogustu.applyImpulse(force,new THREE.Vector3(0,0,0));

            $timeout(function(){
            $scope.loading_msg='';
            $scope.greenshot=false; 
          },1300);
        }
      }
    
      $scope.onoMarks.milSec--;  
      timerValid=false;
      $scope.$apply();
}

  function getPropperAngle(x,z){
      var angle=null;
      var quadrant=getQuadrant(x,z);

      switch(quadrant){
        case 'I':
          angle=(Math.PI/2)-(Math.atan2(Math.abs(x),Math.abs(z)));
        break;
        case 'II':
          angle=(Math.PI/2)-(Math.atan2(x,z));
        break;
        case 'III':
          angle=((Math.PI/2)-(Math.atan2(Math.abs(x),Math.abs(z))))+(Math.PI);
        break;
        case 'IV':
          angle=((Math.PI/2)-(Math.atan2(x,z)));
        break;
      }
      
      return angle;
  };

$scope.playCam=function(){

   if (varDir=='down') {
        varDir='up';
   }else{
        varDir='down';
   }
};

$scope.varDir=false;

$scope.pause_=function(){ 

    if (pauseSession==='off') {
  
       clock.stop();
       pauseSession='on';
    }else{

      clock.start();
      pauseSession='off';
    }
};

$scope.showHideStats=function(){

    if($scope.showStats){
        $scope.showStats=false;
        return;
    }

      $scope.showStats=true;
}

const boodskapEmpty=($scope.RUNTIME_MSG=='' && $scope.moj1==false && $scope.moj2==false && $scope.moj3==false && $scope.moj4==false && $scope.moj5==false && $scope.moj6==false && $scope.moj7==false && $scope.moj8==false && $scope.moj9==false && $scope.moj10==false && $scope.moj11==false && $scope.moj12==false && $scope.moj13==false && $scope.moj14==false && $scope.moj15==false && $scope.moj16==false && $scope.moj17==false);

function _hitDetector(){

  if ($rootScope.sessobj.health.h1) {

           ballTofeet=$rootScope.mogustu.position.distanceTo($scope.pl_skltn.bones[5].matrixWorld.getPosition());
           ballTohead=$rootScope.mogustu.position.distanceTo($scope.pl_skltn.bones[10].matrixWorld.getPosition());
           balltoChest=$rootScope.mogustu.position.distanceTo($scope.pl_skltn.bones[8].matrixWorld.getPosition());

           if (ballTofeet<=15 || ballTohead<=25 || balltoChest<=25) {

              if ($scope.bloodshot===false) {
                $rootScope.sessobj.hits++;
                utilityFctr.calculateHealth();

              }

              $scope.bloodshot=true;
              if ($rootScope.vibratos) {navigator.vibrate(500)};
              if (boodskapEmpty) { $scope.RUNTIME_MSG='Ouch, hade ntwana...'; $scope.moj16=true;}
              
              $timeout(function(){if($scope.RUNTIME_MSG=='Ouch, hade ntwana...'){$scope.RUNTIME_MSG=''}; $scope.moj16=false;}, 2000);
              $timeout(function(){$scope.bloodshot=false;},850);
           
           }else{
            // 
            if ($scope.bloodshot===false) {

              switch($scope.pl_animMode._clip.name){
                  case 'chigago_std':
                      if ( ballTofeet<=70 && ballTofeet>15) {
                        $rootScope.sessobj.score+=(10*influencer);
                        $rootScope.levelScore+=(10*influencer);
                    };
                  break;  
                  case 'frog_squat':
                    if (ballTohead<=40 && ballTohead>25) {
                      $rootScope.sessobj.score+=(10*influencer);
                      $rootScope.levelScore+=(10*influencer);
                    };
                  break;
                  case 'grab':
                     if (ballTohead<=40 && ballTohead>25) {
                      $rootScope.sessobj.score+=(10*influencer);
                      $rootScope.levelScore+=(10*influencer);
                    };
                  break;
                  }
              }
          }
   }else{
      var title='Game over!';

   if (pauseSession=='off') {$scope.gameOverQue(title); $scope.gameOVER=true;};      
         pauseSession='on';      
   }

};

var sessTimer=$rootScope.sessobj.sessTimer;
$scope._timer_=function(){
  //delta is not used here... but the reason it is brought in is because all functions that run in the animation loop have the clock delta passed to them just in case it might be neccessary to use it at some point during development.

if (timerValid) {

        if (sessTimer.sec===0 && sessTimer.min>0) {

            sessTimer.min--
            sessTimer.sec=59;
        };

        if (sessTimer.milSec===0 && sessTimer.sec>0) {

            sessTimer.sec--;
            sessTimer.milSec=59;
        };        

        sessTimer.milSec--

        if (sessTimer.milSec===0 && sessTimer.sec===0 && sessTimer.min ===0) {
            timerValid=false;

            if (pauseSession=='off') {$scope.gameOverQue('Your time is up'); $scope.timeUP=true; activeSessionFactory.massMesser('loose_drop', toPick);};      
               pauseSession='on';  
        }
    }
};

//this calculates the chigago to see if it was done at the correct place and if all the cans are packed when it happens, if all is well it fires the chigago event which then prompts the app to go to the next stage if all the requiements are met.
function chingwii(){

      var _1,_2,_3,_4,_5,condition=null;

      _1=($rootScope.makt_dynamic._koti_05.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_05.position.y,z:0})<=30 && ($rootScope.makt_dynamic._koti_05.position.y<=8))
      _2=($rootScope.makt_dynamic._koti_04.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_04.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_04.position.y<=22))
      _3=($rootScope.makt_dynamic._koti_03.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_03.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_03.position.y<=35))
      _4=($rootScope.makt_dynamic._koti_02.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_02.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_02.position.y<=50))
      _5=($rootScope.makt_dynamic._koti_01.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_01.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_05.position.y<=60))
      
          var m,t,y2,x2,y1,x1, a,b,c ,dd1,dd2;
              y2=$rootScope.sessobj.firstPlayer.position.x;
              x2=$rootScope.sessobj.firstPlayer.position.z;
              y1=chingwiiCoords_1.x;
              x1=chingwiiCoords_1.z;
              m=(y2-y1)/(x2-x1);
              t=y2-(m*x2);
              
              a=Math.pow(m,2)+1;
              b=2*m*t;
              c=Math.pow(t,2)-900;

              //the distance between p1 and p2 of the player before and after chigago is roughly 115.1
              //for the chingwii to be legit, both p1 and p2 have to be within a certain distance from the origion
              dd1=$rootScope.scene.position.distanceTo(new THREE.Vector3(y1,0,x1));
              dd2=$rootScope.scene.position.distanceTo(new THREE.Vector3(y2,0,x2));

              var DISCRIMINANT_TEST=Math.pow(b,2)-(4*a*c)>0
              var RESTRICTION_TEST=(dd1<150 && dd2<150);

              if (DISCRIMINANT_TEST && RESTRICTION_TEST) {
                if ( _1 && _2 && _3 && _4 && _5) {

                  $scope.chigagoooo();

                }else{
             
                  $scope.RUNTIME_MSG='All the cans must be stacked first...'; $scope.moj12=true;
                  $timeout(function(){
                    if($scope.RUNTIME_MSG==='All the cans must be stacked first...'){
                      $scope.RUNTIME_MSG=''};
                      $scope.moj12=false; 
                    },3000);
             }
          }else{

              if ($rootScope.sessobj.firstPlayer.position.distanceTo(new THREE.Vector3())<=200 && $rootScope.makt_dynamic._koti_01.position.y>35) {
                   $scope.RUNTIME_MSG='Woops, you missed the circle...'; $scope.moj13=true; 
                  $timeout(function(){
                    if($scope.RUNTIME_MSG==='Woops, you missed the circle...'){
                      $scope.moj13=false;
                      $scope.RUNTIME_MSG=''
                    }
                  },3000);
              };
         }
};


//this event is fired when player jumps over properly stacked cans.
$scope.chigagoooo=function(){
    chingwiiCounter++ 

    var stage=utilityFctr.stringCaster($rootScope.sessobj.stage);
    if (stage===1 || stage===2 || stage===3 || stage===4 || stage===5) {

      theWatcher.changeStage($rootScope.sessobj, resetStage, calculateBonus, $scope.pause_, $scope.saveCurrentSession, CHAR_REBOOT);
            

      return;
    };

    if(stage===6 || stage===7 || stage===8 || stage===9 || stage===10){

      if (chingwiiCounter<2) {
        $scope.RUNTIME_MSG='Nicely done, now jump one more time';$scope.moj11=true;
        $timeout(function(){if($scope.RUNTIME_MSG==='Nicely done, now jump one more time'){$scope.RUNTIME_MSG='';$scope.moj11=false;}},3200);
      }else{
        theWatcher.changeStage($rootScope.sessobj, resetStage, calculateBonus, $scope.pause_, $scope.saveCurrentSession, CHAR_REBOOT);
       
      }

      return;
    }

    if (stage===11 || stage===12 || stage===13 || stage===14 || stage===15) {

        if (chingwiiCounter<3) {
          $scope.RUNTIME_MSG='Nicely done, now jump one more time'; $scope.moj1=true; 
          $timeout(function(){if($scope.RUNTIME_MSG==='Nicely done, now jump one more time'){$scope.RUNTIME_MSG='';  $scope.moj1=false;}},3200);
        }else{

          theWatcher.changeStage($rootScope.sessobj, resetStage, calculateBonus, $scope.pause_, $scope.saveCurrentSession, CHAR_REBOOT);         
        }

      return;
    }
};

function calculateBonus(status){

    //remnant is the number of remaining seconds;
    var remnant=($rootScope.sessobj.sessTimer.sec)+($rootScope.sessobj.sessTimer.min*60);
    var bonus=1;

    switch(status){
        case 'next_level':
          //bonus will be 
          bonus=(Math.ceil(remnant)+(utilityFctr.healthNumValue($rootScope.sessobj.health)*10))+(canPlacement);

        break;
        case 'levels_done':
          //overall bonus
          //bonuses from all levels times 2;
          $rootScope.sessobj.lvls.forEach(function(lvlStats){
               bonus=+lvlStats.lvlBonus;
          });

        break;
        case 'game_over':
          //bonus will be the number of single can placements
          bonus=canPlacement*100;
          // $rootScope.sessobj.lvls=[{lvl:1, lvlScore:0, lvlBonus:0}];
        break;
    };

    bonus=bonus+(($rootScope.levelScore*1)/10);

    // if (bonus==NaN || bonus==undefined || bonus==null) {bonus=1};
    return Math.floor(bonus);
};



  $scope.resumeSession=function(){
      $scope.quickMenuPop.hide();
      clock.start();
      pauseSession='off';
  };

  $timeout(function(){
      var play_pane=document.getElementById('play-pane');
        play_pane.addEventListener('touchstart', function(e){
            // e.preventDefault=true;      
                if ($scope.quickMenuPop && $scope.quickMenuPop._isShown===false && pauseSession==='on') {
                    clock.start();
                    pauseSession='off';
                };
           });
  },300);

function sessAbortHUD(fn){

var constitution=storageService.get('constitution');
    constitution.lastSelectedPlayer=$rootScope.sessobj.livePlayer.name;
    storageService.set('constitution', constitution);

    
    $rootScope.bonus=calculateBonus('game_over');
    $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;

  $ionicLoading.show({
    scope: $scope,
    template: `<span style="float: left; color: grey;">Stage Score :</span><strong class="balanced" style="float: right; margin-left: 15px;"> {{levelScore}}</strong><br>
               <span style="float: left; color: grey;">Performance bonus : </span><strong class="balanced" style="float: right;  margin-left: 15px;"> {{bonus}}</strong><br>
               <span style="float: left; color: grey;">Total Score :</span><strong class="balanced" style="float: right;  margin-left: 15px;"> {{sessobj.score}}</strong><br><br>
              <p class="confBtn" ng-click="SQH_btn()">Done</p>`
  });

    $scope.SQH_btn=function(){


          pauseSession='on';

         switch(fn){
            case 'startNewGame':
                $rootScope.runAdverts();
                $scope.saveCurrentSession('closed');
                $state.go('app.sessConfig');

            break;
            case 'quitDontSave':
                $scope.saveCurrentSession('closed');
                 output.remove($rootScope.renderer.domElement);
                 $state.go('app.home');
                // $rootScope.appShutdown();
            break;
        }

        CHAR_REBOOT();

        cancelAnimationFrame(requestID);
        output.removeChild($rootScope.renderer.domElement);
        delete $rootScope.sessobj;
         $ionicLoading.hide();
      };     
};

$scope.newGame=function(){
     activeSessionFactory.massMesser('loose_drop', toPick); 
       if ($scope.quickMenuPop._isShown){$scope.quickMenuPop.hide()};  

         $ionicLoading.show({
           scope: $scope,
           template: `
                      <h4 style="text-align: center; color: grey;">Are you sure you want to <br> abort the current session?</h4>
                        <div class="row"><p class="confBtn col" ng-click="NG_btns('yes')">Yeah</p><p class="confBtn col" ng-click="NG_btns('no')">Nah</p></div>
                      
           `
     })

     $scope.NG_btns=function(val){

       $ionicLoading.hide();
        switch(val){
          case 'yes': 

              $rootScope.bonus=calculateBonus('game_over');
              sessAbortHUD('startNewGame');
              
          break;
          case 'no':
            clock.start();
            pauseSession='off';
          break;
        }
     }
  };

  $scope.abortSession=function(){
           if ($scope.quickMenuPop._isShown){$scope.quickMenuPop.hide()};
           activeSessionFactory.massMesser('loose_drop', toPick);   
           $rootScope.runAdverts();
     $ionicLoading.show({
           scope: $scope,
           template: `
                        <h4 style="text-align: center; color: grey;">
                          <span>Would you like to<br> save this session<br> before leaving?</span>
                        </h4>
                        <div class="row"><p class="confBtn col" ng-click="AS_btns('yes')">Yeah</p><p class="confBtn col" ng-click="AS_btns('no')">Nah</p></div>
                      
                      `
     })

     $scope.AS_btns=function(val){

        $ionicLoading.hide();
        switch(val){
          case 'yes':    

            //save can configuration
              $rootScope.sessobj.canconfig={

                  k1: $rootScope.makt_dynamic._koti_01.position,
                  k2: $rootScope.makt_dynamic._koti_02.position,
                  k3: $rootScope.makt_dynamic._koti_03.position,
                  k4: $rootScope.makt_dynamic._koti_04.position,
                  k5: $rootScope.makt_dynamic._koti_05.position
              };

              $scope.saveCurrentSession('open');
              $state.go('app.home');
              // $rootScope.appShutdown();
              CHAR_REBOOT();
              output.removeChild($rootScope.renderer.domElement);
              delete $rootScope.sessobj;

          break;
          case 'no':
                $rootScope.bonus=calculateBonus('game_over');
                sessAbortHUD('quitDontSave');
          break;
        };
     };
  };

$scope.timeUP=false;
$scope.gameOVER=false;
$scope.gameOverQue=function(myTitle){

if (myTitle=='Game over!') {$rootScope.showLapsed=true}else{$rootScope.showLapsed=false};

var constitution=storageService.get('constitution');
constitution.lastSelectedPlayer=$rootScope.sessobj.livePlayer.name;
storageService.set('constitution', constitution);

$rootScope.bonus=calculateBonus('game_over');
$rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
activeSessionFactory.massMesser('loose_drop', toPick);
$scope.hudScore=$rootScope.sessobj.score;
$scope.popHeading=myTitle;
$scope.allocatedTimeForCalc=$rootScope.sessobj.allocatedTime-1;
if ($scope.quickMenuPop) {$scope.quickMenuPop.hide()};
$rootScope.runAdverts();

$ionicLoading.show({
     scope: $scope,
     template: `

       <div style=" padding: 0px; margin: 0px;">
       <h4 style="text-align: center; color: grey;">
         <i class="emoji moj15" ng-if="gameOVER"></i>
         {{popHeading}}
          <i class="emoji moj10" ng-if="timeUP"></i>
          <i class="emoji moj13" ng-if="gameOVER"></i>
       </h4>
       <span style="float: left; color: orange;">Stage Score :</span><strong class="balanced" style="float: right"> {{levelScore}}</strong><br>
       <span style="float: left; color: orange;">Performance bonus :</span><strong class="balanced" style="float: right"> {{bonus}}</strong><br>
       <span style="float: left; color: orange;">Total Score :</span><strong class="balanced" style="float: right"> {{sessobj.score}}</strong><br>
       <span ng-show="showLapsed==true"><span style="float: left; color: orange;">Lapsed time :</span><strong class="assertive" style="float: right; font-size: 1.1em;">
       <span style="min-width: 2em; max-width: 2em;"><span ng-if="(sessobj.allocatedTime-sessobj.sessTimer.min)<10">0</span>{{allocatedTimeForCalc-sessobj.sessTimer.min}}</span>
       <span style="min-width: 3px; max-width: 3px;">:</span>
       <span  style="min-width: 2em; max-width: 2em;"><span ng-if="60-sessobj.sessTimer.sec<10">0</span>{{60-sessobj.sessTimer.sec}}</span></strong><br></span>
       <h4 style="text-align: center; color: grey;">Would you like to play again?</h4></div><br>
       <p class="confBtn" style="display: inline; float: left; margin-left: 10%;" ng-click="GOQ_btns('yes')">Yeah</p><p class="confBtn" style="display: inline; float: right; margin-right: 10%;"  ng-click="GOQ_btns('no')">Nah</p>
       `
   });  
  
        
     $scope.GOQ_btns = function(val){

          $scope.saveCurrentSession('closed');
          CHAR_REBOOT();
          output.removeChild($rootScope.renderer.domElement);
          delete $rootScope.sessobj;
          $ionicLoading.hide();
          $rootScope.gmOvrTtl='';

          switch(val){
            case 'yes': $state.go('app.sessConfig'); break;
            case 'no' : $state.go('app.home'); break;
        };
      };

};

/**************************************************************************************************************************************/
/***************************************************** THE GAME LAW ENFORCEMENT ANGENCY ***********************************************/
/**************************************************************************************************************************************/

function animate(){
    requestID=undefined;

     try{

        $rootScope.renderer.render($rootScope.scene, $rootScope.camera, null, true);

      }catch(err){
              
              $ionicLoading.show({
              scope: $rootScope,
              template: `<div align="center" >
                            <div class="item item-thumbnail-left" style="background-color: transparent; padding-top: 20px;">
                              <img src="img/stopNosonso.png">
                                <h4 style="text-align: center; color: white;">  
                                     Woops, looks like Chigago hit a serious snag.<br>
                                     You're gonna have to reset the app...<br>
                                     Sorry for the inconvenience...                                
                                </h4>
                            </div><br>
                              <p class="confBtn" ng-click="ContextLost_btn('yes')">Reset</p>
                          </div>
                        `   
            }).then(function(){
               pauseSession='on';
          })
      };
  
    if (pauseSession==='off') {

      frameDelta +=clock.getDelta();
      while(frameDelta >= INV_MAX_FPS){
           
             updateCamera();/*loop declarations cleared*/
             $scope.dzumAnim.dz_anim_1.update(INV_MAX_FPS);
             $scope.dzumAnim.dz_anim_2.update(INV_MAX_FPS);
             $scope.playerAnim.pl_anim.update(INV_MAX_FPS); 

           if (timerValid) {
                 
                 $scope.dz_skltn_1.update(INV_MAX_FPS); 
                 $scope.dz_skltn_2.update(INV_MAX_FPS);
                 $scope.pl_skltn.update(INV_MAX_FPS);

                 $scope.zone_detector(); /*loop declarations cleared*/
                 updateDzumer1(); /*loop declarations cleared*/
                 updateDzumer2(); /*loop declarations cleared*/
                 checkDrags(); /*loop declarations cleared*/
                 $scope._timer_(); /*loop declarations cleared*/

                 updateBall(); /*loop declarations cleared*/
                 _hitDetector(); /*loop declarations cleared*/
                 canDragger(toPick); /*loop declarations cleared*/
                 tinMonitor();  /*loop declarations cleared*/
                 $scope.$apply();
            
                 //we were just playing around to see which one gave best performance results, we left it undecided
                 $rootScope.scene.simulate(INV_MAX_FPS/60, frameDelta);  
              }          

          frameDelta-= INV_MAX_FPS;
      };
          
           // stats.update();
    };
    if (!requestID){requestID=$window.requestAnimationFrame(animate)};
  }; 

});


})();

