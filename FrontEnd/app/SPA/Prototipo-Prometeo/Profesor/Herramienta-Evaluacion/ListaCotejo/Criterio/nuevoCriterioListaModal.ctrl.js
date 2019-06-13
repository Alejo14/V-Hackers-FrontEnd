angular.module('vHackersModule').controller('nuevoCriterioListaCtrl', ['$scope','$uibModalInstance', 'nuevaEscalaService', 'parametros',
function($scope, $uibModalInstance, nuevaEscalaService, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
    puntaje_maximo: 0,
    nivelesCriterio: []
  }

  ctrl.rubricaId = parametros;

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  };

  ctrl.listarNiveles = function (){
      idRubrica = {
        "herramientaID" : ctrl.rubricaId
      };
      nuevaEscalaService.listarNiveles(idRubrica).then(function(nivelesListaData) {
        ctrl.nivelesLista = nivelesListaData;
        for(let i = 0; i < ctrl.nivelesLista.length; i++){
          ctrl.nivelesLista[i].puntaje = 0;
        }
      });
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
    }).then(function (criterioNuevoConfirmado) {
      if (criterioNuevoConfirmado !== "cancelar") {
        console.log(ctrl.criterio);
        $uibModalInstance.close(ctrl.criterio);
      }
    });
  };

  ctrl.nivelesPorCriterio = function(){
    angular.forEach(ctrl.nivelesLista, function(nivel,indice){
      var nivelCriterio = {
        descripcion: "",
        puntaje: 0
      }
      ctrl.criterio.niveles.push(nivelCriterio);
    });
  }

  ctrl.init = function(){
    ctrl.listarNiveles();
    ctrl.nivelesPorCriterio();
  }
  ctrl.init();

}])
