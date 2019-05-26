angular.module('vHackersModule').controller('vistaPrincipalProfesorCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cursoProfesor = function(){
    $state.go('curso');
  }

  ctrl.calificacionEntregable = function(){
    $state.go('calificacion');
  }

  ctrl.listarEntregables = function(){
    $state.go('evaluacion-herramienta-listar');
  }

  ctrl.misCursos = function(){
    $state.go('profesorMisCursos');
  }
}]);
