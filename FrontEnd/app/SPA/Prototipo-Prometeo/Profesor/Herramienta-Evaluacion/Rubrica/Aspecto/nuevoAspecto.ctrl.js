angular.module('vHackersModule').controller('nuevoAspectoCtrl', ['$scope','$state', '$stateParams','nuevoAspectoServicio','$uibModal', 'NgTableParams',
function($scope, $state, $stateParams, nuevoAspectoServicio, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.titulo = 'Nueva aspecto';
  ctrl.aspecto = {
    titulo: "",
    descripcion: "",
    criterios: []
  };
  ctrl.rubricaId = $stateParams.id;
  ctrl.criteriosLista = [];
  ctrl.nivelesLista = [];
  ctrl.nivelesCreados = 1;

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

  ctrl.editarCriterio = function(indiceCriterio){
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Criterio/nuevoCriterioModal.html',
      controller: 'editarCriterioModalCtrl as ctrl',
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

  ctrl.guardarAspecto = function(){
    swal({
      title: "¿Esta seguro de que desea guardar el Aspecto actual?",
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
    }).then(function (aspectoGuardarConfirmado) {
      data = {
        "rubricaID": ctrl.rubricaId,
        "descripcion": ctrl.aspecto.descripcion,
        "puntaje_maximo": 20,
	      "cant_criterios": ctrl.criteriosLista.length,
	      "titulo": ctrl.aspecto.titulo,
	      "criterios": ctrl.criteriosLista
      }
      console.log(data);
      if (aspectoGuardarConfirmado !== "cancelar") {
        nuevoAspectoServicio.enviarAspecto(data).then(function(){
           swal("Felicidades","Se guardó su configuración con éxito" ,"success");
           $state.go('nueva-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
        });
        // $scope.$apply();
      }
    });
  }

  ctrl.inicializarTabla = function () {
    ctrl.criteriosTabla = new NgTableParams({}, { dataset: ctrl.criteriosLista });
  }

  ctrl.regresar = function () {
    $state.go('nueva-rubrica', {id: ctrl.rubricaId, entregableId:$stateParams.entregableId, nivelesCreados: ctrl.nivelesCreados, cursoCicloId: $stateParams.cursoCicloId, proyectoId: $stateParams.proyectoId});
  }

  ctrl.init = function () {

    ctrl.inicializarTabla();
  }

  ctrl.init();
}]);
