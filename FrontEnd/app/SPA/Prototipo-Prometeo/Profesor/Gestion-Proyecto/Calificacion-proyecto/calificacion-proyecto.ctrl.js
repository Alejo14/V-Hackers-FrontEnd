angular.module('vHackersModule').controller('gestionProyectoCtrl', ['$scope', '$state', '$stateParams', 'calificacionProyectoService', '$uibModal',
function($scope, $state, $stateParams, calificacionProyectoService, $uibModal){
  var ctrl = this;
  ctrl.idAvanceProyecto = $stateParams.idAvanceProyecto;
  ctrl.nombreProyecto = $stateParams.nombreProyecto;
  ctrl.nombreCalificado = $stateParams.nombreCalificado;
  ctrl.observacion = '';
  ctrl.nota = 0.0;
  ctrl.calificarAvanceProyecto = function () {
    swal({
      title: "¿Estás seguro de que quieres registrar la calificación?",
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

        })
      }
    });
  }

  ctrl.init = function (){

  }

  ctrl.init();

}]);
