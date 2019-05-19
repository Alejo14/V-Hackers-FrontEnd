angular.module('vHackersModule').controller('creacionCursosCtrl', ['$scope','$state' ,'creacionCursosService', '$uibModal',
function($scope,$state, gestionUsuariosService, $uibModal){
  var ctrl = this;
  ctrl.cargaUnitaria = true;
  ctrl.cursoNuevo = {
    "id": "",
    "claveCurso": "",
    "numeroCreditos": "",
    "facultad": "",
    "especialidad": ""
  };
  ctrl.listaCursos = [];

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
  }

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.regresarAdministrador = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardaran",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger",
          value: "cancelar"
        },
        confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco",
          value: "confirm"
        }
      }
    }).then(function(regresar){
      if (regresar == "confirm") {
        $state.go('administrador');
      }
      else{
        swal({
          title: "Curso nuevo",
          text:"{{ctrl.cursoNuevo.claveCurso}},ctrl.cursoNuevo.nombreCurso, ctrl.cursoNuevo.numeroCreditos, ctrl.cursoNuevo.facultad,ctrl.cursoNuevo.especialidad"
        });
      }
    });
  };

  ctrl.guardarCurso = function () {
    swal({
      title: "¿Está seguro de que quieres guardar?",
      text: "Los cambios se guardaran",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger",
          value: "cancelar"
        },
        confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco",
          value: "confirm"
        }
      }
    }).then(function(guardar){
      if (guardar == "confirm") {
        swal({
          title: "Curso guardado",
          icon:"success",
          text:"{{ctrl.cursoNuevo.claveCurso}},ctrl.cursoNuevo.nombreCurso, ctrl.cursoNuevo.numeroCreditos, ctrl.cursoNuevo.facultad,ctrl.cursoNuevo.especialidad"
        });
      }
    });
  };
}]);
