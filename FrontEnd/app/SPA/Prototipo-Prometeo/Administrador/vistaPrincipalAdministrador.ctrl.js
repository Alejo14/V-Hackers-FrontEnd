angular.module('vHackersModule').controller('administradorCtrl', ['$scope', '$state' , '$stateParams' ,'administradorService', '$uibModal',

function($scope, $state,$stateParams, administadorService, $uibModal){
  var ctrl = this;
//  ctrl.nombreCurso = "Ingeniería de Software";
//  ctrl.mensajeNuevo = "Go V-Hackers";
//  ctrl.proyectosLista = [];
//  ctrl.cargarProyectos = function () {
//    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
//      ctrl.proyectosLista = proyectosListaData;
//    });
//  };

  ctrl.crearSemestre = function(semestre){
    $state.go('crear-semestre');
  }

  ctrl.crearEspecialidad = function(semestre){
    $state.go('crear-especialidad');
  }

  ctrl.crearCurso = function(curso){
    $state.go('creacion-cursos');
  }

  ctrl.listarCursos = function(cursos){
    $state.go('gestion-horarios');
  }

  ctrl.gestionUsuarios = function(cursos){
    $state.go('gestion-usuarios');
  }

  ctrl.listarEspecialidades = function(especialidades){
    $state.go('listar-especialidades')
  }

}]);
