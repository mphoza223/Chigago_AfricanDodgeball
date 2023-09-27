(function(){

chigago.factory('utilityFctr',function($base64,storageService,$ionicPopup,$timeout,$rootScope, $ionicLoading, $window,activeSessionFactory){
    return{

  loadingPop: function(sec){
          var seconds=(sec*1000);
              $ionicLoading.show({
        scope: $rootScope,
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
    });
            $timeout(function() {
                $ionicLoading.hide();
            }, seconds);
        },

   stringCaster: function(val){ //this function is a very embarassing piece of code a dude can write;
    var castified;

        if (val==='0' || val===0) {return castified=0;}
        if (val==='1' || val===1) {return castified=1;}
        if (val=='2') {return castified=2;}
        if (val=='3') {return castified=3;}
        if (val=='4') {return castified=4;}
        if (val=='5') {return castified=5;}
        if (val=='6') {return castified=6;}
        if (val=='7') {return castified=7;}
        if (val=='8') {return castified=8;}
        if (val=='9') {return castified=9;}
        if (val=='10') {return castified=10;}
        if (val=='11') {return castified=11;}
        if (val=='12') {return castified=12;}
        if (val=='13') {return castified=13;}
        if (val=='14') {return castified=14;}
        if (val=='15') {return castified=15;}
      },

  quickPop: function(template, dur){ //popup without buttons that disapears on its own. You give it a stringified html template
            if(dur==null || dur == NaN || typeof dur == 'undefined'){dur=3;};

               var seconds=(dur*1000);
               var thePop=$ionicPopup.show(template);

            $timeout(function(){
                thePop.close();
            }, seconds)
        },
   arrMaxMin: function(fn, array){

      var val;

        switch(fn){
            case 'max':
              val = Math.max.apply(Math, array);
            break;
            case 'min':
              val = Math.min.apply(Math, array);
            break;
        };

        return val;
   },

   tinStarterPack: function(){

        $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_01.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_01.rotation.x=0;
        $rootScope.makt_dynamic._koti_01.rotation.z=0;
        $rootScope.makt_dynamic._koti_01.position.set(150,56.5,0); 

        $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_02.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_02.rotation.x=0;
        $rootScope.makt_dynamic._koti_02.rotation.z=0;
        $rootScope.makt_dynamic._koti_02.position.set(150,44.5,0);

        $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_03.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_03.rotation.x=0;
        $rootScope.makt_dynamic._koti_03.rotation.z=0;
        $rootScope.makt_dynamic._koti_03.position.set(150,32.5,0);

        $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_04.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_04.rotation.x=0
        $rootScope.makt_dynamic._koti_04.rotation.z=0;
        $rootScope.makt_dynamic._koti_04.position.set(150,19.5,0);

        $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_05.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_05.rotation.x=0;
        $rootScope.makt_dynamic._koti_05.rotation.z=0;
        $rootScope.makt_dynamic._koti_05.position.set(150,6.5,0);

        $rootScope.mogustu.setLinearVelocity(new THREE.Vector3());

        $timeout(function(){
            $rootScope.mogustu.__dirtyPosition=true;

            $rootScope.mogustu.position.y=5;
            $rootScope.mogustu.position.x=150;
            $rootScope.mogustu.position.z=-150;

        },500);
   },

   restoreCans: function(c){
      
        //c is an object that has all the can positions

        $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_01.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_01.rotation.x=0;
        $rootScope.makt_dynamic._koti_01.rotation.z=0;
        $rootScope.makt_dynamic._koti_01.position.set(c.k1.x,c.k1.y,c.k1.z); 

        $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_02.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_02.rotation.x=0;
        $rootScope.makt_dynamic._koti_02.rotation.z=0;
        $rootScope.makt_dynamic._koti_02.position.set(c.k2.x,c.k2.y,c.k2.z);

        $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_03.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_03.rotation.x=0;
        $rootScope.makt_dynamic._koti_03.rotation.z=0;
        $rootScope.makt_dynamic._koti_03.position.set(c.k3.x,c.k3.y,c.k3.z);

        $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_04.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_04.rotation.x=0
        $rootScope.makt_dynamic._koti_04.rotation.z=0;
        $rootScope.makt_dynamic._koti_04.position.set(c.k4.x,c.k4.y,c.k4.z);

        $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_05.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_05.rotation.x=0;
        $rootScope.makt_dynamic._koti_05.rotation.z=0;
        $rootScope.makt_dynamic._koti_05.position.set(c.k5.x,c.k5.y,c.k5.z);

        $timeout(function(){
            $rootScope.mogustu.__dirtyPosition=true;

            $rootScope.mogustu.position.y=5;
            $rootScope.mogustu.position.x=150;
            $rootScope.mogustu.position.z=-150;

        },500);
   },

   gimmeThePlayer: function(name){

    var leplayer;

    for (var i = 0; i < $rootScope.chars.length; i++) {
      if($rootScope.chars[i].name==name){
            leplayer=$rootScope.chars[i];
      };
    };
      return leplayer;
   },

   GenerateRandomDzumers: function(forbidenDzumer){
      
        var randomDzumers={};
        var squad=storageService.get('player_arr');
        $rootScope.sessobj.legalPlayers=[];

        Array.prototype.remove = function(){
            var args = Array.apply(null, arguments);
            var indices = [];
            for(var i = 0; i < args.length; i++){
                var arg = args[i];
                var index = this.indexOf(arg);
                while(index > -1){
                    indices.push(index);
                    index = this.indexOf(arg, index + 1);
                }
            }
            indices.sort();
            for(var i = 0; i < indices.length; i++){
                var index = indices[i] - i;
                this.splice(index, 1);
            }    
        };

        //this is what happens when you're too lazy to run a script that can extract specific fields of an array.
        var arr=[squad[0].name,squad[1].name,squad[2].name,squad[3].name,squad[4].name,squad[5].name,squad[6].name,squad[7].name]
            arr.remove(forbidenDzumer);

        var rand_1=Math.floor(Math.random()*7); //we want an integer between 0 and 6
        var rand_2=Math.floor(Math.random()*6); //we want an integer between 0 and 5

        randomDzumers.d1=arr[rand_1];
        arr.remove(randomDzumers.d1);

        randomDzumers.d2=arr[rand_2];
        arr.remove(randomDzumers.d2);

        squad.forEach(function(member){

            var i = 0;
            var k = arr.length;

            for(i ; i<k; i++){
              if (arr[i]===member.name) {
                  $rootScope.sessobj.legalPlayers.push(member);
              }
            }
        });

        return randomDzumers;
   },

   resize: (function() {
      return function(scale, renderer, camera) {

      var canvas = renderer.domElement;
          canvas.style.width = canvas.width + 'px';
          canvas.style.height = canvas.height + 'px';
      var originalWidth = canvas.width;
      var originalHeight = canvas.height;
      
          canvas.width = Math.round(originalWidth*scale);
          canvas.height = Math.round(originalHeight*scale);
          camera.aspect = canvas.width / canvas.height;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.width, canvas.height);
          renderer.domElement.style.cssText='position: fixed; width:'+$window.innerWidth+'px; height:'+$window.innerHeight+'px; top:0; left:0; z-index: -500;';
       
        };
     })(),

  isRightCan: function(canInHand, scope){

    var legalCan='E';
    var ndizhone=true;
    //this guy checks if a can is stacked
      if ($rootScope.makt_dynamic._koti_05.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_05.position.y,z:0})<=30 && ($rootScope.makt_dynamic._koti_05.position.y<=8)){
          legalCan='D';
      if ($rootScope.makt_dynamic._koti_04.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_04.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_04.position.y<=22)){
            legalCan='C';
        if ($rootScope.makt_dynamic._koti_03.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_03.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_03.position.y<=35)){
              legalCan='B';
          if ($rootScope.makt_dynamic._koti_02.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_02.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_02.position.y<=50)){
                legalCan='A';
            if ($rootScope.makt_dynamic._koti_01.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_01.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_05.position.y<=60)){
                  legalCan='allPacked';
            }
          }
        }
      }
    };

      if (canInHand !== legalCan) {
        
          if (legalCan !== 'allPacked') {
              return ndizhone=false;
          }else{
                 scope.RUNTIME_MSG='Hebann...';  scope.moj5=true;

                  $timeout(function(){scope.RUNTIME_MSG='You only needed to jump...';  scope.moj5=false;  scope.moj14=true;
                    $timeout(function(){scope.RUNTIME_MSG='';  scope.moj14=false; },3000)
                },2000);
          } 
      }

  },

 hintsNfixes: function(scope){
  var pl_pos = $rootScope.sessobj.firstPlayer.position.distanceTo($rootScope.scene.position);
  var condition=null;
      if ($rootScope.makt_dynamic._koti_05.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_05.position.y,z:0})<=30 && ($rootScope.makt_dynamic._koti_05.position.y<=8)){
          condition='_1_';
      if ($rootScope.makt_dynamic._koti_04.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_04.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_04.position.y<=22) && ($rootScope.makt_dynamic._koti_04.position.y>10)){
            condition='_2_';
        if ($rootScope.makt_dynamic._koti_03.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_03.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_03.position.y<=35) && ($rootScope.makt_dynamic._koti_03.position.y>10)){
              condition='_3_';
          if ($rootScope.makt_dynamic._koti_02.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_02.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_02.position.y<=50) && ($rootScope.makt_dynamic._koti_02.position.y>10)){
                condition='_4_';
            if ($rootScope.makt_dynamic._koti_01.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_01.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_01.position.y>10)){
                  condition='_5_';
            }
          }
        }
      }
    };

    if (pl_pos<60) {

    //fix cans:
    //check positions, then remove those that are above the last correct can's y position ()

    //step 1
        //check biggest can if its there go to next step if not don't do shit
        //check sec biggest if its there keep going till we get to the last, if not go to step 2

    //step 2,
        //check how many legal cans are correctly placed
        //check how many are trespassing
        //remove side trespassers, fix legaals then remove top trespassers and fix legal cans again

    function forceCalc(vector){
        var force=new THREE.Vector3(vector.x, vector.y, vector.z);
            force.normalize();
            force.multiplyScalar(2);

        return force;
    };

    var d1={name:'d1'},d2={name:'d2'},d3={name:'d3'},d4={name:'d4'},d5={name:'d5'};
        d1.val=$rootScope.makt_dynamic._koti_01.position.distanceTo($rootScope.scene.position);
        d2.val=$rootScope.makt_dynamic._koti_02.position.distanceTo($rootScope.scene.position);
        d3.val=$rootScope.makt_dynamic._koti_03.position.distanceTo($rootScope.scene.position);
        d4.val=$rootScope.makt_dynamic._koti_04.position.distanceTo($rootScope.scene.position);
        d5.val=$rootScope.makt_dynamic._koti_05.position.distanceTo($rootScope.scene.position);
    var mmila=[d1,d2,d3,d4,d5];
    var trespassers=[];



  // whatever the condition is, determine who doesnt meet the required specs but is still in the circle and push them out
      mmila.forEach(function(mobila){
          //check for trespassers
          switch(mobila.name){
            case 'd1':
              if (mobila.val<=50 && (condition==='_1_' || condition==='_2_' || condition==='_3_' || condition==='_4_' || condition===null)) {
                  $rootScope.makt_dynamic._koti_01.applyImpulse(forceCalc($rootScope.makt_dynamic._koti_01.position), new THREE.Vector3());
              };
            break;
            case 'd2':
              if (mobila.val<=50 && (condition==='_1_' || condition==='_2_' || condition==='_3_' || condition===null)) {
                  $rootScope.makt_dynamic._koti_02.applyImpulse(forceCalc($rootScope.makt_dynamic._koti_02.position), new THREE.Vector3());
              };
            break;
            case 'd3':
              if (mobila.val<=50 && (condition==='_1_' || condition==='_2_' || condition===null)) {
                  $rootScope.makt_dynamic._koti_03.applyImpulse(forceCalc($rootScope.makt_dynamic._koti_03.position), new THREE.Vector3());
              };
            break;
            case 'd4':
              if (mobila.val<=50 && (condition==='_1_' || condition===null)) {
                  $rootScope.makt_dynamic._koti_04.applyImpulse(forceCalc($rootScope.makt_dynamic._koti_04.position), new THREE.Vector3());
              };
            break;
            case 'd5':
              if (mobila.val<=50 && condition===null) {
                  $rootScope.makt_dynamic._koti_05.applyImpulse(forceCalc($rootScope.makt_dynamic._koti_05.position), new THREE.Vector3());
              };
            break;
          }
      });

  switch(condition){
          case '_1_':
         activeSessionFactory.massMesser('accurate_drop','E');
          break;
          case '_2_':
            activeSessionFactory.massMesser('accurate_drop','E');
            $timeout(function(){activeSessionFactory.massMesser('accurate_drop','D');},50);
            
          break;
          case '_3_':
            activeSessionFactory.massMesser('accurate_drop','E');
            $timeout(function(){
              activeSessionFactory.massMesser('accurate_drop','D');
              $timeout(function(){
              activeSessionFactory.massMesser('accurate_drop','C');
              },50)
            },50);
            
          break;
          case '_4_':
            activeSessionFactory.massMesser('accurate_drop','E');
            $timeout(function(){
              activeSessionFactory.massMesser('accurate_drop','D');
              $timeout(function(){
                activeSessionFactory.massMesser('accurate_drop','C');
                $timeout(function(){
                activeSessionFactory.massMesser('accurate_drop','B');
                },50);
              },50);
            },50);
          break;
          case '_5_':
            activeSessionFactory.massMesser('accurate_drop','E');
            $timeout(function(){
              activeSessionFactory.massMesser('accurate_drop','D');
              $timeout(function(){
                  activeSessionFactory.massMesser('accurate_drop','C');
                  $timeout(function(){
                    activeSessionFactory.massMesser('accurate_drop','B');
                    $timeout(function(){
                    activeSessionFactory.massMesser('accurate_drop','A');
                  },50)
                },50)
              },50)
            },50)
          break;
        }

    return;
};

