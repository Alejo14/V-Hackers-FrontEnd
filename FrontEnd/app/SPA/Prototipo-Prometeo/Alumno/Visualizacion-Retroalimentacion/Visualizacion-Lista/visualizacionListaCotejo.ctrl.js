angular.module('vHackersModule').controller('visualizacionListaCtrl', visualizacionListaCtrl);

visualizacionListaCtrl.$inject = ['$scope','$state', '$stateParams','visualizacionListaService'];

function visualizacionListaCtrl ($scope,$state,$stateParams,visualizacionListaService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.listaCriterios = {};
  $scope.$on('NO-MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = true;
  });
  $scope.$on('MOSTRAR-CALIFICACION', function () {
    ctrl.noMostrarCalificacion = false;
  })
  ctrl.obtenerCalificacionListaCotejo = function (){
    visualizacionListaService.obtenerCalificacionListaCotejo(ctrl.calificacionHerramientaEvaluacionId, ctrl.herramientaEvaluacionId).then(function(listaCriteriosData){
      ctrl.listaCriterios = listaCriteriosData;
      console.log(ctrl.listaCriterios);
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro que deseas regresar?",
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
    console.log(ctrl.herramientaEvaluacionId);
    console.log(ctrl.calificacionHerramientaEvaluacionId);
    ctrl.obtenerCalificacionListaCotejo();
  }

  ctrl.init();
}
