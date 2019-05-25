angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state','NgTableParams','calificacionHerramientaEvaluacionServicio'];

function calificacionCtrl ($scope,$state,NgTableParams,calificacionHerramientaEvaluacionServicio){
  var ctrl = this;

  /*Generación de ID como GUID para esta iteración*/
  function uuid() {
      function randomDigit() {
          if (crypto && crypto.getRandomValues) {
              var rands = new Uint8Array(1);
              crypto.getRandomValues(rands);
              return (rands[0] % 16).toString(16);
          } else {
              return ((Math.random() * 16) | 0).toString(16);
          }
      }
      var crypto = window.crypto || window.msCrypto;
      return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
  }

  ctrl.titulo = "Exposición de Arquitectura de microservicios";
  ctrl.retroalimentacion = "";
  ctrl.puntaje = 0;
  ctrl.id = uuid();
  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.herramientaEvaluacion = [];
  ctrl.obtenerHerramientaEvaluacion = function () {
    calificacionHerramientaEvaluacionServicio.obtenerHerramientaEvaluacion().then(function (herramientaEvaluacion) {
      ctrl.herramientaEvaluacion = herramientaEvaluacion.herramientaEvaluacion;
      ctrl.puntajeMax = herramientaEvaluacion.puntajeMax;
    });
  };

  /*===============================================
  * Servicio para enviar Calificación al Back-End
  *================================================
  */
  ctrl.enviarCalificacion = function() {
    swal({
      title: "¿Está seguro de que quieres guardar la calificación realizada?",
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
        swal("¡Felicidades!","Se guardó la calificación exitosamente","success");
        ctrl.evaluacion =
        {
          "avanceEntregableId": uuid(),
          "avanceItemId": uuid(),
          "evaluacionId": ctrl.id,
          "puntajeEvaluacion": ctrl.puntaje,
          "descripcion" : ctrl.retroalimentacion,
          "calificacionHerramientas":[
            {
              "idHerramienta":uuid(),
              "idEstadoCalHerraEvalu": uuid(),
              "puntajeHerramientaEvaluacion": ctrl.puntaje,
              "observacion": ctrl.retroalimentacion,
              "flagAspecto": 0,
              "calificacionAspecto":[
                {
                  "puntajeAsignado": ctrl.puntaje,
                  "puntajeManual": ctrl.puntaje,
                  "cantCriterios": 5,
                  "calificacionCriterio":[
                    {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[0],"puntajeManual": ctrl.puntajeDado[0],"numCasilla":1,"nivel":{"puntajeAsignado":ctrl.puntajeDado[0],"puntajeManual":ctrl.puntajeDado[0]}},
                    {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[1],"puntajeManual": ctrl.puntajeDado[1],"numCasilla":2,"nivel":{"puntajeAsignado":ctrl.puntajeDado[1],"puntajeManual":ctrl.puntajeDado[1]}},
                    {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[2],"puntajeManual": ctrl.puntajeDado[2],"numCasilla":3,"nivel":{"puntajeAsignado":ctrl.puntajeDado[2],"puntajeManual":ctrl.puntajeDado[2]}},
                    {"idCriterio":uuid(),"puntajeAsignado":ctrl.puntajeDado[3],"puntajeManual": ctrl.puntajeDado[3],"numCasilla":4,"nivel":{"puntajeAsignado":ctrl.puntajeDado[3],"puntajeManual":ctrl.puntajeDado[3]}}
                  ]
                }
              ]
            }
          ]
        };
        console.log(angular.toJson(ctrl.evaluacion));
        calificacionHerramientaEvaluacionServicio.enviarCalificacion(angular.toJson(ctrl.evaluacion));
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
        $state.go('principal');
      }
    });
  };
  /*===============================================
  * Puntaje dinámico: Función temporal
  *================================================
  */
  ctrl.puntajeDado = [-1,-1,-1,-1];
  ctrl.sumarPuntaje = function(criterio,i){
    var aux = -1;
    if(ctrl.puntajeDado[criterio.id-1] != -1) aux = ctrl.puntajeDado[criterio.id-1];
    ctrl.puntajeDado[criterio.id-1] = criterio.puntaje[i];
    if (aux != -1) ctrl.puntaje -= aux;
    ctrl.puntaje += ctrl.puntajeDado[criterio.id-1];
  };

  ctrl.init = function (){
    ctrl.obtenerHerramientaEvaluacion();
  };
  ctrl.init();
}
