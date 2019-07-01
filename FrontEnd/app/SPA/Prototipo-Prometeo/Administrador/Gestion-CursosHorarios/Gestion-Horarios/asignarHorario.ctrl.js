angular.module('vHackersModule').controller('asignarHorarioCtrl', ['$scope','$state','$stateParams' ,'asignarHorarioService', '$uibModal','NgTableParams',
function($scope,$state,$stateParams,asignarHorarioService, $uibModal,NgTableParams){
  var ctrl = this;
  ctrl.cursoCiclo = {};
  ctrl.codigo = "Código";
  ctrl.nombre = "Nombre Curso";
  ctrl.idCursoCiclo = "";
  ctrl.idCursoCicloJSON = {"id":""};
  ctrl.idCurso = "";
  ctrl.idCiclo = "";
  ctrl.idHorario = "";
  ctrl.horariosLista = [];


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

  ctrl.agregarHorario = function (modo,index) {
    //En este caso el controlador del modal se debe declarar en el JSON que pasa como parametro de open
    //console.log(modo);
    if(index == -1){
      ctrl.idHorario = "";
    }else{
      ctrl.idHorario = ctrl.horariosLista[index].id;
    }
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
        },
        idCursoCiclo: function(){
          return ctrl.idCursoCiclo;
        },
        idCurso: function(){
          return ctrl.idCurso;
        },
        idCiclo: function(){
          return ctrl.idCiclo;
        },
        idHorario: function(){
          return ctrl.idHorario;
        }
      }
    });
    modalInstance.result.then( function (parametroRetorno) {
        ctrl.listarHorarios(ctrl.idCursoCiclo);
        console.log("Se debe actualizar la pantalla");
    });
  };

  ctrl.editarHorario = function(horario,index) {
    ctrl.agregarHorario(horario,index);//con parámetros para editarlos
  }

  ctrl.eliminarHorario = function (horario,indice) {
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
          ctrl.horariosLista.splice(indice,1);
          swal("¡Listo!", "El horario se eliminó exitosamente" , "success");
      }
    });
  }


  ctrl.listarHorarios = function (idcc) {
    asignarHorarioService.listarHorarios(idcc).then(function (horariosListaData) {
      ctrl.horariosLista = horariosListaData;
    });
  }

  ctrl.editarAsistentes= function(horario){
    $state.go('asignar-asistentes',{idHorario:horario.id,nombre:ctrl.nombre,horario:horario.codigo,codigoCurso:ctrl.codigo,idCurso:ctrl.idCurso,idCursoCiclo:ctrl.idCursoCiclo,idSemestre:ctrl.idCiclo});
  }



  ctrl.init = function(){
    ctrl.listarHorarios($stateParams.idCursoCiclo);
    ctrl.nombre = $stateParams.nombreCurso;
    ctrl.codigo = $stateParams.codigoCurso;
    ctrl.idCursoCiclo = $stateParams.idCursoCiclo;
    ctrl.idCurso = $stateParams.idCurso;
    ctrl.idCiclo = $stateParams.idSemestre;
    ctrl.idCursoCicloJSON.id = $stateParams.idCursoCiclo;
  };



  ctrl.init();
}]);
