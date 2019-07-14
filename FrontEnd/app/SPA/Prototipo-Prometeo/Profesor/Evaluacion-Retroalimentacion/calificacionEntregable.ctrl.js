angular.module('vHackersModule').controller('calificacionCtrl', calificacionCtrl);

calificacionCtrl.$inject = ['$scope','$state', '$stateParams','NgTableParams','calificacionHerramientaEvaluacionServicio','$cookies'];

function calificacionCtrl ($scope,$state,$stateParams,NgTableParams,calificacionHerramientaEvaluacionServicio,$cookies){
  var ctrl = this;

  ctrl.evaluacion = {};
  /*===============================================
  * Servicio para traer Herramienta de Evaluación
  *================================================
  */
  ctrl.avanceEntregableId = $stateParams.avanceEntregableId;
  ctrl.herramientaEvaluacionLista = [];
  ctrl.entregable = {};
  ctrl.obtenerEvaluacion = function () {
    ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.herramientaEvaluacionLista });
    console.log(ctrl.avanceEntregableId);
    calificacionHerramientaEvaluacionServicio.obtenerEvaluacion(ctrl.avanceEntregableId).then(function (evaluacion) {
        ctrl.evaluacion = evaluacion;
        console.log(evaluacion);
        angular.forEach(ctrl.evaluacion.herramientas,function(herramienta,indice){
          if(herramienta.calificacionHerramientaEvaluacionId == $stateParams.calificacionHerramientaEvaluacionId){
            herramienta.puntaje = parseFloat($stateParams.puntajeHerramienta);
          }
        });
        ctrl.herramientaEvaluacionLista = evaluacion.herramientas;
    });
  };

  ctrl.calcularPuntaje = function(){
    var puntaje = 0;
    var herramientas = 0;
    angular.forEach(ctrl.evaluacion.herramientas,function(herramienta,indice) {
      puntaje += herramienta.puntaje;
      herramientas++;
    })
    ctrl.evaluacion.calificacionEvaluacion.puntaje = puntaje/herramientas;
  }

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
      if (respuesta == "Confirm") {
        console.log(ctrl.evaluacion);
        calificacionHerramientaEvaluacionServicio.guardarCalificacion(angular.toJson(ctrl.evaluacion)).then(function(data){
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
        calificacionHerramientaEvaluacionServicio.enviarCalificacion(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId).then(function(data){
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
        calificacionHerramientaEvaluacionServicio.publicarCalificacion(ctrl.evaluacion.calificacionEvaluacion.calificacionEvaluacionId).then(function(data){
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
        $state.go('avances-entregable' , {id: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo: ctrl.entregable.metodo, horarioId: ctrl.horarioId, cursoCicloId:$stateParams.cursoCicloId });
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
        $state.go('calificacionAspectos', {entregableId: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo:ctrl.entregable.metodo, horarioId:ctrl.horarioId, cursoCicloId: $stateParams.cursoCicloId, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Lista de Cotejo':
        $state.go('calificacionListaCotejo', {entregableId: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo:ctrl.entregable.metodo, horarioId:ctrl.horarioId, cursoCicloId: $stateParams.cursoCicloId, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Escala':
        $state.go('calificacionEscala', {entregableId: ctrl.entregable.id, nombre: ctrl.entregable.nombre, metodo:ctrl.entregable.metodo, horarioId:ctrl.horarioId, cursoCicloId: $stateParams.cursoCicloId, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      default:
        swall('Opss', 'Hubo un error en la creación de la herramienta', 'error');
      break;
    }

  }

  ctrl.init = function (){
    ctrl.entregable.id = $stateParams.entregableId;
    ctrl.entregable.nombre = $stateParams.nombre;
    ctrl.entregable.metodo = $stateParams.metodo;
    ctrl.horarioId = $stateParams.horarioId;
    ctrl.habilitarBotones = false;
    ctrl.rolId = $cookies.get('rolActivoId');
    ctrl.idUsuario = $cookies.get('usuarioID');
    calificacionHerramientaEvaluacionServicio.obtenerRol(ctrl.rolId).then(function (rol) {
      ctrl.usuarioRol = rol.descripcion;
    });
    ctrl.obtenerEvaluacion();
  };
  ctrl.init();
}
