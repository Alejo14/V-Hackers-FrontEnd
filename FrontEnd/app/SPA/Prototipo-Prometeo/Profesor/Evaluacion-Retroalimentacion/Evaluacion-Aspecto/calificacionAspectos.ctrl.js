angular.module('vHackersModule').controller('calificacionAspectosCtrl', calificacionAspectosCtrl);

calificacionAspectosCtrl.$inject = ['$scope','$state', '$stateParams','calificacionAspectoService'];

function calificacionAspectosCtrl ($scope,$state,$stateParams,calificacionAspectoService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};

  ctrl.obtenerEvaluacionAspecto = function (){
    calificacionAspectoService.obtenerNivelesRubrica(ctrl.herramientaEvaluacionId).then(function(nivelesRubrica){
      ctrl.nivelesRubrica = nivelesRubrica;
      console.log(ctrl.nivelesRubrica);
    });
    calificacionAspectoService.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      ctrl.evaluacionAspectoEnviar = evaluacionAspecto;
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        aspecto.accordionOpen = false;
        aspecto.observacion = "";
        angular.forEach(aspecto.criterios, function(criterio,indice){
          criterio.observacion = "";
        });
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Esta seguro de que desea regresar?",
      text: "No se guardarán los cambios efectuados",
      icon: "warning",
      buttons: {
        cancelar: {
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, regresar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function(confirmarRegreso){
      if(confirmarRegreso !== "cancelar"){
        $state.go('calificacion',{avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