function matFlicker(dynamicCan, staticCan){

      dynamicCan.material=$rootScope.phyMat2;
      staticCan.material=$rootScope.phyMat2;

      $timeout(function(){
              dynamicCan.material=$rootScope.phyMat;
              staticCan.material=$rootScope.phyMat;

          $timeout(function(){
                  dynamicCan.material=$rootScope.phyMat2;
                  staticCan.material=$rootScope.phyMat2;

              $timeout(function(){
                      dynamicCan.material=$rootScope.phyMat;
                      staticCan.material=$rootScope.phyMat;

                  $timeout(function(){
                          dynamicCan.material=$rootScope.phyMat2;
                          staticCan.material=$rootScope.phyMat2;

                      $timeout(function(){
                                dynamicCan.material=$rootScope.phyMat;
                                staticCan.material=$rootScope.phyMat;

                          $timeout(function(){
                                    dynamicCan.material=$rootScope.phyMat2;
                                    staticCan.material=$rootScope.phyMat2;

                              $timeout(function(){
                                        dynamicCan.material=$rootScope.phyMat;
                                        staticCan.material=$rootScope.phyMat;
                            },300);
                         },300);
                      },300);
                  }, 300);
              },300);
          },300);
      },300);
}

  switch(condition){
          case null :
             matFlicker($rootScope.makt_dynamic._koti_05, $rootScope.makt_static._koti_05);
          break;
          case '_1_':
             matFlicker($rootScope.makt_dynamic._koti_04, $rootScope.makt_static._koti_04);
          break;
          case '_2_':
             matFlicker($rootScope.makt_dynamic._koti_03, $rootScope.makt_static._koti_03);
          break;
          case '_3_':
              matFlicker($rootScope.makt_dynamic._koti_02, $rootScope.makt_static._koti_02); 
          break;
          case '_4_':
               matFlicker($rootScope.makt_dynamic._koti_01, $rootScope.makt_static._koti_01);
          break;
          case '_5_':
            scope.RUNTIME_MSG='You need to jump over the cans now';  scope.moj8=true;
            $timeout(function(){scope.RUNTIME_MSG='';  scope.moj8=false;},3000);
          break;

        }
       
     },
       healthObjValue: function(num){

      switch(num){

        case 0:
            $rootScope.sessobj.health={h1:true, h2:false, h3:false, h4:false, h5:false};
        break;
        case 1:
            $rootScope.sessobj.health={h1:true, h2:false, h3:false, h4:false, h5:false};
        break;
        case 2:
            $rootScope.sessobj.health={h1:true, h2:true, h3:false, h4:false, h5:false};
        break;
        case 3:
            $rootScope.sessobj.health={h1:true, h2:true, h3:true, h4:false, h5:false};
        break;
        case 4:
            $rootScope.sessobj.health={h1:true, h2:true, h3:true, h4:true, h5:false};
        break;
        case 5:
            $rootScope.sessobj.health={h1:true, h2:true, h3:true, h4:true, h5:true};
        break;
      };

  },

  healthNumValue: function(healthObj){

      var state=null;

      if (healthObj.h1===true && healthObj.h2===true && healthObj.h3===true && healthObj.h4===true && healthObj.h5===true) {return state=5;};
      if (healthObj.h1===true && healthObj.h2===true && healthObj.h3===true && healthObj.h4===true && healthObj.h5===false) { return state=4;};
      if (healthObj.h1===true && healthObj.h2===true && healthObj.h3===true && healthObj.h4===false && healthObj.h5===false) { return state=3;};
      if (healthObj.h1===true && healthObj.h2===true && healthObj.h3===false && healthObj.h4===false && healthObj.h5===false) { return state=2;};
      if (healthObj.h1===true && healthObj.h2===false && healthObj.h3===false && healthObj.h4===false && healthObj.h5===false) { return state=1;};
      if (healthObj.h1===false && healthObj.h2===false && healthObj.h3===false && healthObj.h4===false && healthObj.h5===false) { return state=0;};

  },

     calculateHealth: function(){

        //first update the HUD viewport. sequence is everything here. They have to be in this order
        if ($rootScope.sessobj.health.h5) {
              $rootScope.sessobj.health.h5=false;
              return;
        };

        if ($rootScope.sessobj.health.h4) {
              $rootScope.sessobj.health.h4=false;
              return;
        };

        if ($rootScope.sessobj.health.h3) {
              $rootScope.sessobj.health.h3=false;
              return;
        };

        if ($rootScope.sessobj.health.h2) {
              $rootScope.sessobj.health.h2=false;
              return;
        };

        if ($rootScope.sessobj.health.h1) {
              $rootScope.sessobj.health.h1=false;
              return;
        };
     }
   }

});

