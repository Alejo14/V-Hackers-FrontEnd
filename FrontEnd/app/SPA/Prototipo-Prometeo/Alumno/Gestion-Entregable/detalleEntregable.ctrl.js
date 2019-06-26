angular.module('vHackersModule').controller('detalleEntregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableAlumnoService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableAlumnoService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.mensaje = "Hola Mundo";
  ctrl.alumnosLista = [];
  ctrl.alumnosListaModal = [];
  ctrl.mensajeNuevo = "Go V-Hackers";
  ctrl.obtenerCalificacionEntregable = function () {
    entregableAlumnoService.obtenerCalificacionEntregable().then(function (calificacionEntregableData) {
      ctrl.calificacionEntregable = alumnosListaData;
    });
  };
  ctrl.detalleE=[];
  $scope.fechaActual=new Date();

  ctrl.probarModal = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/modalListarAlumnos.html',
      controller: 'modalAgregarArchivoCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModalAgregarUsuario: function (){
          return "V Hackers"
        }
      }
    });

    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      ctrl.alumnosLista.push(parametroRetorno);
    });
  };

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
    entregableAlumnoService.registroAvanceEntregable(data);
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
    entregableAlumnoService.mostrarArchivosAvanceEntregable(id).then(function (respuesta) {
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
    entregableAlumnoService.mostrarURLsAvanceEntregable(id).then(function (respuesta) {
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
    entregableAlumnoService.descargarArchivoEntregable(id).then(function (respuesta) {
      console.log(respuesta);
      if (respuesta.extension){
        downloadFromBase64(respuesta.datos,respuesta.nombreArchivo,respuesta.extension);
      }
    });

      //swal("¡Bien hecho!", "El archivo se guardo exitosamente" , "success");
  }

  ctrl.elminarArchivo= function (archivo){
    var id=archivo.id;

    swal({
      title: "¿Está seguro que quiere eliminar el archivo?",
      text: "Los cambios se guardarán",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (eliminarArchivoConfirmacion) {
      if (eliminarArchivoConfirmacion !== "cancelar") {
        entregableAlumnoService.eliminarArchivo(id).then(function () {
            swal("¡Bien hecho!", "El archivo se elimino exitosamente" , "success");
        });

        ctrl.listaArchivos.splice(ctrl.listaArchivos.indexOf(archivo),1);
      }
    });
}

ctrl.elminarURL= function (archivo){
  var id=archivo.id;

  swal({
    title: "¿Está seguro que quiere eliminar el URL?",
    text: "Los cambios se guardarán",
    icon: "warning",
    buttons: {
      cancelar: {
        text: "Cancelar",
        className: "btn btn-lg btn-danger"
      },
      confirm: {
        text: "Sí, eliminar",
        className: "btn btn-lg color-fondo-azul-pucp color-blanco"
      }
    }
  }).then(function (eliminarURLConfirmacion) {
    if (eliminarURLConfirmacion !== "cancelar") {
      entregableAlumnoService.eliminarArchivo(id).then(function () {
          swal("¡Bien hecho!", "El URL se elimino exitosamente" , "success");
      });

      ctrl.listaURLs.splice(ctrl.listaURLs.indexOf(archivo),1);
    }
  });
}
  ctrl.agregarArchivo = function () {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Entregable/modalAgregarArchivo.html',
      controller: 'modalAgregarArchivoCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        parametrosModalArchivo:  function(){
          return ctrl.idAvanceEntregable;
        }
      }
    });


    //Recibo parametro de retorno
    modalInstance.result.then( function (parametroRetorno) {
      //console.log(parametroRetorno);
      if (parametroRetorno) {
        if (parametroRetorno[0]==1){
          swal("¡Bien hecho!", "El URL se creo exitosamente" , "success");
          ctrl.listaURLs.push(parametroRetorno[1]);
        }else {
          swal("¡Bien hecho!", "El archivo se creo exitosamente" , "success");
          ctrl.listaArchivos.push(parametroRetorno[1]);
        }

      }
    });
}


ctrl.regresarCursoAlumno = function () {
  swal({
    title: "¿Está seguro que quiere regresar?",
    text: "Los cambios se guardarán",
    icon: "warning",
    buttons: {
      cancelar: {
        text: "Cancelar",
        className: "btn btn-lg btn-danger"
      },
      confirm: {
        text: "Sí, regresar",
        className: "btn btn-lg color-fondo-azul-pucp color-blanco"
      }
    }
  }).then(function (regresarVistaCurso) {
    if (regresarVistaCurso !== "cancelar") {
      $state.go('alumnoCursos', {cursoCicloId: $stateParams.cursoCicloId, nombreCurso: $stateParams.nombreCurso, codigoCurso: $stateParams.codigoCurso, horario: $stateParams.horario}); //Aca podemos enviar el RolUsuarioId tambien
    }
  });



}

  ctrl.init = function () {

    ctrl.titulo = $stateParams.nombre;
          //ctrl.botonGrabar="Modificar";
    ctrl.detalleE.nombre=$stateParams.nombre;
    ctrl.detalleE.id=$stateParams.id;
    ctrl.detalleE.fechaEntrega=new Date(Number($stateParams.fechaEntrega));
    ctrl.detalleE.fechaHabilitacion=new Date(Number($stateParams.fechaHabilitacion));
    ctrl.detalleE.descripcion=$stateParams.descripcion;
    ctrl.detalleE.idRolUsuario=$stateParams.idRolUsuario;
    ctrl.idAvanceEntregable="";
    data={
      "idEntregable":ctrl.detalleE.id,
      "idRolUsuario":ctrl.detalleE.idRolUsuario
    }
    console.log("EntregableId y RolUsuarioIdUsuario");
    console.log(data);
    if ($stateParams.estadoEntregable=="I"){
      ctrl.mostrarBoton=true;
    }else {
      ctrl.mostrarBoton=false;
    }
    entregableAlumnoService.mostrarAvanceEntregables(data).then(function (respuesta) {
        ctrl.idAvanceEntregable=respuesta;
        console.log(ctrl.idAvanceEntregable);
        ctrl.cargarArchivos(ctrl.idAvanceEntregable.id);
        ctrl.cargarURLs(ctrl.idAvanceEntregable.id); //Falta traer la fecha
    });
    //ctrl.idAvanceEntregable="75e825bc-81d0-11e9-bc42-526af7764f64";




    //Tengo que probarlo

     //este debe ser el id que se debe usar para registrar el archivo

    if($stateParams.cursoCicloId==0){ //Entregable pertence a un proyecto
      ctrl.detalleE.cursoCicloId=0;
      ctrl.detalleE.proyectoId=$stateParams.proyectoId;
    }else{                            //Entregable pertence a un cursoCiclo
      ctrl.detalleE.proyectoId=0;
      ctrl.detalleE.cursoCicloId=$stateParams.cursoCicloId;
      ctrl.detalleE.nombreCurso=$stateParams.nombreCurso;
      ctrl.detalleE.codigoCurso=$stateParams.codigoCurso;
      ctrl.detalleE.horario=$stateParams.horario;
    }


  }

  ctrl.init();
}]);
