angular.module('vHackersModule').controller('gestionHorariosCtrl', ['$scope','$state','$stateParams' ,'gestionHorariosService', '$uibModal','NgTableParams',
function($scope,$state,$stateParams, gestionHorariosService, $uibModal,NgTableParams){
  var ctrl = this;
  ctrl.cursosLista = [];
  ctrl.listaAux = [];
  ctrl.idCurso = "0";
  ctrl.idSemestre = "0";
  ctrl.nombreCurso = "0",
  ctrl.codigoCurso = "0";
  ctrl.idCursoCiclo = "0";
  ctrl.filtro = {};


  ctrl.obtenerCursos = function () {
    gestionHorariosService.obtenerCursos().then(function (cursosListaData) {
      ctrl.cursosLista = cursosListaData;
      ctrl.listaAux = cursosListaData;
      //console.log("HOLAA");
      ctrl.cursosTabla = new NgTableParams({}, { dataset: ctrl.cursosLista });
    });
  };

  ctrl.filtrar = function () {

    ctrl.cursosLista = ctrl.listaAux.filter(function(curso) {
      var codigo = true;
      var nombre = true;
      var ciclo = true;
      var especialidad = true;

      if(ctrl.filtro.ciclo){
        ciclo = curso.ciclo.toLowerCase().includes(ctrl.filtro.ciclo.toLowerCase());
      }
      if(ctrl.filtro.nombreCurso){
        nombre = curso.nombre.toLowerCase().includes(ctrl.filtro.nombreCurso.toLowerCase());
      }
      if(ctrl.filtro.claveCurso){
        codigo = curso.codigo.toLowerCase().includes(ctrl.filtro.claveCurso.toLowerCase());
      }
      if(ctrl.filtro.especialidad){
        especialidad = curso.especialidad.toLowerCase().includes(ctrl.filtro.especialidad.toLowerCase());
      }

      return codigo & nombre & ciclo & especialidad;
    });

  };
  ctrl.limpiarFiltro = function (){
    ctrl.filtro = {};
    ctrl.filtrar();
  }

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

  ctrl.eliminarCursoCiclo = function(curso,indice){
    swal({
      title: "¿Estás seguro de que deseas eliminar el curso?",
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
          console.log("Se procederá a eliminar cursociclo");
          gestionHorariosService.eliminarCursoCiclo(curso);
          swal("¡Listo!", "El curso se eliminó exitosamente" , "success");
          ctrl.cursosLista.splice(indice,1);
      }
    });
  }


  ctrl.init = function(){
    ctrl.obtenerCursos();
    ctrl.obtenerFacultades();
    ctrl.obtenerEspecialidades();
    ctrl.obtenerCiclos();
    ctrl.limpiarFiltro();
  };

  ctrl.init();
}]);
