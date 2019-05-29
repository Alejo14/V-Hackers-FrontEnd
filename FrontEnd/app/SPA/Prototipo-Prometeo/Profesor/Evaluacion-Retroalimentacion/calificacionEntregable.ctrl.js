angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','calificacionHerramientaEvaluacionServicio'];

function calificacionCtrl ($scope,$state,$stateParam,NgTableParams,calificacionHerramientaEvaluacionServicio){
  var ctrl = this;

  /*Generación de ID como GUID para esta iteración*/
  // function uuid() {
  //     function randomDigit() {
  //         if (crypto && crypto.getRandomValues) {
  //             var rands = new Uint8Array(1);
  //             crypto.getRandomValues(rands);
  //             return (rands[0] % 16).toString(16);
  //         } else {
  //             return ((Math.random() * 16) | 0).toString(16);
  //         }
  //     }
  //     var crypto = window.crypto || window.msCrypto;
  //     return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
  // }

  ctrl.evaluacion = {};
  ctrl.evaluacion.descripcion = ""; //Hay que borrarlo porque se trae con el Servicio
  ctrl.evaluacion.calificacionEvaluacion = {}; //Hay que borrarlo porque se trae en el servicio
  ctrl.evaluacion.calificacionEvaluacion.puntaje = 0;
  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.herramientaEvaluacionLista = [];
  ctrl.obtenerHerramientaEvaluacion = function () {
    ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.herramientaEvaluacionLista });
    calificacionHerramientaEvaluacionServicio.obtenerHerramientaEvaluacion().then(function (evaluacion) {
      ctrl.evaluacion = evaluacion;
      ctrl.herramientaEvaluacionLista = evaluacion.herramientas;
    });
  };

  /*===============================================
  * Servicio para enviar Calificación al Back-End
  *================================================
  */
  ctrl.enviarCalificacion = function() {
    swal({
      title: "¿Está seguro de que quieres enviar la calificación realizada?",
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
        $state.go('inicioProfes');
        // ctrl.evaluacion =
        // {
        //   "avanceEntregableId": uuid(),
        //   "avanceItemId": uuid(),
        //   "evaluacionId": ctrl.id,
        //   "puntajeEvaluacion": ctrl.puntaje,
        //   "descripcion" : ctrl.retroalimentacion,
        //   "calificacionHerramientas":[
        //     {
        //       "idHerramienta":uuid(),
        //       "idEstadoCalHerraEvalu": uuid(),
        //       "puntajeHerramientaEvaluacion": ctrl.puntaje,
        //       "observacion": ctrl.retroalimentacion,
        //       "flagAspecto": 0,
        //       "calificacionAspecto":[
        //         {
        //           "puntajeAsignado": ctrl.puntaje,
        //           "puntajeManual": ctrl.puntaje,
        //           "cantCriterios": 5,
        //           "calificacionCriterio":[
        //             {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[0],"puntajeManual": ctrl.puntajeDado[0],"numCasilla":1,"nivel":{"puntajeAsignado":ctrl.puntajeDado[0],"puntajeManual":ctrl.puntajeDado[0]}},
        //             {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[1],"puntajeManual": ctrl.puntajeDado[1],"numCasilla":2,"nivel":{"puntajeAsignado":ctrl.puntajeDado[1],"puntajeManual":ctrl.puntajeDado[1]}},
        //             {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[2],"puntajeManual": ctrl.puntajeDado[2],"numCasilla":3,"nivel":{"puntajeAsignado":ctrl.puntajeDado[2],"puntajeManual":ctrl.puntajeDado[2]}},
        //             {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[3],"puntajeManual": ctrl.puntajeDado[3],"numCasilla":4,"nivel":{"puntajeAsignado":ctrl.puntajeDado[3],"puntajeManual":ctrl.puntajeDado[3]}}
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // };
        // console.log(angular.toJson(ctrl.evaluacion));
        calificacionHerramientaEvaluacionServicio.enviarCalificacion(angular.toJson(ctrl.evaluacion)).then(function(data){
          swal("¡Felicidades!","Se guardó la calificación exitosamente","success");
        });
      }
    });
  };

  /*===============================================
  * Botón Atrás
  *================================================
  */
  ctrl.atras = function(){
    swal({
    title: "¿Está seguro de que quieres volver?",
    text: "Los cambios no se guardaran",
    icon: "warning",
    buttons: {
      cancelar: {
        text: "Cancelar",
        className: "btn btn-lg btn-danger"
      },
      confirm: {
        text: "Sí, volver",
        className: "btn btn-lg color-fondo-azul-pucp color-blanco"
      }
    }
    }).then(function (usuarioNuevoConfirmado) {
      if (usuarioNuevoConfirmado !== "cancelar") {
        $state.go('inicioProfes');
      }
    });
  };
  /*===============================================
  * Puntaje dinámico: Función temporal
  *================================================
  */
  // ctrl.puntajeDado = [-1,-1,-1,-1];
  // ctrl.sumarPuntaje = function(criterio,i){
  //   var aux = -1;
  //   if(ctrl.puntajeDado[criterio.id-1] != -1) aux = ctrl.puntajeDado[criterio.id-1];
  //   ctrl.puntajeDado[criterio.id-1] = criterio.puntaje[i];
  //   if (aux != -1) ctrl.puntaje -= aux;
  //   ctrl.puntaje += ctrl.puntajeDado[criterio.id-1];
  // };

  ctrl.init = function (){
    ctrl.obtenerHerramientaEvaluacion();
  };
  ctrl.init();
}
