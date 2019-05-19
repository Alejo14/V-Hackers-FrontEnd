angular.module('vHackersModule').controller('administradorEspecialidadCtrl', ['$scope', '$state' , '$stateParams' ,'administradorEspecialidadService', '$uibModal',

function($scope, $state,$stateParams, administradorEspecialidadService, $uibModal){
  var ctrl = this;
  ctrl.cargaUnitaria = true;

  ctrl.especialidad = {

    codigo : "",
    nombre : "",
    facultad : "",
    responsable : ""
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

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.crearEspecialidad = function(especialidad) {
    data = {
      "id": uuid(), //Defecto
      "codigo": especialidad.codigo,
      "nombre": especialidad.nombre,
      "facultad": especialidad.facultad,
      "responsable": especialidad.responsable,
    }
    console.log(angular.toJson(data));//Envio el json para crear el semestre

    administradorSemestreService.registroSemestre(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "El semestre fue creado exitosamente" , "success");
    });
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
    }).then(function (especialidadConfirma) {
      if (especialidadConfirma !== "cancelar") {
        $state.go('administrador');
      }
    });
  };

  ctrl.facultadesLista = [
    {
      id: '0',
      nombre: 'Ciencias e ingeniería'
    },
    {
      id: '1',
      nombre: 'Estudios Generales Ciencias'
    }
  ];
  // ctrl.obtenerFacultades = function () {
  //   gestionUsuariosService.obtenerFacultades().then(function (facultadesListaData) {
  //     ctrl.facultadesLista = facultadesListaData;
  //   });
  // };





}]);