chigago.service('utilityService2', function($rootScope, utilityFctr){
    return {

      bonusHealth: function(zebonus){

          //healthNumValue(healthObj)
          //healthObjValue(num);
              
            var currentHealthNum=utilityFctr.healthNumValue($rootScope.sessobj.health);
            var newHealthNum;
                
            if (zebonus>=250 && zebonus<400) {

                $rootScope.lifeAdded=true;
                newHealthNum=currentHealthNum+1;
                 $rootScope.newHealthNum=1;
                if (newHealthNum>5) {newHealthNum=5}
                utilityFctr.healthObjValue(newHealthNum);

                return;
            };

            if (zebonus>=400 && zebonus<600) {

                $rootScope.lifeAdded=true;  
                newHealthNum=currentHealthNum+2;
                $rootScope.newHealthNum=2;
                if (newHealthNum>5) {newHealthNum=5}
                utilityFctr.healthObjValue(newHealthNum);

                 return;
            };

            if (zebonus>=600) {

                $rootScope.lifeAdded=true;    
                 newHealthNum=currentHealthNum+3
                  $rootScope.newHealthNum=3;
                if (newHealthNum>5) {newHealthNum=5}
                utilityFctr.healthObjValue(newHealthNum);
                
                 return;
            }            
       }

    }
})

chigago.factory('storageService', function($rootScope){

  
    return{

        set:function(key,value){
        	var freshObj=angular.toJson(value);
            return localStorage.setItem(key,freshObj);
        },
        get:function(key){        			
            return  angular.fromJson(localStorage.getItem(key));
        },
        destroy:function(key){
            return localStorage.removeItem(key);
        },

        tempo: function(k){ //I think this was built only to help me out with some functionality during development
          var cat;

          if (k===97  || k===49) {cat='a'};
          if (k===98  || k===50) {cat='b'};
          if (k===99  || k===51) {cat='c'};
          if (k===100 || k===52) {cat='d'};
          if (k===101 || k===53) {cat='e'};

          switch(cat){
                  case 'a':
                    $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
                    $rootScope.makt_dynamic._koti_01.__dirtyRotation=true;
                    $rootScope.makt_dynamic._koti_01.rotation.x=0;
                    $rootScope.makt_dynamic._koti_01.rotation.z=0;
                    $rootScope.makt_dynamic._koti_01.position.set(0,55.5,0);
                  break;
                  case 'b':
                    $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
                    $rootScope.makt_dynamic._koti_02.__dirtyRotation=true;
                    $rootScope.makt_dynamic._koti_02.rotation.x=0;
                    $rootScope.makt_dynamic._koti_02.rotation.z=0;
                    $rootScope.makt_dynamic._koti_02.position.set(0,44.5,0);
                  break;
                  case 'c':
                    $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
                    $rootScope.makt_dynamic._koti_03.__dirtyRotation=true;
                    $rootScope.makt_dynamic._koti_03.rotation.x=0;
                    $rootScope.makt_dynamic._koti_03.rotation.z=0;
                    $rootScope.makt_dynamic._koti_03.position.set(0,32.5,0);
                  break;
                  case 'd':
                    $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
                    $rootScope.makt_dynamic._koti_04.__dirtyRotation=true;
                    $rootScope.makt_dynamic._koti_04.rotation.x=0
                    $rootScope.makt_dynamic._koti_04.rotation.z=0;
                    $rootScope.makt_dynamic._koti_04.position.set(0,19.5,0);
                  break;
                  case 'e':
                    $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
                    $rootScope.makt_dynamic._koti_05.__dirtyRotation=true;
                    $rootScope.makt_dynamic._koti_05.rotation.x=0;
                    $rootScope.makt_dynamic._koti_05.rotation.z=0;
                    $rootScope.makt_dynamic._koti_05.position.set(0,6.5,0);
                  break;
          }
        }
    };
});

