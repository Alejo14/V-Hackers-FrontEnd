angular.module('vHackersModule').controller('nuevoCriterioCtrl', ['$scope','$uibModalInstance', 'rubrica',
function($scope, $uibModalInstance, rubrica){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: ""
  }

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  }

  ctrl.guardarCriterio = function () {
    swal({
      title: "¿Esta seguro de que desea agregar este criterio?",
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
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $uibModalInstance.close(ctrl.criterio);
      }
    });
  };

}])
