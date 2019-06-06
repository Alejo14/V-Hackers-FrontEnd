angular.module('vHackersModule').controller('nuevoCriterioCtrl', ['$scope','$uibModalInstance', 'parametros',
function($scope, $uibModalInstance, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
    puntaje_maximo: 0,
    niveles: []
  }

  ctrl.rubricaId = parametros;

  console.log(ctrl.criterio);
  console.log(ctrl.rubricaId);

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
        ctrl.criterio.puntaje_maximo = ctrl.criterio.niveles[0].puntaje;
        angular.forEach(ctrl.criterio.niveles, function(nivel,indice){
          if(ctrl.criterio.puntaje_maximo < nivel.puntaje){
            ctrl.criterio.puntaje_maximo = nivel.puntaje;
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
      ctrl.criterio.niveles.push(nivelCriterio);
    });
  }

  ctrl.init = function(){
    ctrl.nivelesPorCriterio();
  }
  ctrl.init();

}])
