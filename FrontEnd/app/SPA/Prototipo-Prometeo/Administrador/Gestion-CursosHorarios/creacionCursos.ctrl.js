angular.module('vHackersModule').controller('creacionCursosCtrl', ['$scope','$state' ,'creacionCursosService', '$uibModal',
function($scope,$state, creacionCursosService, $uibModal){
  var ctrl = this;
  ctrl.cargaUnitaria = true;
  ctrl.cursoNuevo = {
    "id": "",
    "nombreCurso": "",
    "claveCurso": "",
    "numeroCreditos": "",
    "facultad": "",
    "especialidad": ""
  };
  ctrl.titulo = "Creación de curso";

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

  ctrl.cambiarVista = function(indice) {
    if(indice == 0) ctrl.cargaUnitaria = true;
    else ctrl.cargaUnitaria = false;
  }

  ctrl.regresarAdministrador = function () {
    swal({
      title: "¿Está seguro de que quieres volver?",
      text: "Los cambios no se guardaran",
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
        $state.go('inicioAdmin');
      }
    });
  };

  ctrl.guardarCurso = function (curso) {
    //console.log("hola");
    if(ctrl.cursoNuevo.claveCurso=="" || ctrl.cursoNuevo.nombreCurso=="" || ctrl.cursoNuevo.numeroCreditos=="" || ctrl.cursoNuevo.especialidad=="" || ctrl.cursoNuevo.facultad==""){
      swal("¡Opss!", "Debe ingresar los campos obligatorios" , "error");
    }else{
      //console.log(ctrl.especialidadesLista[ctrl.especialidadesLista.indexOf(ctrl.cursoNuevo.especialidad)].id);
      data = {
        "id": uuid(),
        "especialidadId": ctrl.especialidadesLista[ctrl.especialidadesLista.indexOf(ctrl.cursoNuevo.especialidad)].id,
        "codigo": ctrl.cursoNuevo.claveCurso,
        "nombre": ctrl.cursoNuevo.nombreCurso,
        "fechaCreacion": (new Date())*1,
        "facultadId": ctrl.facultadesLista[ctrl.facultadesLista.indexOf(ctrl.cursoNuevo.facultad)].id,
        "creditos": ctrl.cursoNuevo.numeroCreditos
      }
      creacionCursosService.registroCurso(angular.toJson(data)).then(function () {
          swal("¡Bien hecho!", "El curso se guardó exitosamente" , "success");
      });
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

  ctrl.init = function(){
    ctrl.obtenerFacultades();
    ctrl.obtenerEspecialidades();
  };


  ctrl.init();

}]);
