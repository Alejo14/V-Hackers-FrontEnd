angular.module('vHackersModule').controller('nuevoAspectoCtrl', ['$scope','$state', '$stateParams','$uibModal', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.titulo = 'Nueva aspecto';
  ctrl.aspecto = {
    descripcion: "",
    criterios: []
  };
  ctrl.rubricaId = $stateParams.id;
  ctrl.criteriosLista = [];
  ctrl.agregarCriterio = function () {
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Criterio/nuevoCriterioModal.html',
      controller: 'nuevoCriterioCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametros:  function(){
          return ctrl.rubricaId;
        }
      }
    });

    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        var nuevoCriterio = {
          "id": parametroRetorno.id,
          "descripcion": parametroRetorno.descripcion,
          "indicaciones": parametroRetorno.indicaciones,
          "nivelesCriterio": parametroRetorno.nivelesCriterio
        };
        ctrl.criteriosLista.push(nuevoCriterio);
      }
    });
  };
  ctrl.inicializarTabla = function () {
    ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
  }
  ctrl.regresarAspectos = function () {
    $state.go('nueva-rubrica', {id: ctrl.rubricaId});
  }

  ctrl.init = function () {
    ctrl.inicializarTabla()
  }

  ctrl.init();
}]);