chigago.factory('worlds', function($document, $rootScope, $window, $timeout, utilityFctr, $http, $state, $ionicLoading, $ionicPopup){

 return{

  setupContext: function(){

    function webglAvailable() {
      try {
        var canvas = document.createElement( 'canvas' );
        return !!( window.WebGLRenderingContext && (
          canvas.getContext( 'webgl' ) ||
          canvas.getContext( 'experimental-webgl' ) )
        );
      } catch ( e ) {
        return false;
      }
    }

    // $rootScope.renderer = new THREE.WebGLRenderer({ antialias: true });

      if ( webglAvailable() ) {
          
          $rootScope.renderer = new THREE.WebGLRenderer({ antialias: true });

        } else {

          $rootScope.renderer = new THREE.CanvasRenderer({ antialias: true });
          
      }

    $rootScope.scene = new Physijs.Scene();

    $rootScope.renderer.setClearColor( 0x333333 );
    $rootScope.renderer.setPixelRatio( $window.devicePixelRatio );
    $rootScope.renderer.setSize($window.innerWidth/1.5,$window.innerHeight/1.5);
    $rootScope.renderer.autoClear=true;

    //this is the guy that stretches the renderer throughout the screen regardless of its size (the size is given by the lines above);
    $rootScope.renderer.domElement.style.cssText='position: fixed; width:'+$window.innerWidth+'px; height:'+$window.innerHeight+'px; top:0; left:0; z-index: -500;';

    $rootScope.scene.setGravity(new THREE.Vector3( 0, -550, 0 ));

    $rootScope.camera = new THREE.PerspectiveCamera(50, $window.innerWidth/$window.innerHeight, 1, 9000 );

    },

    createClouds: function(){

        function bgLoadErr(err){
            $ionicLoading.show({
              scope: $rootScope,
              template: `<div align="center" >
                        
                            <div class="item item-thumbnail-left" style="background-color: transparent; padding-top: 20px;">
                              <img src="img/stopNosonso.png">
                                <h4 style="text-align: center; color: white;">  
                                Woops, looks like the animation API hit a serious snag.<br> You're gonna have to reset the app.<br>
                                Sorry for the inconvenience...                                
                           </h4>
                            </div><br>
                             <p class="confBtn" ng-click="ContextLost_btn('yes')">Reset</p>
                          </div>
                        `   
            }).then(function(){
              console.log(err);
          })
        };
        function bgProg(prog){console.log(prog)};

        var cloudLoader=new THREE.CubeTextureLoader(THREE.DefaultLoadingManager);
        var ext='.png';
           
        cloudLoader.setPath( 'models/clouds_1/' );
        cloudLoader.load([ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], function(res1){
        res1.minFilter=THREE.NearestFilter;
        $rootScope.clouds=res1;
        },bgProg,bgLoadErr);
    },

    removeUnwantedHouses: function(){

        if($rootScope.home6.visible){$rootScope.home6.visible=false; $rootScope.scene.remove($rootScope.home6); $rootScope.home6.geometry.dispose();};
        if($rootScope.home7.visible){$rootScope.home7.visible=false; $rootScope.scene.remove($rootScope.home7); $rootScope.home7.geometry.dispose();};
        if($rootScope.home8.visible){$rootScope.home8.visible=false; $rootScope.scene.remove($rootScope.home8); $rootScope.home8.geometry.dispose();};
        if($rootScope.home9.visible){$rootScope.home9.visible=false; $rootScope.scene.remove($rootScope.home9); $rootScope.home9.geometry.dispose();};
        if($rootScope.home10.visible){$rootScope.home10.visible=false; $rootScope.scene.remove($rootScope.home10); $rootScope.home10.geometry.dispose();};



    },

    loadBoards: function(){

      var boardGeo=new THREE.PlaneGeometry(500, 250);
          boardGeo.sortFacesByMaterialIndex();
      var ad_imgAdr_1;
      var ad_imgAdr_2;

//       //these are simply the poles
      var poleGeo=new THREE.CylinderGeometry(10,15, 200, 6, 1, true);
          poleGeo.sortFacesByMaterialIndex();
      var poleMat=new THREE.MeshLambertMaterial({color: 'silver'});

      var pole_1=new THREE.Mesh(poleGeo, poleMat);
          pole_1.position.set(-850, 100, -800);
          pole_1.name='pole_1';


      var boardTxt=new THREE.TextureLoader();

                   boardTxt.load('img/kasi/fence.png', function(fenceTxt){ 
                   fenceTxt.wrapS=THREE.RepeatWrapping;
                   fenceTxt.repeat.set(7,1);

                      var fenceMat=new THREE.MeshBasicMaterial({map: fenceTxt, transparent: true, side: THREE.DoubleSide})
                      var fenceGeo=new THREE.PlaneGeometry(1600, 100);
                      var fence=new THREE.Mesh(fenceGeo, fenceMat);

                      fence.position.y=50;
                      fence.position.z=-700;
                      fence.position.x=-1450;

                      var backFence=fence.clone();
                          backFence.rotation.y=-Math.PI/2;
                          backFence.position.x=-2100;
                          backFence.position.z=100;

                      $rootScope.scene.add(fence);
                      $rootScope.scene.add(backFence);

          (new THREE.JSONLoader).load('models/tent.json', function(tentGeo){
              var tentMat=new THREE.MeshBasicMaterial({color: 'red', transparent: true, opacity: 0.6});
              var tentMesh=new THREE.Mesh(tentGeo, tentMat);
              var tentPole1=pole_1.clone(), tentPole2=pole_1.clone(), tentPole3=pole_1.clone(), tentPole4=pole_1.clone();

                  tentPole1.position.x=-630;   tentPole2.position.x=-1370;  tentPole3.position.x=-1370;  tentPole4.position.x=-630;
                  tentPole1.position.z=-1230;  tentPole2.position.z=-1230;  tentPole3.position.z=-1970;  tentPole4.position.z=-1970;

                  $rootScope.scene.add(tentPole1);
                  $rootScope.scene.add(tentPole2);
                  $rootScope.scene.add(tentPole3);
                  $rootScope.scene.add(tentPole4);

                  tentMesh.position.y=300;
                  tentMesh.position.z=-1600;
                  tentMesh.position.x=-1000;
                  $rootScope.scene.add(tentMesh);

              var groenPunt=new THREE.TextureLoader();

              var punt_1=groenPunt.load('models/houses/punt_4.png');
              var punt_2=groenPunt.load('models/houses/punt_2.png');
              var punt_3=groenPunt.load('models/houses/punt_3.png');
              var punt_4=groenPunt.load('models/houses/punt_1.png');


              (new THREE.JSONLoader).load('models/houses/huisGeo.json', function(block){

              var home1Mat=new THREE.MeshLambertMaterial({map: punt_1});
              var home2Mat=new THREE.MeshLambertMaterial({map: punt_2});
              var home3Mat=new THREE.MeshLambertMaterial({map: punt_3});
              var home4Mat=new THREE.MeshLambertMaterial({map: punt_4});

              var home1=new THREE.Mesh(block, home1Mat); home1.rotation.y=Math.PI/2;
              var home2=new THREE.Mesh(block, home2Mat); home2.rotation.y=Math.PI/2;
              var home3=new THREE.Mesh(block, home3Mat); home3.rotation.y=Math.PI/2;
              var home4=new THREE.Mesh(block, home4Mat); home4.rotation.y=Math.PI/2;

              $rootScope.home6=home1.clone(false);
              $rootScope.home7=home4.clone(false);
              $rootScope.home8=home1.clone(false);
              $rootScope.home9=home4.clone(false);
              $rootScope.home10=home1.clone(false);

              home1.position.x=-900; home2.position.x=-1000;  home3.position.x=-1000;   home4.position.x=-1000; 
              home1.position.z=2800;  home2.position.z=1850;   home3.position.z=1000;     home4.position.z=150;  

              $rootScope.home6.position.x=1150;                   
              $rootScope.home6.position.z=2550;                   
              $rootScope.home6.rotation.y=-Math.PI/2;


             $rootScope.home7.position.x=1150; 
             $rootScope.home7.position.z=1750; 
             $rootScope.home7.rotation.y=-Math.PI/2;

              $rootScope.home8.position.x=1150; 
              $rootScope.home8.position.z=950; 
              $rootScope.home8.rotation.y=-Math.PI/2;

              $rootScope.home9.position.x=1150; 
              $rootScope.home9.position.z=-150;    
              $rootScope.home9.rotation.y=-Math.PI/2;

              $rootScope.home10.position.x=1150; 
              $rootScope.home10.position.z=-950; 
              $rootScope.home10.rotation.y=-Math.PI/2;

              if ($rootScope.scene) {

                  $rootScope.scene.add(home1);
                  $rootScope.scene.add(home2);
                  $rootScope.scene.add(home3);
                  $rootScope.scene.add(home4);

              }
              //local.png

       var boardMat1=new THREE.MeshBasicMaterial({ color: '#444'});
       var board_1=new THREE.Mesh(boardGeo, boardMat1);
           board_1.position.set(-850, 325, -800)
           board_1.rotation.y=(Math.PI*(1/4));
           board_1.name='board_1';
           $rootScope.scene.add(board_1);
           $rootScope.scene.add(pole_1); 

        $http.get( 'https://dl.dropboxusercontent.com/s/96ejz1shp65xheb/local.png?dl=0', {responseType:'blob'}).then(function(res){
                
                      var blob=new Blob([res.data], { type: 'image/jpeg' });
                          ad_imgAdr_1=$window.URL.createObjectURL(blob);
                          boardTxt.setCrossOrigin='anonymous';

                          boardTxt.load(ad_imgAdr_1, function(ad1){ 
      
                            var boardMat2=new THREE.MeshBasicMaterial({map: ad1});
                                board_1.material=boardMat2;
                  }, boardLoadProgress, boardLoadError);

              }, function(err){

                        boardTxt.load('img/ch_fb_propic3.png', function(ad){    

                          var boardMat2=new THREE.MeshBasicMaterial({map: ad});
                              board_1.material=boardMat2;

                        }, boardLoadProgress, boardLoadError);
              });

          }, boardLoadProgress, boardLoadError);
        }, boardLoadProgress, boardLoadError);
      }, boardLoadProgress, boardLoadError);


            function boardLoadProgress(prog){/*console.log(prog);*/}; 
            function boardLoadError(err){

                $ionicLoading.show({
                  scope: $rootScope,
                  template: `<div align="center" >
                            
                                <div class="item item-thumbnail-left" style="background-color: transparent; padding-top: 20px;">
                                  <img src="img/stopNosonso.png">
                                    <h4 style="text-align: center; color: white;">  
                                    Woops, looks like the animation API hit a serious snag.<br> You're gonna have to reset the app.<br>
                                    Sorry for the inconvenience...                                
                               </h4>
                                </div><br>
                                 <p class="confBtn" ng-click="ContextLost_btn('yes')">Reset</p>
                              </div>
                            `   
                })
        };
    },

    createSurroundings: function(){
            //and now for the street

       var groundTxtLoader=new THREE.TextureLoader();
         
           groundTxtLoader.load('img/kasi/road-rotated4.jpg', function(texture){
              texture.wrapT=THREE.RepeatWrapping;
              texture.repeat.set(1,9);
               var streetGeo=new THREE.PlaneGeometry(800, 8000);
                   streetGeo.sortFacesByMaterialIndex();
               var streetMat=new THREE.MeshBasicMaterial({map: texture});
               var straat=new THREE.Mesh(streetGeo, streetMat);

               straat.rotation.x=-Math.PI/2;
               $rootScope.scene.add(straat);
        /***********************************************************************************************/ 
               
               groundTxtLoader.load('img/kasi/pavement.jpg', function(graas){ 
               graas.wrapT=graas.wrapS=THREE.RepeatWrapping;
               graas.repeat.set(1,22);

                var graasGeo=new THREE.PlaneGeometry( 200, 8000);
                    graasGeo.sortFacesByMaterialIndex();
                var graasMat=new THREE.MeshBasicMaterial({map: graas, transparent: true});
                var graasMsh=new THREE.Mesh(graasGeo, graasMat);
                var graasMsh2=new THREE.Mesh(graasGeo, graasMat);

                    graasMsh.rotation.x=-Math.PI/2;
                    graasMsh.position.x=-500;
                    $rootScope.scene.add(graasMsh);

                    graasMsh2.rotation.x=Math.PI/2;
                    graasMsh2.rotation.y=-Math.PI;
                    graasMsh2.position.x=500;
                    $rootScope.scene.add(graasMsh2);


                    groundTxtLoader.load('img/kasi/grassField.jpg', function(groenGrass){
                      groenGrass.wrapT=groenGrass.wrapS=THREE.RepeatWrapping;
                      groenGrass.repeat.set(8,22);

                      var fieldGeo=new THREE.PlaneGeometry(2000, 8000);
                          fieldGeo.sortFacesByMaterialIndex();
                      var fieldmat=new THREE.MeshBasicMaterial({map: groenGrass});

                      var fieldMesh=new THREE.Mesh(fieldGeo, fieldmat);
                      var fieldMesh2=new THREE.Mesh(fieldGeo, fieldmat);

                          fieldMesh.rotation.x=-Math.PI/2;
                          fieldMesh.position.x=-1600;
                          $rootScope.scene.add(fieldMesh);

                          fieldMesh2.rotation.x=-Math.PI/2;
                          fieldMesh2.position.x=1600;
                          $rootScope.scene.add(fieldMesh2);

                    }, _straatLoadProgress, _straatLoadError);
               }, _straatLoadProgress, _straatLoadError);
           }, _straatLoadProgress, _straatLoadError);


           function _straatLoadProgress(xhr){

           };
           function _straatLoadError(error){
                          $ionicLoading.show({
              scope: $rootScope,
              template: `<div align="center" >
                        
                            <div class="item item-thumbnail-left" style="background-color: transparent; padding-top: 20px;">
                              <img src="img/stopNosonso.png">
                                <h4 style="text-align: center; color: white;">  
                                Woops, looks like the animation API hit a serious snag.<br> You're gonna have to reset the app.<br>
                                Sorry for the inconvenience...                                
                           </h4>
                            </div><br>
                             <p class="confBtn" ng-click="ContextLost_btn('yes')">Reset</p>
                          </div>
                        `   
            })
        };
      },

    setupVisualContext: function(){

    var dirLight=new THREE.SpotLight(0xffffff, 0.9);
        // dirLight.position.set(200,150,1100);
        dirLight.position.set(-150,1500,1010);

    var ambience=new THREE.AmbientLight(0xffffff, 0.8);

        $rootScope.scene.add(ambience);
        $rootScope.scene.add(dirLight);


 /************************************************************************************************************************/
    
      var ground_material = Physijs.createMaterial(new THREE.MeshNormalMaterial({transparent: true, opacity: 0.4}),0.5,0.2);
      var ground= new Physijs.PlaneMesh(new THREE.PlaneGeometry(1500,1500), ground_material, 0);
        
        ground.rotation.x=-Math.PI/2;
        ground.visible=false;
        // ground.visible=true;
        $rootScope.scene.add(ground);

      var borderRight = new Physijs.PlaneMesh(new THREE.PlaneGeometry(1400, 1400), ground_material, 0); 
          borderRight.position.z=-750;
          borderRight.position.y=590;
          borderRight.visible=false;
          // borderRight.visible=true;
          $rootScope.scene.add(borderRight);

      var borderLeft = new Physijs.PlaneMesh(new THREE.PlaneGeometry(1400, 1400), ground_material, 0); 
          borderLeft.position.z=750;
          borderLeft.position.y=590;
          borderLeft.rotation.y=Math.PI;
          borderLeft.visible=false;
          // borderLeft.visible=true;
          $rootScope.scene.add(borderLeft);


      var borderTop = new Physijs.PlaneMesh(new THREE.PlaneGeometry(1400, 1400), ground_material, 0); 
          borderTop.position.x=-600;
          borderTop.position.y=590;
          borderTop.rotation.y=Math.PI/2;
          borderTop.visible=false;  
          // borderTop.visible=true;
          $rootScope.scene.add(borderTop);

      var borderBottom = new Physijs.PlaneMesh(new THREE.PlaneGeometry(1400, 1400), ground_material, 0); 
          borderBottom.position.x=600;
          borderBottom.position.y=590;
          borderBottom.rotation.y=-Math.PI/2;
          borderBottom.visible=false;
          // borderBottom.visible=true;
          $rootScope.scene.add(borderBottom);

       // var grid=new THREE.GridHelper(1600,20);
       // $rootScope.scene.add(grid);

        var coneGeo=new THREE.ConeGeometry( 10, 15, 6, 6, false);
        var coneMat=new THREE.MeshBasicMaterial({color: 'orange'});
        $rootScope.pl_mark=new THREE.Mesh(coneGeo,coneMat);

            $rootScope.pl_mark.rotation.x=-Math.PI;
            $rootScope.scene.add($rootScope.pl_mark);
           
        var ringGeo2=new THREE.RingGeometry(5,15,16);    
        var ringGeo=new THREE.RingGeometry(25,30,32);
        var ringMat=new THREE.MeshBasicMaterial({color: 'lime'});

        var centerPiece=new THREE.Mesh(ringGeo,ringMat);
            centerPiece.rotation.x=-Math.PI/2;
            centerPiece.position.set(0,2,0);
            $rootScope.scene.add(centerPiece);

        var centerPiece2=new THREE.Mesh(ringGeo2,ringMat);
            centerPiece2.rotation.x=-Math.PI/2;
            centerPiece2.position.set(0,2,0);
            $rootScope.scene.add(centerPiece2);

        var sphereGeo=new THREE.SphereGeometry(4,32, 32);
        var sphereMat=Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 'lime'}), 0.0, 4);
            $rootScope.mogustu=new Physijs.SphereMesh(sphereGeo, sphereMat, 0.05);
            $rootScope.scene.add($rootScope.mogustu);

        var tinMat=new THREE.MeshLambertMaterial({color: 'grey'});
        var tinMat2=new THREE.MeshLambertMaterial({color: 'orange'});
        var tinMat3=new THREE.MeshLambertMaterial({color: 'grey'});

        $rootScope.phyMat= Physijs.createMaterial(tinMat, 1, 0.4);
        $rootScope.phyMat2= Physijs.createMaterial(tinMat2, 1, 0.4);
        $rootScope.phyMat3= Physijs.createMaterial(tinMat3, 0.001, 0.9);

        $rootScope.makt_dynamic={};
        $rootScope.makt_static={};

        var _koti_01Geo=new THREE.CylinderGeometry(7, 7, 11, 14);
        var _koti_02Geo=new THREE.CylinderGeometry(9, 9, 12, 14);
        var _koti_03Geo=new THREE.CylinderGeometry(10, 10, 13, 14); 
        var _koti_04Geo=new THREE.CylinderGeometry(13, 13, 13, 14);
        var _koti_05Geo=new THREE.CylinderGeometry(15, 15, 13, 14);

          _koti_01Geo.sortFacesByMaterialIndex();
          _koti_02Geo.sortFacesByMaterialIndex();
          _koti_03Geo.sortFacesByMaterialIndex();
          _koti_04Geo.sortFacesByMaterialIndex();
          _koti_05Geo.sortFacesByMaterialIndex();

/*************************************** THESE ARE THE DYNAMIC TINS THAT WILL WORK WITH PHYSI.JS *****************************************/

            $rootScope.makt_dynamic._koti_01=new Physijs.CylinderMesh(_koti_01Geo, $rootScope.phyMat, 0.015);
            $rootScope.makt_dynamic._koti_02=new Physijs.CylinderMesh(_koti_02Geo, $rootScope.phyMat, 0.015);
            $rootScope.makt_dynamic._koti_03=new Physijs.CylinderMesh(_koti_03Geo, $rootScope.phyMat, 0.015);
            $rootScope.makt_dynamic._koti_04=new Physijs.CylinderMesh(_koti_04Geo, $rootScope.phyMat, 0.015);
            $rootScope.makt_dynamic._koti_05=new Physijs.CylinderMesh(_koti_05Geo, $rootScope.phyMat, 0.015);
                        
            $rootScope.scene.add($rootScope.makt_dynamic._koti_01);
            $rootScope.scene.add($rootScope.makt_dynamic._koti_02);
            $rootScope.scene.add($rootScope.makt_dynamic._koti_03);
            $rootScope.scene.add($rootScope.makt_dynamic._koti_04);
            $rootScope.scene.add($rootScope.makt_dynamic._koti_05);

/************************************************* BELOW WERE STATIC TINS ********************************************************************/
            $rootScope.makt_static._koti_01=new THREE.Mesh(_koti_01Geo, $rootScope.phyMat);
            $rootScope.makt_static._koti_02=new THREE.Mesh(_koti_02Geo, $rootScope.phyMat);
            $rootScope.makt_static._koti_03=new THREE.Mesh(_koti_03Geo, $rootScope.phyMat);
            $rootScope.makt_static._koti_04=new THREE.Mesh(_koti_04Geo, $rootScope.phyMat);
            $rootScope.makt_static._koti_05=new THREE.Mesh(_koti_05Geo, $rootScope.phyMat);
        }
    };
});

