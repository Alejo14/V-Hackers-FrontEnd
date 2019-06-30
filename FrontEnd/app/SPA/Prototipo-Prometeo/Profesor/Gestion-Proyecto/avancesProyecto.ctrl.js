angular.module('vHackersModule').controller('avancesEntregableCtrl', ['$scope', '$state', '$stateParams' , 'entregableService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, entregableService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.titulo = "";
  ctrl.subtitulo = "Avances "
  ctrl.entregable = {};
  ctrl.avanceSeleccionado = {};
  ctrl.avancesLista = [];
  ctrl.horarioId = "";
  ctrl.esIndividual = false;
  ctrl.esGrupal = false;

  ctrl.obtenerAlumnos = function (horarioId) {
    entregableService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.avancesLista = alumnosListaData;
      console.log(alumnosListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
    });
  };

  ctrl.obtenerGrupos = function (horarioId) {
    entregableService.obtenerGrupos(horarioId).then(function (gruposListaData) {
      ctrl.avancesLista = gruposListaData;
      console.log(gruposListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
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
    console.log("idRolUsuario: " + idRolUsuario);
    console.log("idGrupo: " + idGrupo);
    console.log("idEntregable: " + idEntregable);
    entregableService.obtenerAvance(idEntregable, idRolUsuario, idGrupo).then(function (avanceData) {
      ctrl.avanceSeleccionado = avanceData;
      $state.go('calificacion', {avanceEntregableId: ctrl.avanceSeleccionado.id, herramientaCalificada: 0});
    });
    console.log(ctrl.avanceSeleccionado);
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

  ctrl.init = function (){
    ctrl.entregable.id = $stateParams.id;
    ctrl.entregable.nombre = $stateParams.nombre;
    ctrl.entregable.metodo = $stateParams.metodo;
    ctrl.horarioId = $stateParams.horarioId;

    ctrl.titulo = ctrl.entregable.nombre;
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
