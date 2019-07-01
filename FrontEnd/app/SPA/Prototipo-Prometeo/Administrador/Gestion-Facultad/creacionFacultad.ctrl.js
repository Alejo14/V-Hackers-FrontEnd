angular.module('vHackersModule').controller('creacionFacultadCtrl', ['$scope','$state' ,'$stateParams','creacionFacultadService', '$uibModal',
function($scope,$state,$stateParams , creacionFacultadService, $uibModal){
  var ctrl = this;

  ctrl.titulo = 'Gestión de facultad';
  ctrl.cargaUnitaria = 1;
  ctrl.tablaFacultades=[];
  ctrl.facultadesLista=[];
  ctrl.facultadActual = {
    id:"",
    codigo:"",
    nombre:""
  };
  ctrl.modo = 'c';


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
      title: "¿Estás seguro de que quieres volver?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function(respuesta){
      if (respuesta == "Confirm") {
        $state.go('inicioAdmin');
      }
    });
  }

  ctrl.guardarFacultad = function(){
      swal({
        title: "¿Estás seguro de que quieres registrar la facultad?",
        icon: "warning",
        buttons: {
          Cancel: {
            text: "Cancelar",
            className: "btn btn-lg btn-danger"
          },
          Confirm: {
            text: "Sí, guardar",
            className: "btn btn-lg color-fondo-azul-pucp color-blanco"

          }
        }
      }).then(function(respuesta){
        if (respuesta == "Confirm") {
          if(ctrl.modo == 'c'){
            ctrl.facultadActual.id = uuid();
            creacionFacultadService.registroFacultad(ctrl.facultadActual, ctrl.modo).then(function () {
              ctrl.facultadActual.id = '';
              ctrl.facultadActual.nombre = '';
              ctrl.facultadActual.codigo = '';
              ctrl.obtenerFacultades();
              ctrl.modo = 'c';
            });
          } else {
            creacionFacultadService.modificarFacultad(ctrl.facultadActual).then(function () {
              ctrl.facultadActual.id = '';
              ctrl.facultadActual.nombre = '';
              ctrl.facultadActual.codigo = '';
              ctrl.obtenerFacultades();
              ctrl.modo = 'c';
            });
          }

        }
      });
  }

  ctrl.obtenerFacultades = function(){
    creacionFacultadService.obtenerFacultades().then(function (facultadesListaData) {
        ctrl.facultadesLista = facultadesListaData;
    });
  }

  ctrl.eliminarFacultad = function(facultad,$index){
    swal({
      title: "¿Estás seguro de que quieres eliminar la facultad?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function(respuesta){
      if (respuesta == "Confirm") {
        creacionFacultadService.eliminarFacultad(facultad);
        ctrl.facultadesLista.splice($index,1);
      }
    });

  }

  ctrl.editarFacultad = function(facultad){
    ctrl.facultadActual.codigo = facultad.codigo;
    ctrl.facultadActual.id = facultad.id;
    ctrl.facultadActual.nombre = facultad.nombre;
    ctrl.modo = 'm';
  }

  ctrl.init = function (){
    ctrl.obtenerFacultades();
    ctrl.modo ='c';
  };

  ctrl.init();

}]);
