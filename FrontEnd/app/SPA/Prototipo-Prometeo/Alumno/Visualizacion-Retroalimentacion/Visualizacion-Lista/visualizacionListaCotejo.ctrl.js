angular.module('vHackersModule').controller('visualizacionListaCtrl', visualizacionListaCtrl);

visualizacionListaCtrl.$inject = ['$scope','$state', '$stateParams','visualizacionListaService'];

function visualizacionListaCtrl ($scope,$state,$stateParams,visualizacionListaService){
  var ctrl = this;
  ctrl.detalleE = {};

  ctrl.herramientaEvaluacionId = $stateParams.herramientaEvaluacionId;
  ctrl.calificacionHerramientaEvaluacionId = $stateParams.calificacionHerramientaEvaluacionId;
  ctrl.listaCriterios = {};
  ctrl.obtenerCalificacionListaCotejo = function (){
    visualizacionListaService.obtenerCalificacionListaCotejo(ctrl.calificacionHerramientaEvaluacionId, ctrl.herramientaEvaluacionId).then(function(listaCriteriosData){
      ctrl.listaCriterios = listaCriteriosData;
      console.log(ctrl.listaCriterios);
      ctrl.calcularPuntajeCriterio();
    });
  }

  ctrl.regresar = function (){
    swal({
      title: "¿Estás seguro que deseas regresar?",
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

  ctrl.calcularPuntajeCriterio = function(){
    longitud=ctrl.listaCriterios.length;
    ctrl.puntajeAsignado = 0;
    console.log(ctrl.listaCriterios);
    for(let i = 0; i< longitud; i++){
      console.log(ctrl.listaCriterios[i].calificacion);
      if(ctrl.listaCriterios[i].calificacion==1){
        ctrl.puntajeAsignado = ctrl.puntajeAsignado + 1;
      }
    }
    if(longitud!=0) {
      punt = ctrl.puntajeAsignado/longitud;
      ctrl.puntajeAsignado = 1 * punt.toFixed(2);
    }else{
      ctrl.puntajeAsignado = 0;
    }
    console.log(ctrl.puntajeAsignado);
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
    console.log(ctrl.herramientaEvaluacionId);
    console.log(ctrl.calificacionHerramientaEvaluacionId);
    ctrl.obtenerCalificacionListaCotejo();
  }

  ctrl.init();
}
