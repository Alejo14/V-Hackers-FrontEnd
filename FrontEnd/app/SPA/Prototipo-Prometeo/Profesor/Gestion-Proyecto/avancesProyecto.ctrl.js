angular.module('vHackersModule').controller('avancesProyectoCtrl', ['$scope', '$state', '$stateParams' , 'gestionProyectoService', '$uibModal', 'NgTableParams',
function($scope, $state,$stateParams, gestionProyectoService, $uibModal, NgTableParams){
  var ctrl = this;
  ctrl.titulo = "";
  ctrl.subtitulo = "Avances "
  ctrl.proyecto = {};
  ctrl.avanceSeleccionado = {};
  ctrl.avancesLista = [];
  ctrl.horarioId = "";
  ctrl.esIndividual = false;
  ctrl.esGrupal = false;

  ctrl.obtenerAlumnos = function (horarioId) {
    gestionProyectoService.obtenerAlumnos(horarioId).then(function (alumnosListaData) {
      ctrl.avancesLista = alumnosListaData;
      console.log(alumnosListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
    });
  };

  ctrl.obtenerGrupos = function (horarioId) {
    gestionProyectoService.obtenerGrupos(horarioId).then(function (gruposListaData) {
      ctrl.avancesLista = gruposListaData;
      console.log(gruposListaData);
      ctrl.avancesTabla = new NgTableParams({}, { dataset: ctrl.avancesLista });
    });
  };

  ctrl.obtenerAvance = function (avance) {
    var nombreCalificadoProyecto = '';
    if(ctrl.esIndividual){
      idRolUsuario=avance.idRolUsuario;
      nombreCalificadoProyecto = avance.nombreCompleto;
      idGrupo="0";
    }else{
      idRolUsuario="0";
      idGrupo=avance.id;
      nombreCalificadoProyecto = avance.nombre;
    }
    idProyecto=ctrl.proyecto.id;
    console.log("idRolUsuario: " + idRolUsuario);
    console.log("idGrupo: " + idGrupo);
    console.log("idProyecto: " + idProyecto);
    gestionProyectoService.mostrarAvanceProyecto(idProyecto, idRolUsuario, idGrupo).then(function (avanceData) {
      ctrl.avanceSeleccionado = avanceData;
      $state.go('calificacion-proyecto', {avanceProyectoId: ctrl.avanceSeleccionado.id, herramientaCalificada: 0, nombreProyecto: ctrl.proyecto.nombre, nombreCalificado: nombreCalificadoProyecto});
    });
  };

  ctrl.irCalificacion = function (avance) {
    ctrl.obtenerAvance(avance);
  };

  ctrl.init = function (){
    ctrl.proyecto.id = $stateParams.id;
    ctrl.proyecto.nombre = $stateParams.nombre;
    ctrl.proyecto.metodo = $stateParams.metodo;
    ctrl.horarioId = $stateParams.horarioId;

    ctrl.titulo = ctrl.proyecto.nombre;
    if (ctrl.proyecto.metodo == 0){ //Entregable individual
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
