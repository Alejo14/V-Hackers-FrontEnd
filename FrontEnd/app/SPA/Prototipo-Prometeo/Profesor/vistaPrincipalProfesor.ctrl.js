angular.module('vHackersModule').controller('vistaPrincipalProfesorCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cursoProfesor = function(){
    $state.go('curso');
  }

  ctrl.calificacionEntregable = function(){
    $state.go('calificacion', {avanceEntregableId:"3afae04d-9fb7-4b92-939a-012a169fda08"});
  }

  ctrl.listarEntregables = function(){
    $state.go('evaluacion-herramienta-listar');
  }

  ctrl.misCursos = function(rol){
    $state.go('profesorMisCursos',{rolUsuario: rol});
  }
}]);