chigago.factory('charFactory', function($rootScope, storageService, $state, worlds){
 return{

 loadChars: function(){

  var objLoader=new THREE.ObjectLoader();
 
  $rootScope.chars=[];

       objLoader.load('models/players/Khensani.json', function(result1){

          result1.traverse(function(child){

            if(child instanceof THREE.SkinnedMesh){
              child.geometry.sortFacesByMaterialIndex();
              $rootScope.chars.push(child);} 

          });

        objLoader.load('models/players/Linda.json', function(result2){
          result2.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });


        objLoader.load('models/players/Lorna.json', function(result3){
          result3.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });

        objLoader.load('models/players/Moss.json', function(result4){
          result4.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });

        objLoader.load('models/players/Refiloe.json', function(result5){
         result5.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });
    
        objLoader.load('models/players/Sbu.json', function(result6){
          result6.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });
        
        objLoader.load('models/players/Sticks.json', function(result7){
          result7.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });

        objLoader.load('models/players/Rendani.json', function(result8){
           result8.traverse(function(child){
            if(child instanceof THREE.SkinnedMesh){child.geometry.sortFacesByMaterialIndex(); $rootScope.chars.push(child);} 
          });

       if ($rootScope.chars.length===8){

        $rootScope._SEMANTICS.charsHaveLoaded=true;
        $rootScope.$broadcast('allCharsHaveLoaded');

      }else{
          $rootScope.ContextLost_btn();
      };

         
                }, objLoadingProg, objLoadingError);
              }, objLoadingProg, objLoadingError);
            }, objLoadingProg, objLoadingError);
          }, objLoadingProg, objLoadingError);
        }, objLoadingProg, objLoadingError);
      }, objLoadingProg, objLoadingError);
    }, objLoadingProg, objLoadingError);
  }, objLoadingProg, objLoadingError);

