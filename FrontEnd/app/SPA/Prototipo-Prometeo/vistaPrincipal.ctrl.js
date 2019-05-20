angular.module('vHackersModule').controller('vistaPrincipalCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.administrador = function(){
    $state.go('inicioAdmin');
  }

  ctrl.ejemplos = function(){
    $state.go('seleccionEjemplo');
  }

  ctrl.profesor = function(){
    $state.go('inicioProfes');
  }
}]);
