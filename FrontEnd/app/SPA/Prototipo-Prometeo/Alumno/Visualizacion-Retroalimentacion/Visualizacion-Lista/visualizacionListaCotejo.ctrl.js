angular.module('vHackersModule').controller('visualizacionListaCtrl', visualizacionListaCtrl);

visualizacionListaCtrl.$inject = ['$scope','$state', '$stateParams','visualizacionListaService'];

function visualizacionListaCtrl ($scope,$state,$stateParams,visualizacionListaService){
  var ctrl = this;

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.listaCriterios = {};

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

  ctrl.calcularPuntajeCriterio = function(aspectoId){
    var posicion = ctrl.buscarAspecto(aspectoId);
    if(posicion !== -1){
      ctrl.evaluacionAspecto[posicion].puntajeAsignado = 0;
      angular.forEach(ctrl.evaluacionAspecto[posicion].criterios, function(criterio,indice){
        ctrl.evaluacionAspecto[posicion].puntajeAsignado += criterio.puntajeAsignado;
      });
      ctrl.evaluacionAspecto[posicion].puntajeManual = ctrl.evaluacionAspecto[posicion].puntajeAsignado;
    }else{
      swal("Error","No se ha encontrado el aspecto","error");
    }
  }

  ctrl.init = function(){
    console.log(ctrl.herramientaEvaluacionId);
    console.log(ctrl.calificacionHerramientaEvaluacionId);
    ctrl.obtenerCalificacionListaCotejo();
  }

  ctrl.init();
}
