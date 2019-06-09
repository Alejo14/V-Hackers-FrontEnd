angular.module('vHackersModule').controller('administradorCtrl', ['$scope', '$state' , '$stateParams' ,'administradorService', '$uibModal',

function($scope, $state,$stateParams, administadorService, $uibModal){
  var ctrl = this;

  ctrl.crearSemestre = function(semestre){
    $state.go('crear-semestre');
  }

  ctrl.listarSemestres = function(semestre){
    $state.go('listar-semestres')
  }

  ctrl.crearEspecialidad = function(especialidad){
    $state.go('crear-especialidad');
  }

  ctrl.listarEspecialidades = function(especialidades){
    $state.go('listar-especialidades')
  }

  ctrl.crearCurso = function(curso){
    $state.go('creacion-cursos',{id:0,especialidadId:0,codigo:0,nombre:0,fechaCreacion:0,facultadId:0,creditos:0});
  }

  ctrl.listarCursos = function(cursos){
    $state.go('gestion-horarios');
  }

  ctrl.gestionUsuarios = function(cursos){
    $state.go('gestion-usuarios');
  }
}]);
