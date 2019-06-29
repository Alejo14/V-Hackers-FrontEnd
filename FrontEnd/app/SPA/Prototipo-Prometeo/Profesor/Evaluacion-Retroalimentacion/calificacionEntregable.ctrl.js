angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','calificacionHerramientaEvaluacionServicio'];

function calificacionCtrl ($scope,$state,$stateParams,NgTableParams,calificacionHerramientaEvaluacionServicio){
  var ctrl = this;

  ctrl.evaluacion = {};
  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.avanceEntregableId = $stateParams.avanceEntregableId;
  ctrl.herramientaEvaluacionLista = [];
  ctrl.obtenerEvaluacion = function () {
    ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.herramientaEvaluacionLista });
    console.log(ctrl.avanceEntregableId);
    calificacionHerramientaEvaluacionServicio.obtenerEvaluacion(ctrl.avanceEntregableId).then(function (evaluacion) {
        ctrl.evaluacion = evaluacion;
        console.log(evaluacion);
        ctrl.herramientaEvaluacionLista = evaluacion.herramientas;
        if(parseInt($stateParams.herramientaCalificada)){
          var puntaje = 0;
          var herramientas = 0;
          angular.forEach(ctrl.herramientaEvaluacionLista,function(herramienta,indice){
            if(herramienta.calificacionHerramientaEvaluacionId == $stateParams.calificacionHerramientaEvaluacionId){
              herramienta.puntaje = parseFloat($stateParams.puntajeHerramienta);
            }
            puntaje += herramienta.puntaje;
            herramientas++;
          });
          angular.forEach(ctrl.evaluacion.herramientas,function(herramienta,indice){
            if(herramienta.calificacionHerramientaEvaluacionId == $stateParams.calificacionHerramientaEvaluacionId){
              herramienta.puntaje = parseFloat($stateParams.puntajeHerramienta);
            }
          });
          ctrl.evaluacion.calificacionEvaluacion.puntaje = puntaje/herramientas;
        }
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
      title: "¿Está seguro de que quiere volver?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta == "Confirm") {
        $state.go('inicioProfes');
      }
    });
  };

  /*=================================================
  * Calificación de una herramienta
  *==================================================
  */
  ctrl.calificarHerramienta = function(indice){
    switch (ctrl.herramienta.evaluacion[indice].tipoHerramientaEvaluacion) {
      case 'Rubrica':
        $state.go('calificacionAspectos', {avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Lista de Cotejo':
      break;
      case 'Escala':
      break;
      default:
        swall('Opss', 'Hubo un error en la creación de la herramienta', 'error');
      break;
    }

  }

  ctrl.init = function (){
    ctrl.obtenerEvaluacion();
  };
  ctrl.init();
}
