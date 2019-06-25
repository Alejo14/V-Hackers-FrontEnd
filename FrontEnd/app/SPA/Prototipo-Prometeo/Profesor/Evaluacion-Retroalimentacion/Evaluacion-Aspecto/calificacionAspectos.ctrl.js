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
        aspecto.activarPuntajeManual = false;
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.editarPuntaje = function (indice) {
    ctrl.evaluacionAspecto[indice].activarPuntajeManual = !ctrl.evaluacionAspecto[indice].activarPuntajeManual;
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
        $state.go('calificacion',{avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada: 0});
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
    ctrl.puntajeHerramienta = 0;
    angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
      ctrl.puntajeHerramienta += aspecto.puntajeManual;
    });
    var data = {
      "aspectos":ctrl.evaluacionAspecto
    }
    console.log(data);
    calificacionAspectoService.guardarAspecto(data).then(function(){
      swal('Éxito', 'Se guardó la calificación de la herramienta de Evaluación','success');
      $state.go('calificacionHerramienta', {avanceEntregableId: $stateParams.avanceEntregableId, herramientaCalificada:1, calificacionHerramientaEvaluacionId: $stateParams.calificacionHerramientaEvaluacionId, puntajeHerramienta: ctrl.puntajeHerramienta});
    });
  }

  ctrl.init = function(){
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
