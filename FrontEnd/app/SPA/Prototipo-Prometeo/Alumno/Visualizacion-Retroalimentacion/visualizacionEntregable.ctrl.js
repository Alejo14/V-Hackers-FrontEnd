angular.module('vHackersModule').controller('visualizacionCtrl', visualizacionCtrl);

visualizacionCtrl.$inject = ['$rootScope','$scope','$state', '$stateParams','NgTableParams','visualizacionHerramientaEvaluacionServicio','$cookies'];

function visualizacionCtrl ($rootScope,$scope,$state,$stateParams,NgTableParams,visualizacionHerramientaEvaluacionServicio,$cookies){
  var ctrl = this;

  ctrl.evaluacion = {};
  ctrl.detalleE = {};
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
        if(ctrl.evaluacion.estadoCalificacionEvaluacionId === '670aa21d-9cd8-4202-8e1f-0869cdabcd42' || ctrl.evaluacion.estadoCalificacionEvaluacionId === '8126b0d6-f10e-4f0a-abcc-3432fdef3aa2'){
          ctrl.noMostrarCalificacion = true;
          $rootScope.$broadcast('NO-MOSTRAR-CALIFICACION');
        }else{
          ctrl.noMostrarCalificacion = false;
          $rootScope.$broadcast('MOSTRAR-CALIFICACION');
        }
        ctrl.herramientaEvaluacionLista = evaluacion.herramientas;
    });
  };

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
        $state.go('detalle-entregable' , {nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable}); //Temporal, deberia usar un servicio para traerme esa info
      }
    });
  };

  /*=================================================
  * Calificación de una herramienta
  *==================================================
  */
  ctrl.visualizarHerramienta = function(indice){
    switch (ctrl.herramientaEvaluacionLista[indice].tipoHerramientaEvaluacion) {
      case 'Rubrica':
        $state.go('visualizacionAspecto', {nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Lista de Cotejo':
        $state.go('visualizacionListaCotejo', {nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      case 'Escala':
        $state.go('visualizacionEscala', {nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable, avanceEntregableId: ctrl.avanceEntregableId, calificacionHerramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].calificacionHerramientaEvaluacionId, herramientaEvaluacionId: ctrl.evaluacion.herramientas[indice].herramientaEvaluacionId});
        break;
      default:
        swall('Opss', 'Hubo un error en la creación de la herramienta', 'error');
      break;
    }

  }

  ctrl.init = function (){
    ctrl.titulo = $stateParams.nombre;
    ctrl.detalleE.nombre=$stateParams.nombre;
    ctrl.detalleE.id=$stateParams.id;
    ctrl.detalleE.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.detalleE.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.detalleE.descripcion=$stateParams.descripcion;
    ctrl.detalleE.idRolUsuario=$stateParams.idRolUsuario;
    ctrl.idCursoCiclo = $stateParams.cursoCicloId;
    ctrl.habilitarBotones = false;
    ctrl.obtenerEvaluacion();
  };
  ctrl.init();
}
