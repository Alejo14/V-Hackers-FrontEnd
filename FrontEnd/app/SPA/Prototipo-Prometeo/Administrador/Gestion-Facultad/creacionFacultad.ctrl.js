angular.module('vHackersModule').controller('creacionFacultadCtrl', ['$scope','$state' ,'$stateParams','creacionFacultadService', '$uibModal',
function($scope,$state,$stateParams , creacionFacultadService, $uibModal){
  var ctrl = this;

  ctrl.titulo = 'Creación de Facultad';
  ctrl.cargaUnitaria = 1;
  ctrl.modo = 'm';
  ctrl.tablaFacultades=[];
  ctrl.facultadesLista=[];
  ctrl.facultadActual = {
    id:"",
    codigo:"",
    nombre:""
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
  }

  ctrl.guardarFacultad = function(){
      swal({
        title: "¿Está seguro de que quiere registrar la facultad?",
        text: "Los cambios no se guardaran",
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
      }).then(function(regresar){
        if (regresar == "confirm") {
          ctrl.facultadActual.id = uuid();
          creacionFacultadService.registroFacultad(ctrl.facultadActual).then(function () {
            ctrl.facultadesLista.push(ctrl.facultadActual);
            ctrl.facultadActual.id = '';
            ctrl.facultadActual.nombre = '';
            ctrl.facultadActual.codigo = '';
          });
        }
      });
  }

  ctrl.obtenerFacultades = function(){
    creacionFacultadService.obtenerFacultades().then(function (facultadesListaData) {
        ctrl.facultadesLista = facultadesListaData;
    });
  }



  ctrl.init = function (){
    ctrl.obtenerFacultades();
  };


  ctrl.init();

}]);
