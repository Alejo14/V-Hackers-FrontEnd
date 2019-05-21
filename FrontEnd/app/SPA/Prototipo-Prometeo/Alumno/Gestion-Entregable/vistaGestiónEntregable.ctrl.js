//-- Anderson
angular.module('vHackersModule').controller('entregableAlumnoCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal',
function($scope, $state,$stateParams, entregableService, $uibModal){
  var ctrl = this;
  ctrl.tituloEntregable = "Backlog y Estándares de Interfaz";
  ctrl.entregableM=[];
  ctrl.id=0;
  ctrl.listaArchivos=[];


  ctrl.regresarEntregablesAlumno = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardarán",
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
        $state.go('inicioAlumnos');
        //herramientaEvaluacionServicio.enviarCalificacion(ctrl.enviarCalificacion);
      }
    });
  };


  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    console.log(archivo.nombre)
    ctrl.listaArchivos.push(archivo);
    $state.go('cargar-archivos');
  }

}]);
