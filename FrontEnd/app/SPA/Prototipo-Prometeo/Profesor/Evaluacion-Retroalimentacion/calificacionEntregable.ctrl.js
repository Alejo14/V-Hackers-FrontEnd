angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','calificacionHerramientaEvaluacionServicio'];

function calificacionCtrl ($scope,$state,$stateParam,NgTableParams,calificacionHerramientaEvaluacionServicio){
  var ctrl = this;

  ctrl.evaluacion = {};
  ctrl.evaluacion.descripcion = ""; //Hay que borrarlo porque se trae con el Servicio
  ctrl.evaluacion.calificacionEvaluacion = {}; //Hay que borrarlo porque se trae en el servicio
  ctrl.evaluacion.calificacionEvaluacion.puntaje = 0;

  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.herramientaEvaluacionLista = [];
  ctrl.obtenerEvaluacion = function () {
    ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.herramientaEvaluacionLista });
    // calificacionHerramientaEvaluacionServicio.obtenerEvaluacion($stateParams.avanceEntregableId).then(function (evaluacion) {
    //   ctrl.evaluacion = evaluacion;
    //   ctrl.herramientaEvaluacionLista = evaluacion.herramientas;
    // });
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
        ctrl.evaluacion.avanceEntregableId = $stateParams.avanceEntregableId;
        calificacionHerramientaEvaluacionServicio.enviarCalificacion(angular.toJson(ctrl.evaluacion)).then(function(data){
          swal("¡Felicidades!","Se guardó la calificación exitosamente","success");
          $state.go('inicioProfes');
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

  /*=================================================
  * Calificación de una herramienta
  *==================================================
  */
  ctrl.calificarHerramienta = function(){
    $state.go('calificacionAspectos');
  }

  ctrl.init = function (){
    ctrl.obtenerEvaluacion();
  };
  ctrl.init();
}
