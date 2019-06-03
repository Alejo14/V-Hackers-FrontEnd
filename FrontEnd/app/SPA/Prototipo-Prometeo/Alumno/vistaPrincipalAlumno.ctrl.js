angular.module('vHackersModule').controller('vistaPrincipalAlumnoCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cargarArchivos = function(){
    $state.go('cargar-archivos');
  }

  ctrl.verMisCursos = function(){
    $state.go('alumnoMisCursos');
  }
  // ctrl.calificacionEntregable = function(){
  //   $state.go('calificacion');
  // }
  //
  // ctrl.listarEntregables = function(){
  //   $state.go('evaluacion-herramienta-listar');
  // }
}]);
