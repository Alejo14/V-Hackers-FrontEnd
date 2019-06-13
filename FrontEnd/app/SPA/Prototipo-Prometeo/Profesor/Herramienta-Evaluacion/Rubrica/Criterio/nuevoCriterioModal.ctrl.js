angular.module('vHackersModule').controller('nuevoCriterioCtrl', ['$scope','$uibModalInstance', 'nuevoAspectoServicio', 'parametros',
function($scope, $uibModalInstance, nuevoAspectoServicio, parametros){
  var ctrl = this;

  ctrl.criterio = {
    descripcion: "",
    indicaciones: "",
    puntaje_maximo: 0,
    niveles: []
  }

  ctrl.rubricaId = parametros;

  ctrl.cerrar = function(){
      $uibModalInstance.close(0);
  };

  ctrl.listarNiveles = function (){
      idRubrica = {
        "herramientaID" : ctrl.rubricaId
      };
      nuevoAspectoServicio.listarNiveles(idRubrica).then(function(nivelesListaData) {
        ctrl.nivelesLista = nivelesListaData;
        console.log(nivelesListaData);
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
    angular.forEach(ctrl.nivelesLista, function(nivel,indice){
      var nivel = {
        descripcion: "",
        puntaje: 0
      }
      ctrl.criterio.niveles.push(nivel);
    });
  }

  ctrl.init = function(){
    ctrl.listarNiveles();
    ctrl.nivelesPorCriterio();
  }
  ctrl.init();

}])
