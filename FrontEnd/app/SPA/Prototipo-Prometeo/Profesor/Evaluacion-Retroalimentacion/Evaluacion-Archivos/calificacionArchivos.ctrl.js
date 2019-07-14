angular.module('vHackersModule').controller('calificarArchivosCtrl', ['$scope', '$state', '$stateParams' , 'calificacionHerramientaEvaluacionServicio', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, calificacionHerramientaEvaluacionServicio, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.mensaje = "Hola Mundo";
  ctrl.alumnosLista = [];
  ctrl.alumnosListaModal = [];
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.entregable = {};
  ctrl.obtenerCalificacionEntregable = function () {
    calificacionHerramientaEvaluacionServicio.obtenerCalificacionEntregable().then(function (calificacionEntregableData) {
      ctrl.calificacionEntregable = alumnosListaData;
    });
  };
  ctrl.detalleE=[];
  $scope.fechaActual=new Date();
      //Recibo parametro de retorno


  ctrl.probarSwal = function () {
    swal("¡Felicidades!", "Has ejecutado un swal", "success");
  };

  ctrl.id=0;
  ctrl.listaArchivos=[];
  ctrl.listaURLs=[];
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

  ctrl.obtenerInfoArchivo = function (archivo,parametros) {
    //console.log(parametros);
    var id=parametros.data;
    data={
          "archivoId":id,
        	"entregableId":ctrl.idAvanceEntregable
    }
    console.log(ctrl.idAvanceEntregable);
    calificacionHerramientaEvaluacionServicio.registroAvanceEntregable(data);
    arch=[];
    arch.id=parametros.data;
    arch.nombre=archivo.nombre;
    arch.fecha=archivo.fechaCreacion;
    arch.tamano=archivo.tamano;
    //console.log(arch);
    ctrl.listaArchivos.push(arch);
    // //$state.go('cargar-archivos');
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

  ctrl.listaArchivos = [];
  ctrl.cargarArchivos = function (id) {
    //console.log(id);
    calificacionHerramientaEvaluacionServicio.mostrarArchivosAvanceEntregable(id).then(function (respuesta) {
      //console.log("RESPUESTA");
        //console.log(respuesta);
       for (i=0;i<respuesta.length;i++) {
         //console.log(respuesta[i].id);
         var arch1=[];
         arch1.id=respuesta[i].id;
         arch1.nombre=respuesta[i].nombreArchivo;
         arch1.fecha=respuesta[i].fechaCreacion;
         arch1.tamano=respuesta[i].tamano;
         ctrl.listaArchivos.push(arch1);
       }
    });
  }

  ctrl.cargarURLs = function (id) {
    calificacionHerramientaEvaluacionServicio.mostrarURLsAvanceEntregable(id).then(function (respuesta) {
          //console.log(respuesta);
       for (i=0;i<respuesta.length;i++) {
         //console.log(respuesta[i].id);
         var linkURL=[];
         // linkURL.id=""; //Debe traer el id el servicio
         // linkURL.nombre=respuesta[i];
         // linkURL.fecha=Date.now(); //debe traer la fecha el servicio
         // ctrl.listaURLs.push(linkURL);
        //console.log(respuesta[i]);
         linkURL.id=respuesta[i].idUrl;
         linkURL.nombre=respuesta[i].url;
         linkURL.fecha=respuesta[i].fecha;
         ctrl.listaURLs.push(linkURL);
       }
    });
  }

  ctrl.obtenerIdArchivo = function (archivo) { //Prueba
    var id=archivo.id;//"688f4990-fffe-4761-a178-62a2ce86837c";
    console.log(id);
    calificacionHerramientaEvaluacionServicio.descargarArchivoEntregable(id).then(function (respuesta) {
      console.log(respuesta);
      if (respuesta.extension){
        downloadFromBase64(respuesta.datos,respuesta.nombreArchivo,respuesta.extension);
      }
    });

      //swal("¡Bien hecho!", "El archivo se guardo exitosamente" , "success");
  }

ctrl.regresarCursoAlumno = function () {
  swal({
    title: "¿Estás seguro que quieres regresar?",
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



}

  ctrl.init = function () {
          //ctrl.botonGrabar="Modificar";
    ctrl.entregable.id = $stateParams.idEntregable;
    ctrl.entregable.nombre = $stateParams.nombre;
    ctrl.entregable.metodo = $stateParams.metodo;
    ctrl.horarioId = $stateParams.horarioId;
    ctrl.detalleE.id=$stateParams.idEntregable;
    ctrl.detalleE.idRolUsuario=$stateParams.idRolUsuario;
    ctrl.idAvanceEntregable="";
    data={
      "idEntregable":ctrl.detalleE.id,
      "idRolUsuario":ctrl.detalleE.idRolUsuario
    }
    console.log("EntregableId y RolUsuarioIdUsuario");
    console.log(data);

    calificacionHerramientaEvaluacionServicio.mostrarAvanceEntregables(data).then(function (respuesta) {
        ctrl.idAvanceEntregable=respuesta;
        console.log(ctrl.idAvanceEntregable);
        ctrl.cargarArchivos(ctrl.idAvanceEntregable.id);
        ctrl.cargarURLs(ctrl.idAvanceEntregable.id); //Falta traer la fecha
    });
    //ctrl.idAvanceEntregable="75e825bc-81d0-11e9-bc42-526af7764f64";




    //Tengo que probarlo

     //este debe ser el id que se debe usar para registrar el arch


  }

  ctrl.init();
}]);
