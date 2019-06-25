angular.module('vHackersModule').controller('vistaPrincipalProfesorCtrl', ['$scope', '$state' , '$stateParams', '$uibModal',

function($scope, $state,$stateParams, $uibModal){
  var ctrl = this;

  ctrl.cursoProfesor = function(){
    $state.go('curso');
  }

  ctrl.calificacionEntregable = function(){
    $state.go('calificacion', {avanceEntregableId:"2f4827c3-b97d-4b36-9c91-088d034b795b", herramientaCalificada: 0});
  }

  ctrl.misCursos = function(rol){
    $state.go('profesorMisCursos',{rolUsuario: rol});
  }
}]);
