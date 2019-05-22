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

    administradorEspecialidadService.registroEspecialidad(angular.toJson(data)).then(function () {
      swal("¡Bien hecho!", "La especialidad fue creada exitosamente" , "success").then(function () {
        $state.go('inicioAdmin');
      });
    });

  };

  ctrl.agregarResponsable = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/modalResponsable.html',
      controller: 'especialidadResponsableCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        var responsableSeleccionado = {
          "id": parametroRetorno.id,
          "nombres": parametroRetorno.nombres,
        };
        ctrl.especialidad.responsable = responsableSeleccionado.id;
        swal({
          title: "¡Listo!",
          text: "Responsable seleccionado con éxito",
          icon: "success",
          buttons: {
            confirm: {
              text: "ok",
              className: "btn btn-lg color-fondo-azul-pucp color-blanco"
            }
          }
        });
      }
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
    }).then(function (especialidadNuevaConfirma) {
      if (especialidadNuevaConfirma !== "cancelar") {
        $state.go('inicioAdmin');
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
