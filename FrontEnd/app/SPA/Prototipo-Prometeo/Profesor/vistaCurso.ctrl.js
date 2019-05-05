angular.module('vHackersModule').controller('profesorCursoCtrl', ['$scope', 'profesorCursoService', '$uibModal',

function($scope, hackersService, $uibModal){
  var ctrl = this;
  ctrl.nombreCurso = "Ingeniería de Software";
  ctrl.mensajeNuevo = "Go V-Hackers";

  ctrl.proyectosLista = ["Proyecto Sistema de Ventas","Proyecto Web Scraper"];
  ctrl.cargarProyectos = function () {
    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
    });
  };
  ctrl.swalProyecto = function () {
    swal("¡Bien hecho!", "El proyecto se creo exitosamente", "success");
  };

  ctrl.entregablesLista = ["Exposición Microservicios","Exposición Integración continua"];
  ctrl.cargarEntregables = function () {
    profesorCursoService.listarProyectos().then(function (proyectosListaData) {
      ctrl.proyectosLista = proyectosListaData;
    });
  };
  ctrl.swalEntregable = function () {
    swal("¡Bien hecho!", "El entregable se creo exitosamente", "success");
  };
}]);
