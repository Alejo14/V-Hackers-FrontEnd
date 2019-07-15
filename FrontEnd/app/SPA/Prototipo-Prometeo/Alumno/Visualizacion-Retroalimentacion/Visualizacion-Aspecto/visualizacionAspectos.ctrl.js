angular.module('vHackersModule').controller('visualizacionAspectoCtrl', visualizacionAspectoCtrl);

visualizacionAspectoCtrl.$inject = ['$scope','$state', '$stateParams','visualizacionAspectoServicio'];

function visualizacionAspectoCtrl ($scope,$state,$stateParams,visualizacionAspectoServicio){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};
  $scope.$on('NO-MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = true;
  });
  $scope.$on('MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = false;
  })
  ctrl.obtenerEvaluacionAspecto = function (){
    visualizacionAspectoServicio.obtenerNivelesRubrica(ctrl.herramientaEvaluacionId).then(function(nivelesRubrica){
      ctrl.nivelesRubrica = nivelesRubrica;
    });
    visualizacionAspectoServicio.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        aspecto.accordionOpen = false;
        if(aspecto.descripcionPuntajeManual !== "" && aspecto.descripcionPuntajeManual !== null){
          aspecto.activarPuntajeManual = true;
        }else{
          aspecto.activarPuntajeManual = false;
        }
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro de que deseas regresar?",
      icon: "warning",
      buttons: {
        Cancel: {
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, regresar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function(confirmarRegreso){
      if(confirmarRegreso == "Confirm"){
        $state.go('visualizacion',{avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
