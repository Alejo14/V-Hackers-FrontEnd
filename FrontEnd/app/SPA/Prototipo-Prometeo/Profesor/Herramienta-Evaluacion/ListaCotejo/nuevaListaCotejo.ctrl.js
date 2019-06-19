angular.module('vHackersModule').controller('nuevaListaCotejoCtrl', ['$scope','$state', '$stateParams','NgTableParams','$uibModal', 'nuevaListaCotejoService',
function($scope, $state, $stateParams, NgTableParams,$uibModal, nuevaListaCotejoService){
  var ctrl = this;

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }

  ctrl.guardarRubrica = function(){
    swal({
      title: "¿Esta seguro de que desea guardar la rúbrica?",
      text: "",
      icon: "warning",
      buttons: {
        cancelar: {
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (guardarRubricaConfirmado) {
      if (guardarRubricaConfirmado !== "cancelar") {
        confirmarRubrica = {
          "rubricaID" : ctrl.rubrica.id,
          "estado": "publico"
        };

        cotejos = {
          "herramientaId" : ctrl.rubrica.id,
          "lista" : ctrl.criteriosLista
        };
        nuevaListaCotejoService.guardarRubrica(confirmarRubrica).then(function(){
          nuevaListaCotejoService.guardarCotejos(cotejos).then(function(cotejoData){
            console.log(cotejoData);
            $state.go('evaluacion-herramienta-gestionar', {id: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
          });
        });
      }
    });
  };

  ctrl.init = function () {  ctrl.titulo = 'Nueva lista de cotejo';
    ctrl.inicializarTabla();
    ctrl.rubrica = {
      id: $stateParams.id,
      tipo: "seleccion",
    };
  }

/* Funciones de Criterio  */
ctrl.criteriosLista = [];

ctrl.inicializarTabla = function () {
  ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
}

ctrl.agregarCriterio = function () {
  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/ListaCotejo/Criterio/nuevoCriterioModal.html',
    controller: 'nuevoCriterioListaCtrl as ctrl',
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
        "descripcion": parametroRetorno.descripcion,
        "indicaciones": parametroRetorno.indicaciones
      };
      ctrl.criteriosLista.push(nuevoCriterio);
      console.log(ctrl.criteriosLista);
    }
  });
};

ctrl.editarCriterio = function(indiceCriterio){
  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/ListaCotejo/Criterio/nuevoCriterioModal.html',
    controller: 'editarCriterioListaModalCtrl as ctrl',
    size: 'lg',
    backdrop: true,
    keyboard: true,
    resolve: {
      parametros:  function(){
        return {
          idRubrica: ctrl.rubricaId,
          criterio: ctrl.criteriosLista[indiceCriterio]
        };
      }
    }

  });

  modalInstance.result.then( function (parametroRetorno) {
    if (parametroRetorno) {
        ctrl.criteriosLista[indiceCriterio] = parametroRetorno;
    }
  });
};

ctrl.eliminarCriterio = function (indiceCriterio){
  swal({
    title: "¿Esta seguro de que desea eliminar este criterio?",
    text: "No podrá recuperar el criterio en el futuro",
    icon: "warning",
    buttons: {
      cancelar: {
        className: "btn btn-lg btn-danger"
      },
      confirm: {
        text: "Sí, eliminar",
        className: "btn btn-lg color-fondo-azul-pucp color-blanco"
      }
    },
    closeModal: false
  }).then(function (eliminarCriterioConfirmado) {
    if (eliminarCriterioConfirmado !== "cancelar") {
      ctrl.criteriosLista.splice(indiceCriterio,1);
      $scope.$apply();
    }
  });
};
/*------------------------*/


  ctrl.init();
}]);
