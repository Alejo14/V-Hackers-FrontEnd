//-- Anderson
angular.module('vHackersModule').controller('entregableAlumnoCtrl', ['$scope', '$state', '$stateParams' , 'entregableAlumnoService', '$uibModal',
function($scope, $state,$stateParams, entregableAlumnoService, $uibModal){
  var ctrl = this;
  ctrl.tituloEntregable = "Backlog y Estándares de Interfaz";
  ctrl.entregableM=[];
  ctrl.id=0;
  ctrl.listaArchivos=[];

  function uuid() {
      function randomDigit() {
          if (crypto && crypto.getRandomValues) {
              var rands = new Uint8Array(1);
              crypto.getRandomValues(rands);
              return (rands[0] % 16).toString(16);
          } else {
              return ((Math.random() * 16) | 0).toString(16);
          }
      }
      var crypto = window.crypto || window.msCrypto;
      return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
  }

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

  ctrl.obtenerIdArchivo = function ( parametros) {
    idArchivo=parametros.data;
    console.log(idArchivo);
    data={
      "archivoId" : idArchivo,
		  "entregableId" : "75e825bc-81d0-11e9-bc42-526af7764f64"
    }
    entregableAlumnoService.registroAvanceEntregable(angular.toJson(data)).then(function () {
        swal("¡Bien hecho!", "El archivo se guardo exitosamente" , "success");
    });


  }

  ctrl.elminarArchivo= function (archivo){
    ctrl.listaArchivos.splice(ctrl.listaArchivos.indexOf(archivo),1);
  }



}]);
