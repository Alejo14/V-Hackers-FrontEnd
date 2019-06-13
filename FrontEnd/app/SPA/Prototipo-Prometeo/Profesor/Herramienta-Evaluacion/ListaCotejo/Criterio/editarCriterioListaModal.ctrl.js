angular.module('vHackersModule').controller('editarCriterioListaModalCtrl', ['$scope','$uibModalInstance', 'parametros','nuevaEscalaService',
function($scope, $uibModalInstance, parametros, nuevaEscalaService){
  var ctrl = this;

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  };
  ctrl.guardarCriterio = function () {
    swal({
      title: "¿Esta seguro de que desea modificar este criterio?",
      text: "",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, modificar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (criterioNuevoConfirmado) {
      if (criterioNuevoConfirmado !== "cancelar") {
        ctrl.criterio.puntajeMaximo = ctrl.criterio.nivelesCriterio[0].puntaje;
        angular.forEach(ctrl.criterio.nivelesCriterio, function(nivel,indice){
          if(ctrl.criterio.puntajeMaximo < nivel.puntaje){
            ctrl.criterio.puntajeMaximo = nivel.puntaje;
          }
        });
        $uibModalInstance.close(ctrl.criterio);
      }
    });
  };

  ctrl.listarNiveles = function (){
      idRubrica = {
        "herramientaID" : ctrl.rubricaId
      };
      nuevaEscalaService.listarNiveles(idRubrica).then(function(nivelesListaData) {
        ctrl.nivelesLista = nivelesListaData;
      });
    }

  ctrl.init = function(){
    ctrl.criterio = parametros.criterio;
    ctrl.rubricaId = parametros.idRubrica;
    ctrl.listarNiveles();
  }

  ctrl.init();

}])
