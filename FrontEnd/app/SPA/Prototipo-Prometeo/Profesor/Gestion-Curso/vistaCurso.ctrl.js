angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', '$state' , '$stateParams' ,'profesorCursoService', '$uibModal',

function($scope, $state,$stateParams, profesorCursoService, $uibModal){
  var ctrl = this;
  ctrl.nombreCurso = "Ingeniería de Software";
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.proyectosLista = [];
  ctrl.cargarProyectos = function () {
    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
    });
  };
  ctrl.crearEntregable = function(entregable){

    $state.go('evaluacion-herramienta');
  }
  ctrl.swalProyecto = function () {
    $state.go('gestion-proyecto' , {id: 0, nombre: 0, fechaCreacion: 0, fechaInicio: 0, fechaFin: 0, ponderacion: 0});
  };
  ctrl.entregablesLista = [];
  ctrl.cargarEntregables = function () {
    profesorCursoService.listarEntregables().then(function (entregablesListaData) {
      ctrl.entregablesLista = entregablesListaData;
    });
  };
  ctrl.swalEntregable = function () {
    swal("¡Bien hecho!", "El entregable se creo exitosamente", "success");
  };

  ctrl.verProyecto = function (proyecto) {
    $state.go('gestion-proyecto' , {id: proyecto.id, nombre: proyecto.nombre, fechaCreacion: proyecto.fechaCreacion, fechaInicio: proyecto.fechaInicio, fechaFin: proyecto.fechaFin, ponderacion: proyecto.ponderacion});
  };

  ctrl.init = function (){
    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
