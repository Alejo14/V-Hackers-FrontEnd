angular.module('vHackersModule').controller('creacionFacultadCtrl', ['$scope','$state' ,'$stateParams','creacionFacultadService', '$uibModal',
function($scope,$state,$stateParams , creacionCursosService, $uibModal){
  var ctrl = this;

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
        $state.go('inicioAdmin');
      }
    });
  };



  ctrl.init = function (){

  }


  ctrl.init();

}]);
