// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config (function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.navBar.alignTitle("center");

  $stateProvider

  //creando un estado abstracto para manipular en las vistas
  .state('tab',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab.html'
  })

  // a cada pagina se le asigna un tab 
  .state('tab.home',{
    url: '/home',
    views:{
      'tab-home':{
        templateUrl: 'templates/home.html', 
        controller: 'CtrlHome'
      }
    }
  })

  // a cada pagina se le asigna un tab 
  .state('tab.coche',{
    url: '/coche',
    views:{
      'tab-coche':{
        templateUrl: 'templates/coche.html', 
        controller: 'CtrlCoche'
      }
    }
  })

   // a cada pagina se le asigna un tab 
  .state('tab.comunidad',{
    url: '/comunidad',
    views:{
      'tab-comunidad':{
        templateUrl: 'templates/comunidad.html', 
        controller: 'CtrlComunidad' 
      }
    }
  })

   // a cada pagina se le asigna un tab 
  .state('tab.user',{
    url: '/user/:id',
    views:{
      'tab-user':{
        templateUrl: 'templates/user.html',
        controller: 'CtrlUser' 
      }
    }
  })

   // a cada pagina se le asigna un tab 
  .state('tab.datos',{
    url: '/datos',
    views:{
      'tab-datos':{
        templateUrl: 'templates/datos.html', 
        controller: 'CtrlDatos' 
      }
    }
  })

   // a cada pagina se le asigna un tab 
  .state('tab.info',{
    url: '/info',
    views:{
      'info':{
        templateUrl: 'templates/info.html' 
      }
    }
  })

  //en caso de no encontrar vista me devuelve la siguiente
  $urlRouterProvider.otherwise('/tab/home');
})

.controller ('CtrlHome',function($scope){
  console.log ("Entrado en la Home");
})

.controller ('CtrlCoche',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('js/data.json')
  .success(function(data){
    $scope.detalles = data.detalles
    $scope.data = {showReorder:false} 
  });

  $scope.toggleDescripcion = function(item){
    item.resumido = !item.resumido;
  }

  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.detalles.splice(fromIndex,1);
    $scope.detalles.splice(toIndex,0,item);
  }
}])

.controller ('CtrlUser',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('js/data.json')
  .success(function(data){
    $scope.data = data.usuarios[$state.params.id];
  });
}])

.controller ('CtrlComunidad',['$scope','$http','$state',function($scope, $http, $state){
  $http.get('js/data.json')
  .success(function(data){
   $scope.usuarios = data.usuarios;
  });
}])

.controller ('CtrlDatos',function($scope){
 $scope.getPosicion= function(){
  var form = this;
  navigator.geolocation.getCurrentPosition(function(position){
    form.posicion = position.coords.latitude + " - " + position.coords.longitude
  });
 }

 $scope.sendForm = function(){
  alert(this.nombre + "-" + this.apellidos);
 }

})
