angular.module('vHackersModule').controller('asignarHorarioCtrl', ['$scope','$state','$stateParams' ,'asignarHorarioService', '$uibModal','NgTableParams',
function($scope,$state,$stateParams,asignarHorarioService, $uibModal,NgTableParams){
  var ctrl = this;
  ctrl.cursoCiclo = {};
  ctrl.codigo = "Código";
  ctrl.nombre = "Nombre Curso";
  ctrl.horariosLista = [{"codigo":"H-8081","codigoProfesor":"Guanirection","nombreProfesor":"Luis Flores"}];


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


  ctrl.regresarListarCursos = function () {
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
        $state.go('gestion-horarios');
      }
    });
  };

  ctrl.agregarHorario = function (modo) {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    //console.log(modo);
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/Gestion-Horarios/modalAgregarHorario.html',
      controller: 'modalAgregarHorarioCtrl as ctrl',
      size: 'lg',
      backdrop: true,
      keyboard: true,
      resolve: {
        modo: function(){
          return modo;
        }
      }
    });
    modalInstance.result.then( function (parametroRetorno) {
      if (parametroRetorno) {
        var horarioRegistro = {
          //crear horario con datos de modal
        };
        asignarHorarioService.regitstrarUsuario(horarioRegistro).then(function (resultadoRegistro) {
          ctrl.horariosLista.push(parametroRetorno);
          swal({
            title: "¡Listo!",
            text: "Horario agregado con éxito",
            icon: "success",
            //buttons: ["Cancelar", "Sí, agregar"],
            buttons: {
              confirm: {
                text: "ok",
                className: "btn btn-lg color-fondo-azul-pucp color-blanco"
              }
            }
          });
        });

      }
    });
  };

  ctrl.editarHorario = function(horario) {
    ctrl.agregarHorario(horario);//con parámetros para editarlos
  }

  ctrl.eliminarHorario = function (horario) {
    swal({
      title: "¿Esta seguro de que desea eliminar el horario?",
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
          asignarHorarioService.eliminarHorario(angular.toJson(horario));
          swal("¡Listo!", "El horario se eliminó exitosamente" , "success");
          ctrl.listarHorarios();
      }
    });
  }


  ctrl.listarHorarios = function () {
    asignarHorarioService.listarHorarios().then(function (horariosListaData) {
      ctrl.horariosLista = horariosListaData;
    });
  }
  


  ctrl.init = function(){
    ctrl.listarHorarios();
    ctrl.nombre = $stateParams.nombreCurso;
    ctrl.codigo = $stateParams.codigoCurso;
  };



  ctrl.init();
}]);
