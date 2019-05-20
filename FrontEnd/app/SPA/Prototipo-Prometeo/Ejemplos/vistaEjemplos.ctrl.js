angular.module('vHackersModule').controller('vistaEjemplosCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.tabla = function(){
    $state.go('tabla');
  }

  ctrl.listaAlumnos = function(){
    $state.go('listaAlumnos');
  }
}]);
