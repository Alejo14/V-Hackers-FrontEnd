angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state','NgTableParams','herramientaEvaluacionServicio'];

function calificacionCtrl ($scope,$state,NgTableParams,herramientaEvaluacionServicio){
  var ctrl = this;
  ctrl.titulo = "Exposición de Arquitectura de microservicios";
  ctrl.retroalimentacion = "";
  ctrl.puntaje = 0;
  ctrl.id = 0;

  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.herramientaEvaluacion = [];
  ctrl.obtenerHerramientaEvaluacion = function () {
    herramientaEvaluacionServicio.obtenerHerramientaEvaluacion().then(function (herramientaEvaluacion) {
      ctrl.herramientaEvaluacion = herramientaEvaluacion.herramientaEvaluacion;
      ctrl.puntajeMax = herramientaEvaluacion.puntajeMax;
    });
  };

  /*===============================================
  * JSON de evaluación
  *================================================
  */
  ctrl.evaluacion =
  {
  "id": ctrl.id,
  "nota": ctrl.puntaje,
  "retroalimentacion" : ctrl.retroalimentacion
  };

  /*===============================================
  * Servicio para enviar Calificación al Back-End
  *================================================
  */
  ctrl.enviarCalificacion = function() {
    swal({
      title: "¿Está seguro de que quieres guardar la configuración actual?",
      text: "",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $state.go('principal');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };

  /*===============================================
  * Puntaje dinámico: Función temporal
  *================================================
  */
  ctrl.puntajeDado = [-1,-1,-1,-1,-1];
  ctrl.sumarPuntaje = function(value, id){
    var aux = -1;
    if(ctrl.puntajeDado[id] != -1) aux = ctrl.puntajeDado[id];
    ctrl.puntajeDado[id] = parseInt(value);
    if (aux != -1) ctrl.puntaje -= aux;
    ctrl.puntaje += ctrl.puntajeDado[id];
  };

  ctrl.init = function (){
    ctrl.obtenerHerramientaEvaluacion();
  };
  ctrl.init();
}
