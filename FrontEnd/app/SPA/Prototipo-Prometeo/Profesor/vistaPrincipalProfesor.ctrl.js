angular.module('vHackersModule').controller('vistaPrincipalProfesorCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cursoProfesor = function(){
    $state.go('curso');
  }

  ctrl.calificacionEntregable = function(){
    $state.go('calificacion', {avanceEntregableId:"146413c7-a887-4d1c-8470-65d231b66e58"});
  }

  ctrl.listarEntregables = function(){
    $state.go('evaluacion-herramienta-listar');
  }

  ctrl.misCursos = function(rol){
    $state.go('profesorMisCursos',{rolUsuario: rol});
  }
}]);
