angular.module('vHackersModule').controller('vistaPrincipalProfesorCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cursoProfesor = function(){
    $state.go('curso');
  }

  ctrl.calificacionEntregable = function(){
    $state.go('calificacion', {entregableId: "fd41bbff-2f4b-4634-adb5-20f4d8b3cc1f", avanceEntregableId:"75e825bc-81d0-11e9-bc42-526af7764f64"});
  }

  ctrl.listarEntregables = function(){
    $state.go('evaluacion-herramienta-listar');
  }

  ctrl.misCursos = function(){
    $state.go('profesorMisCursos');
  }
}]);
