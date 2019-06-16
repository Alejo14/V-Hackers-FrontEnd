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

  ctrl.buscarAspecto = function(id){
    var n = ctrl.evaluacionAspecto.length;
    for(let i = 0; i < n; i++){
      if(ctrl.evaluacionAspecto[i].id === id) return i;
    }
    return -1;
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

  ctrl.guardarAspecto = function(){
    var data = {
      "aspectos":ctrl.evaluacionAspecto
    }
    calificacionAspectoService.guardarAspecto(data).then(function(){
      swal('Éxito', 'Se guardó la calificación de la herramienta de Evaluación','success');
      $state.go('calificacion', {avanceEntregableId: $stateParams.avanceEntregableId});
    });
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
