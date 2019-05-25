angular.module('vHackersModule').controller('especialidadResponsableCtrl', especialidadResponsableCtrl);

especialidadResponsableCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams','administradorEspecialidadService'];

function especialidadResponsableCtrl ($scope, $uibModalInstance, NgTableParams, administradorEspecialidadService){

  var ctrl = this;

  ctrl.responsableSeleccionado = {
    id : "",
    nombre : ""
  };

  // ctrl.obtenerResponsables = function () {
  //   administradorEspecialidadService.obtenerResponsables().then(function (responsablesListaData) {
  //     ctrl.responsablesLista = responsablesListaData;
  //   });
  // };
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

  ctrl.responsablesLista =
  [{
    n : "00",
    id : uuid(),
    nombre: "Alejandro Tapia",
    edad: 21,
    correo: "a.tapiat@pucp.pe"

  },
  {
    n : "01",
    id : uuid(),
    nombre: "Diego Paredes",
    edad: 21,
    correo: "a20151107@pucp.pe"
  },
  {
    n : "02",
    id : uuid(),
    nombre: "Leticia Amaya",
    edad: 21,
    correo: "leticia.amaya@pucp.edu.pe"
  }];

  ctrl.tablaResponsables = new NgTableParams({}, { dataset: ctrl.responsablesLista });

  ctrl.seleccionarResponsable = function () {
    swal({
      title: "¿Esta seguro de que desea seleccionar a este responsable?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (responsableConfirmado) {
      if (responsableConfirmado !== "cancelar") {
        console.log(ctrl.responsableSeleccionado);
        $uibModalInstance.close(ctrl.responsableSeleccionado);
      }
    });
  };

  ctrl.init = function(){
    //ctrl.obtenerResponsables();
  };

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };

  ctrl.init();

};
