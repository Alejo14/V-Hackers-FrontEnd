angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', 'profesorCursoService', '$uibModal',

function($scope, profesorCursoService, $uibModal){
  var ctrl = this;
  ctrl.nombreCurso = "Ingeniería de Software";
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.proyectosLista = [];
  ctrl.cargarProyectos = function () {
    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
    });
  };
  ctrl.swalProyecto = function () {
    swal("¡Bien hecho!", "El proyecto se creo exitosamente", "success");
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

  ctrl.init = function (){
    ctrl.cargarProyectos();
    ctrl.cargarEntregables();
  }

  ctrl.init();
}]);
