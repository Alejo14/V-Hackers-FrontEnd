angular.module('vHackersModule').controller('visualizacionCtrl', visualizacionCtrl);

visualizacionCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','visualizacionHerramientaEvaluacionServicio','$cookies'];

function visualizacionCtrl ($scope,$state,$stateParams,NgTableParams,visualizacionHerramientaEvaluacionServicio,$cookies){
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
    visualizacionHerramientaEvaluacionServicio.obtenerEvaluacion(ctrl.avanceEntregableId).then(function (evaluacion) {
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
  ctrl.guardarCalificacion = function() {
    swal({
      title: "¿Estás seguro de que quieres guardar la calificación realizada?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, guardar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta) {
        console.log(ctrl.evaluacion);
        visualizacionHerramientaEvaluacionServicio.guardarCalificacion(angular.toJson(ctrl.evaluacion)).then(function(data){
          swal("¡Felicidades!","Se guardó la calificación exitosamente","success");
          ctrl.habilitarBotones = true;
        });
      }
    });
  };

  ctrl.enviarCalificacion = function(){
    swal({
      title: "¿Estás seguro de que quieres enviar la calificación realizada al profesor del curso?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, enviar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta) {
        console.log(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId);
        visualizacionHerramientaEvaluacionServicio.enviarCalificacion(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId).then(function(data){
          swal("¡Felicidades!","Se envió la calificación exitosamente","success");
        });
      }
    });
  }

  ctrl.publicarCalificacion = function () {
    swal({
      title: "¿Estás seguro de que quieres publicar la calificación realizada al profesor del curso?",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, enviar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta) {
        console.log(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId);
        visualizacionHerramientaEvaluacionServicio.publicarCalificacion(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId).then(function(data){
          swal("¡Felicidades!","Se publicó la calificación exitosamente","success");
        });
      }
    });
  }

  /*===============================================
  * Botón Atrás
  *================================================
  */
  ctrl.atras = function(){
    swal({
      title: "¿Estás seguro de que quieres volver?",
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
        $state.go('inicioAlumnos');
      }
    });
  };

  /*=================================================
  * Calificación de una herramienta
  *==================================================
  */
  ctrl.calificarHerramienta = function(indice){
    console.log("calificaciónHerramientaId");
    console.log(ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId);
    switch (ctrl.herramientaEvaluacionLista[indice].tipoHerramientaEvaluacion) {
      case 'Rubrica':
        $state.go('visualizacionAspectos', {avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Lista de Cotejo':
        $state.go('visualizacionListaCotejo', {avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Escala':
        $state.go('visualizacionEscala', {avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      default:
        swall('Opss', 'Hubo un error en la creación de la herramienta', 'error');
      break;
    }

  }

  ctrl.init = function (){
    ctrl.habilitarBotones = false;
    ctrl.rolId = $cookies.get('rolActivoId');
    console.log(ctrl.rolId);
    if(ctrl.rolId === 'f4d1f6d3-9313-4d63-8da4-256aec99d5cd'){
      ctrl.usuarioRol = 'Profesor';
    }else{
      ctrl.usuarioRol = 'Asistente'
    }
    ctrl.obtenerEvaluacion();
  };
  ctrl.init();
}
