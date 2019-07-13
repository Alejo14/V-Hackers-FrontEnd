angular.module('vHackersModule').controller('avancesEntregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams', '$cookies',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams, $cookies){
  var ctrl = this;
  ctrl.titulo = "";
  ctrl.subtitulo = "Avances "
  ctrl.entregable = {};
  ctrl.avanceSeleccionado = {};
  ctrl.avancesLista = [];
  ctrl.horarioId = "";
  ctrl.esIndividual = false;
  ctrl.esGrupal = false;

  ctrl.confirmarCalificacion = function () {
    swal({
      title: "¿Estás seguro de que quieres confirmar las calificaciones?",
      text: "",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, confirmar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta === "Confirm") {
        var data = {
          "avance" : ctrl.avanceEntregableIdCorreo
        };
        console.log(data);
        entregableService.enviarCorreo(data).then(function(respuesta) {
          swal('Éxito', 'Calificaciones confirmadas y publicadas', 'success');
        });
      }
    });
  }

  ctrl.obtenerAlumnos = function (horarioId) {
    entregableService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.avancesLista = alumnosListaData;
      console.log(alumnosListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
      ctrl.obtenerAvanceParaCorreo(ctrl.avancesLista[0]);
    });
  };

  ctrl.obtenerGrupos = function (horarioId) {
    entregableService.obtenerGrupos(horarioId).then(function (gruposListaData) {
      ctrl.avancesLista = gruposListaData;
      console.log(gruposListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
      ctrl.obtenerAvanceParaCorreo(ctrl.avancesLista[0]);
    });
  };

  ctrl.obtenerAvanceParaCorreo = function (avance) {
    if(ctrl.esIndividual){
      idRolUsuario=avance.idRolUsuario;
      idGrupo="0";
    }else{
      idRolUsuario="0";
      idGrupo=avance.id;
    }
    idEntregable=ctrl.entregable.id;
    entregableService.obtenerAvance(idEntregable, idRolUsuario, idGrupo).then(function (avanceData) {
      ctrl.avanceSeleccionado = avanceData;
      ctrl.avanceEntregableIdCorreo =  ctrl.avanceSeleccionado.id;
    });
  };

  ctrl.obtenerAvance = function (avance) {
    if(ctrl.esIndividual){
      idRolUsuario=avance.idRolUsuario;
      idGrupo="0";
    }else{
      idRolUsuario="0";
      idGrupo=avance.id;
    }
    idEntregable=ctrl.entregable.id;
    entregableService.obtenerAvance(idEntregable, idRolUsuario, idGrupo).then(function (avanceData) {
      ctrl.avanceSeleccionado = avanceData;
      $state.go('calificacion', {avanceEntregableId: ctrl.avanceSeleccionado.id, herramientaCalificada: 0});
    });
  };

  ctrl.irCalificacion = function (avance) {
    ctrl.obtenerAvance(avance);
  };

  ctrl.irArchivos = function(avance){
    if(ctrl.esIndividual){
      idRolUsuario=avance.idRolUsuario;
      idGrupo="0";
    }else{
      idRolUsuario="0";
      idGrupo=avance.id;
    }
    idEntregable=ctrl.entregable.id;
    $state.go('calificar-archivos', {idEntregable: idEntregable, idRolUsuario: idRolUsuario, idGrupo: idGrupo});
  };

  ctrl.regresar = function(){
    swal({
      title: "¿Estás seguro de que quieres volver?",
      text: "",
      icon: "warning",
      buttons: {
        Cancel: {
          text: "Cancelar",
          className: "btn btn-lg btn-danger"
        },
        Confirm: {
          text: "Sí, confirmar",
          className: "btn btn-lg color-fondo-azul-pucp color-blanco"
        }
      }
    }).then(function (respuesta) {
      if (respuesta) {
        $state.go('curso', {cursoCicloId: $stateParams.cursoCicloId});
      }
    });
  }

  ctrl.init = function (){
    ctrl.entregable.id = $stateParams.id;
    ctrl.entregable.nombre = $stateParams.nombre;
    ctrl.entregable.metodo = $stateParams.metodo;
    ctrl.horarioId = $stateParams.horarioId;
    ctrl.titulo = ctrl.entregable.nombre;

    ctrl.idUsuario = $cookies.get('usuarioID');
    ctrl.rolId = $cookies.get('rolActivoId');
    entregableService.obtenerRol(ctrl.rolId).then(function (rol) {
      ctrl.usuarioRol = rol.descripcion;
    });
    if (ctrl.entregable.metodo == 0){ //Entregable individual
      ctrl.subtitulo = ctrl.subtitulo + "individuales";
      ctrl.obtenerAlumnos(ctrl.horarioId);
      ctrl.esIndividual = true;
    } else { //Entregable grupal
      ctrl.subtitulo = ctrl.subtitulo + "grupales";
      ctrl.obtenerGrupos(ctrl.horarioId);
      ctrl.esGrupal = true;
    }
    console.log(ctrl.avancesLista);
  }
  ctrl.init();
}]);
