angular.module('vHackersModule').controller('listarAlumnosCursoCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'listarAlumnosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, listarAlumnosService, NgTableParams){
  var ctrl = this;
  ctrl.horario = {};
  ctrl.alumnosLista = [];
  ctrl.alumnosListaTotal = [];
  ctrl.alumnosListaFiltro = [];
  ctrl.conjuntosLista = [];
  ctrl.nombreAgrupacionNueva = "";
  ctrl.filtro = {};
  ctrl.cursoCicloId = '';

  ctrl.obtenerAlumnos = function (horarioId) {
    listarAlumnosService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.alumnosLista = alumnosListaData;
      ctrl.alumnosListaTotal = alumnosListaData;
      // console.log(alumnosListaData);
    });
    ctrl.alumnosTabla = new NgTableParams({}, { dataset: ctrl.alumnosLista });
  };

  ctrl.verDetalleAlumno = function (alumno) {
  };

  function uuid() {
      function randomDigit() {
          if (crypto && crypto.getRandomValues) {
              var rands = new Uint8Array(1);
              crypto.getRandomValues(rands);
              return (rands[0] % 16).toString(16);
          } else {
              return ((Math.random() * 16) | 0).toString(16);
          }
      }
      var crypto = window.crypto || window.msCrypto;
      return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
  };

  ctrl.filtrarListaAlumnos = function (filtro) {
    console.log(filtro.codigo);
    ctrl.alumnosLista = ctrl.alumnosListaTotal.filter(function(alumno) {
      var codigo = true;
      var nombre = true;
      var correo = true;
      var especialidad = true;

      if(filtro.codigo){
        codigo = alumno.codigo.includes(filtro.codigo);
      }
      if(filtro.nombre){
        nombre = alumno.nombreCompleto.toLowerCase().includes(filtro.nombre.toLowerCase());
      }
      if(filtro.correo){
        correo = alumno.correo.toLowerCase().includes(filtro.correo.toLowerCase());
      }
      if(filtro.especialidad){
        especialidad = alumno.nombreEspecialidad.toLowerCase().includes(filtro.especialidad.toLowerCase());
      }

      return codigo & nombre & correo & especialidad;
    });
    console.log(ctrl.alumnosLista);
  };

  ctrl.limpiarFiltroAlumnos = function (){
    ctrl.filtro = {};
    ctrl.filtrarListaAlumnos(ctrl.filtro);
  }

  ctrl.verGrupos = function () {
    $state.go('grupos',  {cursoCicloId: ctrl.cursoCicloId, cursoNombre: ctrl.horario.cursoNombre, horarioNombre: ctrl.horario.horarioNombre, horarioId: ctrl.horario.horarioId});
  };

  ctrl.volverCurso = function () {
    $state.go('curso', {cursoCicloId: ctrl.cursoCicloId, horarioId: ctrl.horario.horarioId});
  };

  ctrl.init = function () {
    ctrl.cursoCicloId = $stateParams.cursoCicloId;
    ctrl.horario.cursoNombre = $stateParams.cursoNombre;
    ctrl.horario.horarioNombre = $stateParams.horarioNombre;
    ctrl.horario.horarioId = $stateParams.horarioId;

    ctrl.obtenerAlumnos(ctrl.horario.horarioId);
  };

  ctrl.init();
}]);
