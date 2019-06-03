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
        if(ctrl.modo=='c'){
            $state.go('inicioAdmin');
        } else {
            $state.go('gestion-horarios');
        }
      }
    });
  };

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
