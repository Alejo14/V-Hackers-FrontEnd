angular.module('vHackersModule').controller('nuevoCriterioListaCtrl', ['$scope','$uibModalInstance', 'nuevaEscalaService', 'parametros',
function($scope, $uibModalInstance, nuevaEscalaService, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
  }

  ctrl.rubricaId = parametros;

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  };

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
    }).then(function (criterioNuevoConfirmado) {
      if (criterioNuevoConfirmado !== "cancelar") {
        console.log(ctrl.criterio);
        $uibModalInstance.close(ctrl.criterio);
      }
    });
  };


  ctrl.init = function(){
  }
  ctrl.init();

}])
