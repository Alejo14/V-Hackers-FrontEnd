angular.module('vHackersModule').controller('especialidadResponsableCtrl', especialidadResponsableCtrl);

especialidadResponsableCtrl.$inject = ['$scope', '$uibModalInstance', 'NgTableParams','administradorEspecialidadService','parametros'];

function especialidadResponsableCtrl ($scope, $uibModalInstance, NgTableParams, administradorEspecialidadService,parametros){

  var ctrl = this;

  ctrl.responsableSeleccionado = {};

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.responsablesLista = [];
  ctrl.listarResponsables = function () {
    administradorEspecialidadService.listarResponsables().then(function (responsablesListaData) {
      ctrl.responsablesLista = responsablesListaData;
    });
  };

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
    ctrl.listarResponsables();
    // if (responsableNombre.length > 1) {
    //
    // }
  };

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };

  ctrl.init();

};
