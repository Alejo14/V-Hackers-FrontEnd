angular.module('vHackersModule').controller('listarAlumnosCursoCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'listarAlumnosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, listarAlumnosService, NgTableParams){
  var ctrl = this;
  ctrl.horario = {};
  ctrl.alumnosLista = [];
  ctrl.obtenerAlumnos = function (horarioId) {
    listarAlumnosService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.alumnosLista = alumnosListaData;
      ctrl.alumnosTabla = new NgTableParams({}, { dataset: ctrl.alumnosLista });
    });
  };

  ctrl.verDetalleAlumno = function (alumno) {

  }

  ctrl.init = function () {
    ctrl.horario.cursoNombre = $stateParams.cursoNombre;
    ctrl.horario.horarioNombre = $stateParams.horarioNombre;
    ctrl.horario.horarioId = $stateParams.horarioId;

    ctrl.obtenerAlumnos(ctrl.horario.horarioId);
  }

  ctrl.init();
}]);
