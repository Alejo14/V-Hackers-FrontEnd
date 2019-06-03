angular.module('vHackersModule').controller('gestionHorariosCtrl', ['$scope','$state','$stateParams' ,'gestionHorariosService', '$uibModal','NgTableParams',
function($scope,$state,$stateParams, gestionHorariosService, $uibModal,NgTableParams){
  var ctrl = this;
  ctrl.cursosLista = [];
  ctrl.idCurso = "0";
  ctrl.idSemestre = "0";
  ctrl.nombreCurso = "0",
  ctrl.codigoCurso = "0";
  ctrl.idCursoCiclo = "0";


  ctrl.obtenerCursos = function () {
    gestionHorariosService.obtenerCursos().then(function (cursosListaData) {
      ctrl.cursosLista = cursosListaData;
      //console.log("HOLAA");
      ctrl.cursosTabla = new NgTableParams({}, { dataset: ctrl.cursosLista });
    });
  };

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

  ctrl.obtenerFacultades = function () {
    gestionHorariosService.obtenerFacultades().then(function (facultadesListaData) {
      ctrl.facultadesLista = facultadesListaData;
    });
  };

  ctrl.obtenerEspecialidades = function () {
    gestionHorariosService.obtenerEspecialidades().then(function (especialidadesListaData) {
      ctrl.especialidadesLista = especialidadesListaData;
    });
  };

  ctrl.obtenerCiclos = function () {
    gestionHorariosService.obtenerCiclos().then(function (ciclosListaData) {
      ctrl.ciclosLista = ciclosListaData;
    });
  }

  ctrl.actualizarTabla = function () {
    //Falta actualizar datos de tabla a medida que se cambia algún filtro
  }

  ctrl.editarCurso = function(curso){
    $state.go('creacion-cursos',{id:curso.id, especialidadId:curso.especialidadId, codigo:curso.codigo, nombre:curso.nombre, fechaCreacion:curso.fechaCreacion, facultadId:curso.facultadId, creditos:curso.creditos});
  }

  ctrl.asignarHorarios = function(curso){
    console.log(curso.cursoCicloId);
    $state.go('asignar-horarios',{idCursoCiclo:curso.cursoCicloId,idCurso:curso.id,idSemestre:curso.cicloId,nombreCurso:curso.nombre,codigoCurso:curso.codigo});
  }

  ctrl.eliminarCursoCiclo = function(curso){
    swal({
      title: "¿Esta seguro de que desea eliminar el curso?",
      text: "",
      icon: "warning",
      //buttons: ["Cancelar", "Sí, agregar"],
      buttons: {
        cancelar: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        confirm: {
          text: "Sí, eliminar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      },
      closeModal: false
    }).then(function (eliminar) {
      if (eliminar !== "cancelar") {
          gestionHorariosService.eliminarCursoCiclo(angular.toJson(curso));
          swal("¡Listo!", "El curso se eliminó exitosamente" , "success");
          ctrl.obtenerCursos();
      }
    });
  }


  ctrl.init = function(){
    ctrl.obtenerCursos();
    ctrl.obtenerFacultades();
    ctrl.obtenerEspecialidades();
    ctrl.obtenerCiclos();
  };

  ctrl.init();
}]);
