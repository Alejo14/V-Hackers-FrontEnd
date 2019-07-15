angular.module('vHackersModule').controller('visualizacionAspectoCtrl', visualizacionAspectoCtrl);

visualizacionAspectoCtrl.$inject = ['$scope','$state', '$stateParams','visualizacionAspectoServicio'];

function visualizacionAspectoCtrl ($scope,$state,$stateParams,visualizacionAspectoServicio){
  var ctrl = this;
  ctrl.detalleE = {};

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.evaluacionAspecto = {};
  ctrl.evaluacionAspectoEnviar = {};
  ctrl.nivelesRubrica = {};
  ctrl.obtenerEvaluacionAspecto = function (){
    visualizacionAspectoServicio.obtenerNivelesRubrica(ctrl.herramientaEvaluacionId).then(function(nivelesRubrica){
      ctrl.nivelesRubrica = nivelesRubrica;
    });
    visualizacionAspectoServicio.obtenerEvaluacionAspecto(ctrl.herramientaEvaluacionId, ctrl.calificacionHerramientaEvaluacionId).then(function(evaluacionAspecto){
      ctrl.evaluacionAspecto = evaluacionAspecto;
      angular.forEach(ctrl.evaluacionAspecto, function(aspecto,indice){
        aspecto.accordionOpen = false;
        if(aspecto.descripcionPuntajeManual !== "" && aspecto.descripcionPuntajeManual !== null){
          aspecto.activarPuntajeManual = true;
        }else{
          aspecto.activarPuntajeManual = false;
        }
      });
      console.log(ctrl.evaluacionAspecto);
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro de que deseas regresar?",
      icon: "warning",
      buttons: {
        Cancel: {
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, regresar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function(confirmarRegreso){
      if(confirmarRegreso == "Confirm"){
        $state.go('visualizacion',{nombre: ctrl.detalleE.nombre, id: ctrl.detalleE.id ,fechaEntrega: ctrl.detalleE.fechaEntrega,
        fechaHabilitacion: ctrl.detalleE.fechaHabilitacion, descripcion: ctrl.detalleE.descripcion, ponderacion: $stateParams.ponderacion, cursoCicloId: ctrl.idCursoCiclo, proyectoId: $stateParams.proyectoId,
        nombreCurso: $stateParams.nombreCurso,codigoCurso:$stateParams.codigoCurso ,horario: $stateParams.horario,idRolUsuario: ctrl.detalleE.idRolUsuario, estadoEntregable: $stateParams.estadoEntregable, avanceEntregableId: $stateParams.avanceEntregableId});
      }
    });
  }

  ctrl.init = function(){
    ctrl.titulo = $stateParams.nombre;
    ctrl.detalleE.nombre=$stateParams.nombre;
    ctrl.detalleE.id=$stateParams.id;
    ctrl.detalleE.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.detalleE.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.detalleE.descripcion=$stateParams.descripcion;
    ctrl.detalleE.idRolUsuario=$stateParams.idRolUsuario;
    ctrl.idCursoCiclo = $stateParams.cursoCicloId;
    ctrl.noMostrarCalificacion = $stateParams.noMostrarCalificacion === "true";
    ctrl.obtenerEvaluacionAspecto();
  }

  ctrl.init();
}
