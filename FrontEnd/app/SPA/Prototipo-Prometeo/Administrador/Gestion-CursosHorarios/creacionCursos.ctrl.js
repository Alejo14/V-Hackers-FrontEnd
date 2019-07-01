angular.module('vHackersModule').controller('creacionCursosCtrl', ['$scope','$state' ,'$stateParams','creacionCursosService', '$uibModal',
function($scope,$state,$stateParams , creacionCursosService, $uibModal){
  var ctrl = this;
  ctrl.cargaUnitaria = true;
  ctrl.cursoNuevo = {
    "id": "",
    "nombreCurso": "",
    "claveCurso": "",
    "numeroCreditos": "",
    "facultad": "",
    "especialidad": "",
    "fechaCreacion": ""
  };
  ctrl.titulo = "Creación de curso";
  ctrl.modo = "c";

  ctrl.especialidadesLista = [];

  ctrl.facultadesLista = [];
  ctrl.listaCursos = [];

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

  ctrl.cargarArchivo = function(){
    //cargamos archivos
  }

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.regresarAdministrador = function () {
    swal({
      title: "¿Estás seguro de que quieres volver?",
      text: "Los cambios no se guardarán",
      icon: "warning",
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger",
          value: "cancelar"
        },
        confirm: {
          text: "Sí, volver",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco",
          value: "confirm"
        }
      }
    }).then(function(regresar){
      if (regresar == "confirm") {
        if(ctrl.modo=='c'){
            $state.go('inicioAdmin');
        } else {
            $state.go('gestion-horarios');
        }
      }
    });
  };

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
ctrl.agregarArchivo = function () {
  //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/modalCargaMasiva.html',
    controller: 'modalCargaMasivaCtrl as ctrl',
    size: 'lg',
    backdrop: true,
    keyboard: true,
    resolve: {
      parametrosModalArchivo: function () {
        return {
          //actualizarRoles: false
        };
      }
    }
  });


  //Recibo parametro de retorno
  modalInstance.result.then( function (parametroRetorno) {
    //console.log(parametroRetorno);
    if (parametroRetorno) {
      if (parametroRetorno[0]==1){
        //swal("¡Bien hecho!", "El URL se creo exitosamente" , "success");
        //ctrl.listaURLs.push(parametroRetorno[1]);
      }else {
        swal("¡Bien hecho!", "La carga masiva se realizó exitosamente" , "success");
        //ctrl.listaArchivos.push(parametroRetorno[1]);
      }

    }
  });
}

  ctrl.guardarCurso = function (curso) {
    //console.log("hola");
    if(ctrl.cursoNuevo.claveCurso=="" || ctrl.cursoNuevo.nombreCurso=="" || ctrl.cursoNuevo.numeroCreditos=="" || ctrl.cursoNuevo.especialidad=="" || ctrl.cursoNuevo.facultad==""){
      swal("¡Opss!", "Debe ingresar los campos obligatorios" , "error");
    }else{
      //console.log(ctrl.especialidadesLista[ctrl.especialidadesLista.indexOf(ctrl.cursoNuevo.especialidad)].id);
      if(ctrl.modo == 'c'){
        data = {
          "id": uuid(),
          "especialidadId": ctrl.cursoNuevo.especialidad,
          "codigo": ctrl.cursoNuevo.claveCurso,
          "nombre": ctrl.cursoNuevo.nombreCurso,
          "fechaCreacion": (new Date())*1,
          "facultadId": ctrl.cursoNuevo.facultad,
          "creditos": ctrl.cursoNuevo.numeroCreditos
        }
        creacionCursosService.registroCurso(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El curso se creó exitosamente" , "success");
        });
      } else {
        data = {
          "id": ctrl.cursoNuevo.id,
          "especialidadId": ctrl.cursoNuevo.especialidad,
          "codigo": ctrl.cursoNuevo.claveCurso,
          "nombre": ctrl.cursoNuevo.nombreCurso,
          "fechaCreacion": ctrl.cursoNuevo.fechaCreacion,
          "facultadId": ctrl.cursoNuevo.facultad,
          "creditos": ctrl.cursoNuevo.numeroCreditos
        }
        creacionCursosService.modificarCurso(angular.toJson(data)).then(function () {
            swal("¡Bien hecho!", "El curso se modificó exitosamente" , "success");
        });
      }
    }
    ctrl.cursoNuevo.nombreCurso = "";
    ctrl.cursoNuevo.claveCurso = "";
    ctrl.cursoNuevo.numeroCreditos = "";
    ctrl.cursoNuevo.facultad = "";
    ctrl.cursoNuevo.especialidad="";
  };

  ctrl.obtenerFacultades = function () {
    creacionCursosService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
    });
  };

  ctrl.obtenerEspecialidades = function () {
    creacionCursosService.obtenerEspecialidades().then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };

  ctrl.init = function (){
    ctrl.obtenerFacultades();
    ctrl.obtenerEspecialidades();
    if ($stateParams.id==0){
      ctrl.titulo = "Creación de cursos";
    }else{
      ctrl.titulo = "Modificación de Cursos";
      ctrl.modo = "m";
      ctrl.cursoNuevo.id = $stateParams.id;
      ctrl.cursoNuevo.nombreCurso = $stateParams.nombre;
      ctrl.cursoNuevo.claveCurso = $stateParams.codigo;
      ctrl.cursoNuevo.numeroCreditos = $stateParams.creditos;
      ctrl.cursoNuevo.facultad = $stateParams.facultadId;
      ctrl.cursoNuevo.especialidad = $stateParams.especialidadId;
      ctrl.cursoNuevo.fechaCreacion = $stateParams.fechaCreacion;
    }
  }


  ctrl.init();

}]);
