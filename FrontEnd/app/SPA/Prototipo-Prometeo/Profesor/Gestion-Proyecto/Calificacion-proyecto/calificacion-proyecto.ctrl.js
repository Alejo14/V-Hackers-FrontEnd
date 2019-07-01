angular.module('vHackersModule').controller('calificacionProyecto', ['$scope', '$state', '$stateParams', 'NgTableParams', 'calificacionProyectoService', '$uibModal',
function($scope, $state, $stateParams, NgTableParams, calificacionProyectoService, $uibModal){
  var ctrl = this;
  ctrl.idAvanceProyecto = $stateParams.avanceProyectoId;
  ctrl.nombreProyecto = $stateParams.nombreProyecto;
  ctrl.nombreCalificado = $stateParams.nombreCalificado;
  ctrl.mensajeError = 'No se encuentran entregables calificados disponibles';
  ctrl.avanceProyecto = {};
  ctrl.proyectoCalificado = false;
  ctrl.observacion = '';
  ctrl.nota = 0.0;
  ctrl.avancesEntregablesLista = [];

  ctrl.listarAvancesEntregables = function () {
    calificacionProyectoService.listarAvancesEntregables(ctrl.idAvanceProyecto).then(function (respuesta) {
      ctrl.avancesEntregablesLista = respuesta;
      ctrl.tablaHerramientas = new NgTableParams({}, { dataset: ctrl.avancesEntregablesLista });
    });
  }

  ctrl.obtenerAvanceProyecto = function () {
    calificacionProyectoService.obtenerAvanceProyecto(ctrl.idAvanceProyecto).then(function (respuesta) {
      ctrl.avanceProyecto = respuesta;
      ctrl.proyectoCalificado = ctrl.avanceProyecto.estadoAvanceProyectoId === '88479f6c-55d2-48e8-bc7e-20858ca48c57';
      if (ctrl.proyectoCalificado) {
        ctrl.observacion = ctrl.avanceProyecto.observaciones;
        ctrl.nota = ctrl.avanceProyecto.nota;
      }
    })
  }
  ctrl.calificarAvanceProyecto = function () {
    swal({
      title: "¿Estás seguro de que quieres registrar la calificación? No se podrá modificar",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, calificar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta === "Confirm") {
        var proyectoCalificacion = {
          "idAvanceProyecto": ctrl.idAvanceProyecto,
          "observacion": ctrl.observacion,
          "nota": ctrl.nota
        };
        calificacionProyectoService.calificarAvanceProyecto(proyectoCalificacion).then(function (respuestaCalificacion) {
          ctrl.proyectoCalificado =true;
          swal({
            title: "¡Listo!",
            text: "Calificacion realizada con éxito",
            icon: "success",
            buttons: {
              confirm: {
                text: "ok",
                className: "btn btn-lg color-fondo-azul-pucp color-blanco"
              }
            }
          });
        })
      }
    });
  }
  ctrl.atras = function () {
    $state.go('avances-proyecto', {id: $stateParams.idProyecto, nombre: ctrl.nombreProyecto, metodo: $stateParams.metodo, horarioId: $stateParams.horarioId});
  }
  ctrl.init = function (){
    ctrl.listarAvancesEntregables();
    ctrl.obtenerAvanceProyecto();
  }

  ctrl.init();

}]);
