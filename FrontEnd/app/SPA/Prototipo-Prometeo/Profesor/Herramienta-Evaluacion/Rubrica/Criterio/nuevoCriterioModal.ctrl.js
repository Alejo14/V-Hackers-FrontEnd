angular.module('vHackersModule').controller('nuevoCriterioCtrl', ['$scope','$uibModalInstance', 'parametros',
function($scope, $uibModalInstance, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
    nivelesCriterio: []
  }

  ctrl.rubricaId = parametros.id;

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  };
  ctrl.nivelesRubrica = [
      {
        id: "",
        descripcion: "Alta",
        puntaje: 10
      },
      {
        id: "",
        descripcion: "Media",
        puntaje: 5
      },
      {
        id: "",
        descripcion: "Baja",
        puntaje: 0
      }
    ];
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
        $uibModalInstance.close(ctrl.criterio);
      }
    });
  };

}])