function objLoadingError(error){
    // $state.go('app.home'); localStorage.clear(); $window.location.reload();
      $ionicLoading.show({
      scope: $rootScope,
      template: `<div align="center" >
                
                    <div class="item item-thumbnail-left" style="background-color: transparent; padding-top: 20px;">
                      <img src="img/stopNosonso.png">
                        <h4 style="text-align: center; color: white;">  
                        Woops, looks like the animation API hit a serious snag.<br> You're gonna have to reset the app.<br>
                        Sorry for the inconvenience...                                
                   </h4>
                    </div><br>
                     <p class="confBtn" ng-click="ContextLost_btn('yes')">Reset</p>
                  </div>
                `   
    })
};

function objLoadingProg(xhr){
    var progress=xhr.loaded / xhr.total * 100;
   
    if (progress===100) {
       //this means that an object has loaded;
        // console.log('an object has loaded');
        }
      }
    }
  };
});

chigago.factory('activeSessionFactory',function($base64,storageService,$timeout,$rootScope, $ionicLoading){

    return{

       dzum_init: function(dzumer_1, dzumer_2){

            var dzumAnim={}
                dzumAnim.anims={};

            dzumAnim.dz_anim_1=new THREE.AnimationMixer(dzumer_1);
            dzumAnim.dz_anim_2=new THREE.AnimationMixer(dzumer_2);

            dzumAnim.anims.throw_1=dzumAnim.dz_anim_1.clipAction('throw_cycle');
            dzumAnim.anims.run_1=dzumAnim.dz_anim_1.clipAction('run_cycle');
            dzumAnim.anims.grab_1=dzumAnim.dz_anim_1.clipAction('grab');
            dzumAnim.anims.pose_1=dzumAnim.dz_anim_1.clipAction('Pose_cycle');


            dzumAnim.anims.throw_2=dzumAnim.dz_anim_2.clipAction('throw_cycle');
            dzumAnim.anims.run_2=dzumAnim.dz_anim_2.clipAction('run_cycle');
            dzumAnim.anims.grab_2=dzumAnim.dz_anim_2.clipAction('grab');
            dzumAnim.anims.pose_2=dzumAnim.dz_anim_2.clipAction('Pose_cycle');

            return dzumAnim;
       },

     playerAnimInit: function(rhemaPlayer){

      var playerAnim={};
          playerAnim.anims={};

          playerAnim.pl_anim=new THREE.AnimationMixer(rhemaPlayer);
          
          playerAnim.anims.throw=playerAnim.pl_anim.clipAction('throw_cycle');
          playerAnim.anims.run=playerAnim.pl_anim.clipAction('run_cycle');
          playerAnim.anims.grab=playerAnim.pl_anim.clipAction('grab');
          playerAnim.anims.pose=playerAnim.pl_anim.clipAction('Pose_cycle');
          playerAnim.anims.chigago=playerAnim.pl_anim.clipAction('chigago_std');
          playerAnim.anims.squat=playerAnim.pl_anim.clipAction('frog_squat');
          playerAnim.anims.front_plane=playerAnim.pl_anim.clipAction('front_plane');
          playerAnim.anims.place=playerAnim.pl_anim.clipAction('place_can');

          return playerAnim;
      },


massMesser: function (__fn, toPick){
    //this function basically swops cans
   if (__fn==='pick') { 

     switch(toPick){
      case 'A':
        $rootScope.makt_static._koti_01.position.copy($rootScope.makt_dynamic._koti_01.position);
        $rootScope.scene.add($rootScope.makt_static._koti_01);
        $rootScope.scene.remove($rootScope.makt_dynamic._koti_01);
      break;
      case 'B':
        $rootScope.makt_static._koti_02.position.copy($rootScope.makt_dynamic._koti_02.position);
        $rootScope.scene.add($rootScope.makt_static._koti_02);
        $rootScope.scene.remove($rootScope.makt_dynamic._koti_02);
      break;
      case 'C':
        $rootScope.makt_static._koti_03.position.copy($rootScope.makt_dynamic._koti_03.position);
        $rootScope.scene.add($rootScope.makt_static._koti_03);
        $rootScope.scene.remove($rootScope.makt_dynamic._koti_03);        
      break;
      case 'D':
        $rootScope.makt_static._koti_04.position.copy($rootScope.makt_dynamic._koti_04.position);
        $rootScope.scene.add($rootScope.makt_static._koti_04);
        $rootScope.scene.remove($rootScope.makt_dynamic._koti_04);  
      break;
      case 'E':
        $rootScope.makt_static._koti_05.position.copy($rootScope.makt_dynamic._koti_05.position);
        $rootScope.scene.add($rootScope.makt_static._koti_05);
        $rootScope.scene.remove($rootScope.makt_dynamic._koti_05);         
      break;

    }

   return;
}

if (__fn==='loose_drop') {

  switch(toPick){
      case 'A':

        $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_01.position.copy($rootScope.makt_static._koti_01.position);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_01);
        $rootScope.scene.remove($rootScope.makt_static._koti_01);
      break;
      case 'B':

        $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_02.position.copy($rootScope.makt_static._koti_02.position);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_02);
        $rootScope.scene.remove($rootScope.makt_static._koti_02);
      break;
      case 'C':

        $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_03.position.copy($rootScope.makt_static._koti_03.position);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_03);
        $rootScope.scene.remove($rootScope.makt_static._koti_03);        
      break;
      case 'D':

        $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_04.position.copy($rootScope.makt_static._koti_04.position);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_04);
        $rootScope.scene.remove($rootScope.makt_static._koti_04);  
      break;
      case 'E':

        $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_05.position.copy($rootScope.makt_static._koti_05.position);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_05);
        $rootScope.scene.remove($rootScope.makt_static._koti_05);         
      break;

      };

      return;
    }

  if (__fn==='accurate_drop') {

  switch(toPick){
      case 'A':
        $rootScope.makt_dynamic._koti_01.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_01.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_01.rotation.x=0;
        $rootScope.makt_dynamic._koti_01.rotation.z=0;
        $rootScope.makt_dynamic._koti_01.position.set(0,56,0);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_01);
        $rootScope.scene.remove($rootScope.makt_static._koti_01);

        $rootScope.makt_dynamic._koti_01.setLinearVelocity(new THREE.Vector3());
        $rootScope.makt_dynamic._koti_01.setAngularVelocity(new THREE.Vector3());
      break;
      case 'B':
        $rootScope.makt_dynamic._koti_02.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_02.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_02.rotation.x=0;
        $rootScope.makt_dynamic._koti_02.rotation.z=0;
        $rootScope.makt_dynamic._koti_02.position.set(0,44.5,0);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_02);
        $rootScope.scene.remove($rootScope.makt_static._koti_02);

        $rootScope.makt_dynamic._koti_02.setLinearVelocity(new THREE.Vector3());
        $rootScope.makt_dynamic._koti_02.setAngularVelocity(new THREE.Vector3());
      break;
      case 'C':
        $rootScope.makt_dynamic._koti_03.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_03.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_03.rotation.x=0;
        $rootScope.makt_dynamic._koti_03.rotation.z=0;
        $rootScope.makt_dynamic._koti_03.position.set(0,32.5,0);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_03);
        $rootScope.scene.remove($rootScope.makt_static._koti_03);        

        $rootScope.makt_dynamic._koti_03.setLinearVelocity(new THREE.Vector3());
        $rootScope.makt_dynamic._koti_03.setAngularVelocity(new THREE.Vector3());
      break;
      case 'D':
        $rootScope.makt_dynamic._koti_04.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_04.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_04.rotation.x=0
        $rootScope.makt_dynamic._koti_04.rotation.z=0;
        $rootScope.makt_dynamic._koti_04.position.set(0,19.5,0);
        $rootScope.scene.add($rootScope.makt_dynamic._koti_04);
        $rootScope.scene.remove($rootScope.makt_static._koti_04);  

        $rootScope.makt_dynamic._koti_04.setLinearVelocity(new THREE.Vector3());
        $rootScope.makt_dynamic._koti_04.setAngularVelocity(new THREE.Vector3());
      break;
      case 'E':
        $rootScope.scene.add($rootScope.makt_dynamic._koti_05);
        $rootScope.makt_dynamic._koti_05.__dirtyPosition=true;
        $rootScope.makt_dynamic._koti_05.__dirtyRotation=true;
        $rootScope.makt_dynamic._koti_05.rotation.x=0;
        $rootScope.makt_dynamic._koti_05.rotation.z=0;
        $rootScope.makt_dynamic._koti_05.position.set(0,6.5,0);
        $rootScope.scene.remove($rootScope.makt_static._koti_05);

        $rootScope.makt_dynamic._koti_05.setLinearVelocity(new THREE.Vector3());  
        $rootScope.makt_dynamic._koti_05.setAngularVelocity(new THREE.Vector3());       
      break;

       };
     }
    }
  };
});

