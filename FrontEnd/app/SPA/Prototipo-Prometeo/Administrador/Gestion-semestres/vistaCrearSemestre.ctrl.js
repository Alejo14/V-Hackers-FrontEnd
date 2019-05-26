angular.module('vHackersModule').controller('administradorSemestreCtrl', ['$scope', '$state' , '$stateParams' ,'administradorSemestreService', '$uibModal',

function($scope, $state,$stateParams, administradorSemestreService, $uibModal){
  var ctrl = this;
  ctrl.semestre={
    anioCiclo : "",
    ciclo : "",
    tipoCiclo : "",
    nombreCiclo : "",
    fechaInicio : "",
    fechaFin : ""
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
  }

  ctrl.crearSemestre = function(semestre){
    yearI = semestre.fechaInicio.getFullYear();
    monthI = semestre.fechaInicio.getMonth();
    dateI = semestre.fechaInicio.getDate();
    yearF = semestre.fechaFin.getFullYear();
    monthF = semestre.fechaFin.getMonth();
    dateF = semestre.fechaFin.getDate();
    data = {
      "id": uuid(), //Defecto
      "cicloAcademico": semestre.anioCiclo + semestre.ciclo + semestre.tipoCiclo,
      "nombreCiclo": semestre.nombreCiclo,
      "fechaInicio": (new Date(yearI, monthI, dateI))*1,//Se da formato a la fecha para que se registre
      "fechaFin": (new Date(yearF, monthF, dateF))*1,//Se da formato a la fecha para que se registre
    }
    if (((new Date(yearI, monthI, dateI))*1) < ((new Date(yearF, monthF, dateF))*1)) {
      administradorSemestreService.registroSemestre(angular.toJson(data)).then(function () {
        swal("¡Bien hecho!", "El semestre fue creado exitosamente" , "success").then(function () {
          $state.go('inicioAdmin');
        });
      });
    } else {
      swal("¡Error!", "Seleccione una fecha fin mayor a la fecha inicio", "error");
    }
  };

  ctrl.validarRegistroValido = function () {
    ctrl.registroValido = ctrl.semestre.anioCiclo !== "" && ctrl.semestre.ciclo !== "" && ctrl.semestre.tipoCiclo !== "" && ctrl.semestre.nombreCiclo !== "" &&  ctrl.semestre.fechaInicio !== "" && ctrl.semestre.fechaFin !== "";
  };


  ctrl.regresarAdministrador = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardaran",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (semestreNuevoConfirma) {
      if (semestreNuevoConfirma !== "cancelar") {
        $state.go('inicioAdmin');
      }
    });
  };



}]);
