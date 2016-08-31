// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}

var myApp = angular.module('starter', ['ionic'])

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

myApp.controller('calculaController', ['$scope', function($scope) {
  $scope.decimal = 0.3;
  $scope.periodo = 1;
  $scope.decimalmostrar = '';
  $scope.periodoextract = null;
  $scope.entero= null;
  $scope.partedecimal= null;
  $scope.anteperiodo= null;
  $scope.periodorep= null;
  $scope.numeradorA= null;
  $scope.numeradorB= null;
  $scope.numeradorC= null;
  $scope.denominadorA= null;
  $scope.denominadorB= null;
  $scope.denominadorC= null;
  $scope.resultado= null;
  $scope.final= '';

  $scope.calcula = function calcula(decimal, periodo) {
    decimalstr=decimal.toString(); 
    $scope.entero=decimalstr.substring(0,decimalstr.indexOf(".")); //Math.trunc(decimal);
    enterostr=$scope.entero.toString();
    
    periodostr=decimalstr.substring(decimalstr.length-periodo);
    $scope.periodorep=periodostr;
    $scope.partedecimal=decimalstr.substring(enterostr.length);
    $scope.anteperiodo= $scope.partedecimal.substring(0,$scope.partedecimal.length-periodostr.length);
    if ($scope.partedecimal.length>$scope.periodo){
      if (periodo==0){
        $scope.decimalmostrar=decimalstr; 
        $scope.numeradorA= enterostr;
        $scope.numeradorB= $scope.anteperiodo.substring(1);
        $scope.numeradorC= parseInt($scope.numeradorA + $scope.numeradorB).toString();
        $scope.denominadorA= '1';
        $scope.denominadorB= "0".padRight($scope.partedecimal.length-1, "0");
        $scope.denominadorC= $scope.denominadorA + $scope.denominadorB;
        $scope.final= '';
      }else{
        $scope.decimalmostrar=decimalstr+periodostr+periodostr+'...'; 
        $scope.numeradorA= parseInt(enterostr+$scope.partedecimal.substring(1)).toString();
        $scope.numeradorB= parseInt(enterostr+$scope.anteperiodo.substring(1)).toString();
        if ($scope.numeradorB=="0"){
          $scope.numeradorC= $scope.numeradorA;
        }else{
          $scope.numeradorC= $scope.numeradorA + " - " + $scope.numeradorB;
        }
        $scope.denominadorA= '9'.padRight($scope.periodorep.length, "9");
        $scope.denominadorB= "".padRight($scope.anteperiodo.length-1, "0");
        $scope.denominadorC= $scope.denominadorA + $scope.denominadorB;
        $scope.final= '...';
      }
    $scope.resultado= eval($scope.numeradorC);   
    }else{
      $scope.numeradorC='Error';
      $scope.denominadorC='';
      $scope.final='';
      $scope.resultado= 'Periodo mayor que la parte decimal';
    } 
  };

  $scope.calcula($scope.decimal,$scope.periodo);

}]);