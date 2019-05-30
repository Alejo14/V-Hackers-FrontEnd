angular.module('vHackersModule').controller('nuevoCriterioCtrl', ['$scope','$uibModalInstance', 'parametros',
function($scope, $uibModalInstance, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
    puntajeMaximo: 0,
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

  ctrl.nivelesPorCriterio = function(){
    angular.forEach(ctrl.nivelesRubrica, function(nivel,indice){
      var nivelCriterio = {
        descripcion: "",
        puntaje: 0
      }
      ctrl.criterio.nivelesCriterio.push(nivelCriterio);
    });
  }

  ctrl.init = function(){
    ctrl.nivelesPorCriterio();
  }
  ctrl.init();

}])