chigago.service('theWatcher', function($rootScope, $ionicPopup, $ionicLoading, storageService,worlds, $window, $timeout, utilityFctr, $state, utilityService2){
return {

canCtrlValMonitor: function($scope){
     if ($rootScope.makt_dynamic._koti_05.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_05.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_05.position.y<=14)){
        $scope.canPack='_1_';
     if ($rootScope.makt_dynamic._koti_04.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_04.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_04.position.y<=22)){
          $scope.canPack='_2_';
       if ($rootScope.makt_dynamic._koti_03.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_03.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_03.position.y<=35)){
            $scope.canPack='_3_';
         if ($rootScope.makt_dynamic._koti_02.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_02.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_02.position.y<=50)){
              $scope.canPack='_4_';
           if ($rootScope.makt_dynamic._koti_01.position.distanceTo({x:0,y:$rootScope.makt_dynamic._koti_01.position.y,z:0})<=20 && ($rootScope.makt_dynamic._koti_01.position.y<=60)){
               $scope.canPack='_5_';
          }
        }
      }
    }      

  }else{$scope.canPack='empty';};
},

canViewUpdateCall: function ($scope){

  if ($scope.canPack=='_1_' && $scope.canDuty!='_a_') {

              $scope.goalPos.t1=false;
              $scope.goalPos.t2=false;
              $scope.goalPos.t3=false;
              $scope.goalPos.t4=false;
              $scope.goalPos.t5=true;
              $scope.canDuty='_a_';
              return;
  }

  if ($scope.canPack=='_2_' && $scope.canDuty!='_b_') {

              $scope.goalPos.t1=false;
              $scope.goalPos.t2=false;
              $scope.goalPos.t3=false;
              $scope.goalPos.t4=true;
              $scope.goalPos.t5=true;
              $scope.canDuty='_b_';

              return;    
  }

  if ($scope.canPack=='_3_' && $scope.canDuty!='_c_') {

              $scope.goalPos.t1=false;
              $scope.goalPos.t2=false;
              $scope.goalPos.t3=true;
              $scope.goalPos.t4=true;
              $scope.goalPos.t5=true;
              $scope.canDuty='_c_';
              return;
  }

  if ($scope.canPack=='_4_' && $scope.canDuty!='_d_') {

              $scope.goalPos.t1=false;
              $scope.goalPos.t2=true;
              $scope.goalPos.t3=true;
              $scope.goalPos.t4=true;
              $scope.goalPos.t5=true
              $scope.canDuty='_d_';
              return;
  }

  if ($scope.canPack=='_5_' && $scope.canDuty!='_e_') {

              $scope.goalPos.t1=true;
              $scope.goalPos.t2=true;
              $scope.goalPos.t3=true;
              $scope.goalPos.t4=true;
              $scope.goalPos.t5=true;
              $scope.canDuty='_e_';
              return;    
       }

      if ($scope.canPack=='empty') {

             $scope.goalPos.t1=false;
              $scope.goalPos.t2=false;
              $scope.goalPos.t3=false;
              $scope.goalPos.t4=false;
              $scope.goalPos.t5=false;
              return;
        }
     },

