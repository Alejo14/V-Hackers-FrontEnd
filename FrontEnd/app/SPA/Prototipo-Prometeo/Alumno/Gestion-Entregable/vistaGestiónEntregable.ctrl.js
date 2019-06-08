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
    //console.log(parametros);
    arch=[];
    arch.id=parametros.data;
    arch.nombre=archivo.nombre;
    arch.fecha=archivo.fecha;
    arch.tamano=archivo.tamano;
    console.log(arch);
    ctrl.listaArchivos.push(arch);
    $state.go('cargar-archivos');
  }

  function toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
  }

  function downloadFromBase64(base64File, filename,tipo) {
    const itemBlob = toBlob(base64File, 'application/'+ tipo);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(itemBlob);
    link.download = filename;
    link.target = '_blank';
    link.click();
    link.remove();
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject
    })
}



  ctrl.obtenerIdArchivo = function (archivo) { //Prueba
    var id=archivo.id;//"688f4990-fffe-4761-a178-62a2ce86837c";
    console.log(id);
    entregableAlumnoService.mostrarAvanceEntregable(id).then(function (respuesta) {
      console.log(respuesta);
      if (respuesta.extension){
        downloadFromBase64(respuesta.datos,respuesta.nombreArchivo,respuesta.extension);
      }
    });

      //swal("¡Bien hecho!", "El archivo se guardo exitosamente" , "success");
  }


  ctrl.elminarArchivo= function (archivo){
    ctrl.listaArchivos.splice(ctrl.listaArchivos.indexOf(archivo),1);
  }



}]);
