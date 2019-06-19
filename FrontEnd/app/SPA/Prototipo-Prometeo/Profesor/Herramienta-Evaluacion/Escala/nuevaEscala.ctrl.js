angular.module('vHackersModule').controller('nuevaEscalaCtrl', ['$scope','$state', '$stateParams','NgTableParams','$uibModal', 'nuevaEscalaService',
function($scope, $state, $stateParams, NgTableParams,$uibModal, nuevaEscalaService){
  var ctrl = this;

  ctrl.agregarNivel = function () {
    ctrl.rubrica.numeroNiveles += 1;
    var nivel = {
      descripcion: ""
    };
    ctrl.rubrica.niveles.push(nivel);
  };

  ctrl.eliminarNivel = function (indiceNivel) {
    swal({
      title: "¿Esta seguro de que desea eliminar este nivel?",
      text: "No podrá recuperar el nivel en el futuro",
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
    }).then(function (eliminarNivelConfirmado) {
      if (eliminarNivelConfirmado !== "cancelar") {
        ctrl.rubrica.numeroNiveles -= 1;
        ctrl.rubrica.niveles.splice(indiceNivel, 1);
        $scope.$apply();
      }
    });
  }

  ctrl.guardarNiveles = function (){
    swal({
      title: "¿Esta seguro de que desea guardar estos niveles?",
      text: "No podrá modificar el número de niveles",
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
    }).then(function (confirmarNiveles) {
      if (confirmarNiveles !== "cancelar") {
        ctrl.puedoAgregarNivel = false;

        console.log(ctrl.rubrica.niveles);
        ctrl.nivelesRubrica = {
          "tipo": "seleccion",
          "rubricaID": ctrl.rubrica.id,
          "niveles": ctrl.rubrica.niveles
        }
        console.log(ctrl.nivelesRubrica);
        nuevaEscalaService.enviarNiveles(ctrl.nivelesRubrica).then(function(){
           swal("Felicidades","Se guardó su configuración con éxito","success");
        });
        $scope.$apply();
      }
    });

  }

  ctrl.agregarAspecto = function(){
    $state.go('nuevo-aspecto', {id: ctrl.rubrica.id});
  }

  ctrl.regresarEntregable = function (){
    $state.go('evaluacion-herramienta');
  }

  ctrl.eliminarAspecto = function (indice) {

  }

  ctrl.editarAspecto  = function (indice) {

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
        nuevaEscalaService.guardarRubrica(confirmarRubrica).then(function(){
          //Agregar criterios
          dataCriterios={
            "herramientaId":ctrl.rubrica.id,
            "lista":ctrl.criteriosLista
          }
          console.log(dataCriterios);
          nuevaEscalaService.agregarCriterios(dataCriterios);
          //------------------//
          $state.go('evaluacion-herramienta-gestionar', {id: $stateParams.entregableId, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
        });
      }
    });
  }

  ctrl.init = function () {  ctrl.titulo = 'Nueva escala';
    ctrl.inicializarTabla();
    ctrl.rubrica = {
      id: $stateParams.id,
      tipo: "seleccion",
      numeroNiveles: 0,
      niveles: [],
      aspecto: []
    };
    ctrl.puedoAgregarNivel = true;
    if(parseInt($stateParams.nivelesCreados)){
      ctrl.puedoAgregarNivel = false;
      herramientaId = {
        "herramientaID": ctrl.rubrica.id
      }
      nuevoAspectoServicio.listarNiveles(herramientaId).then(function(niveles){
        ctrl.rubrica.niveles = niveles;
      });
      // nuevaEscalaService.listarAspectos(herramientaId).then(function(aspectos){
      //   ctrl.aspectoLista = aspectos;
      //   ctrl.aspectoTabla = new NgTableParams({}, { dataset: ctrl.aspectoLista });
      //   console.log(ctrl.aspectoLista);
      // });
    }
  }

/* Funciones de Criterio  */
ctrl.criteriosLista = [];
ctrl.nivelesLista = [];
ctrl.nivelesCreados = 1;

ctrl.inicializarTabla = function () {
  ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
}

ctrl.agregarCriterio = function () {
  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Escala/Criterio/nuevoCriterioModal.html',
    controller: 'nuevoCriterioEscalaCtrl as ctrl',
    size: 'lg',
    backdrop: true,
    keyboard: true,
    resolve: {
      parametros:  function(){
        return ctrl.rubrica.id;
      }
    }
  });

  modalInstance.result.then( function (parametroRetorno) {
    if (parametroRetorno) {
      var nuevoCriterio = {
        "id": parametroRetorno.id,
        "descripcion": parametroRetorno.descripcion,
        "indicaciones": parametroRetorno.indicaciones,
        "niveles": parametroRetorno.nivelesCriterio
      };
      ctrl.criteriosLista.push(nuevoCriterio);
    }
  });
};

ctrl.editarCriterio = function(indiceCriterio){
  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Escala/Criterio/nuevoCriterioModal.html',
    controller: 'editarCriterioEscalaCtrl as ctrl',
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
}

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
}
/*------------------------*/


  ctrl.init();
}]);