changeStage: function(sessobj, resetStage, calculateBonus, pause_, gameDoneSaver, CHAR_REBOOT){

    // worlds.removeBoards(true);


    //calculate level score, calculate bonuses and total score
    //commit stats to lvls array
    //set new stage value
    //facilitate player release

    //add bonus to the overall score
    //show popup with
    //load next stage
      var mins=2;
      $rootScope.playerReleased=false;

        $rootScope.home6.visible=true; $rootScope.scene.add($rootScope.home6);
        $rootScope.home7.visible=true; $rootScope.scene.add($rootScope.home7);
        $rootScope.home8.visible=true; $rootScope.scene.add($rootScope.home8);
        $rootScope.home9.visible=true; $rootScope.scene.add($rootScope.home9);
        $rootScope.home10.visible=true; $rootScope.scene.add($rootScope.home10);

    function lvlEndHUD(){

        $ionicLoading.show({
          scope: $rootScope,
          template:
                    '<h4 style="text-align: center; color: grey;"><i class="emoji moj4"></i>Well done!</h4>'    
                  + '<h5 style="padding-top: 0px; color: #33cd5f; text-align: center;" class="generalBlink balanced">You\'ve completed stage  {{lvlCompleted}}</h5><br>'
                  + '<span style="text-align: center; color: grey; float: left;">Level Score :</span> <strong  style=" float: right;" class="assertive">{{levelScore}}</strong><br>'
                  + '<span style="text-align: center; color: grey; float: left;">Performance bonus :</span> <strong style=" float: right;"  class="assertive">{{bonus}}</strong><br>'
                  + '<span style="text-align: center; color: grey; float: left;">Total Score :</span> <strong style=" float: right;" class="assertive">{{sessobj.score}}</strong><br>'
                  + '<span ng-if="lifeAdded"><span style="text-align: center; color: orange; float: left;">Gained :</span>  <span style=" float: right;"><img src="img/icon.png" style="max-height: 30px; max-width: 20px; display: inline;"/> x <strong class="assertive">{{newHealthNum}}</strong></span></span><br>'
                  + '<div style="text-align: center; color: orange;" ng-if="playerReleased"><strong class="light">*New player unlocked*</strong></div><br>'
                  + '<p class="confBtn" align="center" ng-click="LEH_btn()">Next Stage</p>'
        })
      
        $rootScope.LEH_btn=function(){
             pause_();
             resetStage(mins);
            $rootScope.restorer=false;
            $ionicLoading.hide();
        }
      };

    function gameEndHUD(){

       $ionicLoading.show({
          scope: $rootScope,
          template: `
                  <h4 style="text-align: center; color: grey;">
                    <i class="emoji moj11"></i>
                  Congratulations
                    <i class="emoji moj11"></i>
                  </h4>
                  <h4 style="padding-top: 0px; color: #33cd5f; text-align: center;" class="generalBlink balanced">You\'ve completed all stages.</h4><br>
                  <span style="text-align: center; color: grey; float: left;">Level Score :</span> <strong  style=" float: right;" class="assertive">{{levelScore}}</strong><br>
                 <span style="text-align: center; color: grey; float: left;">Performance bonus :</span> <strong style=" float: right;"  class="assertive">{{bonus}}</strong><br>
                  <span style="text-align: center; color: grey; float: left;">Total Score :</span> <strong style=" float: right;" class="assertive">{{sessobj.score}}</strong><br><br>
                 <p class="confBtn" align="center" ng-click="GEH_btn()">Yaaaaaaay!!!</p>
                  `
        });


          $rootScope.GEH_btn=function(){

                 gameDoneSaver('closed');
                 CHAR_REBOOT();
                 $state.go('app.home');
                 output.removeChild($rootScope.renderer.domElement);
                 delete $rootScope.sessobj;
                 $ionicLoading.hide();
          };
      }

    var castedStage=utilityFctr.stringCaster(sessobj.stage);
    var returnPack={};
        
    switch(castedStage){
        case 1:
          // console.log('it runs', player_arr[3].locked);
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:1, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='1'; 
          $rootScope.sessobj.stage='2';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=3;
          lvlEndHUD();

        break;
        case 2:
          //this level releases players
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:2, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='2';
          $rootScope.sessobj.stage='3';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;

          var player_arr=storageService.get('player_arr');
          if (player_arr[4].locked==true) {
              player_arr[4].locked=false;
              $rootScope.playerReleased=true;
              storageService.set('player_arr', player_arr);
            }
              
          mins=3;
          lvlEndHUD();

        break;
        case 3:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:3, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='3';
          $rootScope.sessobj.stage='4';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=3;
          lvlEndHUD();
        break;
        case 4:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:4, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='4';
          $rootScope.sessobj.stage='5';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;

          var player_arr=storageService.get('player_arr');
          if (player_arr[3].locked===true) {
              player_arr[3].locked=false;
              $rootScope.playerReleased=true;
              storageService.set('player_arr', player_arr);
            };
          mins=3;
          lvlEndHUD();
        break;
        case 5:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:5, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='5';
          $rootScope.sessobj.stage='6';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          $rootScope.playerReleased=true;
          var player_arr=storageService.get('player_arr');

          if (player_arr[2].locked===true) {
              player_arr[2].locked=false;
              $rootScope.playerReleased=true;
            };

          if (player_arr[5].locked===true) {
              player_arr[5].locked=false;
              $rootScope.playerReleased=true;
            };

          storageService.set('player_arr', player_arr);
          mins=4;
          lvlEndHUD();
        break;
        case 6:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:6, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='6';
          $rootScope.sessobj.stage='7';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=4;
          lvlEndHUD();
        break;
        case 7:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:7, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='7';
          $rootScope.sessobj.stage='8';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          $rootScope.playerReleased=true;
          var player_arr=storageService.get('player_arr');

         if (player_arr[7].locked===true) {
            player_arr[7].locked=false;
            $rootScope.playerReleased=true;
            storageService.set('player_arr', player_arr);
          };

          mins=4;

          lvlEndHUD();
        break;
        case 8:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:8, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='8';
          $rootScope.sessobj.stage='9';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=4;
          lvlEndHUD();
        break;
        case 9:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:9, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='9';
          $rootScope.sessobj.stage='10';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=4;
          lvlEndHUD();
        break;        
        case 10:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:10, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='10';
          $rootScope.sessobj.stage='11';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=5;
          lvlEndHUD();
        break;
        case 11:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:11, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='11';
          $rootScope.sessobj.stage='12';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=5;
          lvlEndHUD();
        break;
        case 12:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:12, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='12';
          $rootScope.sessobj.stage='13';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=5;
          lvlEndHUD();
        break;
        case 13:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:13, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='13';
          $rootScope.sessobj.stage='14';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=5;
          lvlEndHUD();
        break;
        case 14:
          pause_();
          $rootScope.bonus=calculateBonus('next_level');
          $rootScope.sessobj.lvls.push({lvl:14, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='14';
          $rootScope.sessobj.stage='15';
          utilityService2.bonusHealth($rootScope.bonus);
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          mins=5;
          lvlEndHUD();
        break;
        case 15:
          pause_();
          $rootScope.bonus=calculateBonus('levels_done');
          $rootScope.sessobj.lvls.push({lvl:15, lvlScore:$rootScope.levelScore, lvlBonus:$rootScope.bonus});
          $rootScope.lvlCompleted='15';
          $rootScope.sessobj.score=$rootScope.sessobj.score+$rootScope.bonus;
          gameEndHUD();          
        break;
    }
  }
}
});

})();

