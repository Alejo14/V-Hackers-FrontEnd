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

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.responsablesLista =
  [{
    n : "01",
    id : "42325bfb-767e-4323-bba0-d81b7c86facb",
    codigo : "20145648",
    nombre: "Jonathan Loli",
    correo: "jloli@pucp.pe"

  },
  {
    n : "02",
    id : "a6f5d4b2-4616-4649-be63-65d0eee79c96",
    codigo : "19960275",
    nombre: "Luis Flores",
    correo: "luis.flores@pucp.edu.pe"
  },
  {
    n : "03",
    id : "ff4da352-ff6b-456e-8ff9-9cf962cf496f",
    codigo : "20015612",
    nombre: "Walter Segama",
    correo: "wzegama@pucp.edu.pe"
  }];

  ctrl.tablaResponsables = new NgTableParams({}, { dataset: ctrl.responsablesLista });

  ctrl.seleccionarResponsable = function () {
    swal({
      title: "¿Esta seguro de que desea seleccionar a este responsable?",
      text: "",
      icon: "warning",
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
