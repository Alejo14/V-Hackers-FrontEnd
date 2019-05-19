angular.module('vHackersModule').controller('administradorSemestreCtrl', ['$scope', '$state' , '$stateParams' ,'administradorSemestreService', '$uibModal',

function($scope, $state,$stateParams, administradorSemestreService, $uibModal){
  var ctrl = this;
  ctrl.entregableM=[];
  ctrl.id=0;

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
    console.log(angular.toJson(semestre));//Envio el json para crear el semestre
    yearI = semestre.fechaInicio.getFullYear();
    monthI = semestre.fechaInicio.getMonth();
    dateI = semestre.fechaInicio.getDate();
    yearF = semestre.fechaFin.getFullYear();
    monthF = semestre.fechaFin.getMonth();
    dataF = semestre.fechaFin.getDate();
    data = {
      "id": uuid(), //Defecto
      "añoCiclo": semestre.anioCiclo,
      "ciclo": semestre.ciclo,
      "tipoCiclo": semestre.tipoCiclo,
      "nombreCiclo": semestre.nombreCiclo,
      "fechaInicio": (new Date(yearI, monthI, dateI)),//Se da formato a la fecha para que se registre
      "fechaFin": (new Date(yearF, monthF, dateF)),//Se da formato a la fecha para que se registre
    }
    administradorSemestreService.registroSemestre(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "El semestre fue creado exitosamente" , "success");
    });
    semestre.id = 0;
    semestre.anioCiclo = "";
    semestre.ciclo = "";
    semestre.tipoCiclo = "";
    semestre.nombreCiclo = "";
    semestre.fechaInicio = "";
    semestre.fechaFin = "";
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
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $state.go('administrador');
      }
    });
  };



}]);
