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
      title: "¿Estás seguro de que deseas seleccionar el responsable?",
      icon: "warning",
      buttons: {
        Cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, agregar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (responsableConfirmado) {
      if (responsableConfirmado == "Confirm") {
        $uibModalInstance.close(ctrl.responsableSeleccionado);
      }
    });
  };

  ctrl.init = function(){
    ctrl.listarResponsables();

  ctrl.cerrar = function () {
    $uibModalInstance.close(0);
  };

  ctrl.init();

};
