angular.module('vHackersModule').controller('alumnoMisCursosCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'alumnoMisCursosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, alumnoMisCursosService, NgTableParams){
  var ctrl = this;

  ctrl.filas=[1,2,3,4];
  ctrl.dias=['L','M','Mi','J','V','S'];
  ctrl.columnas=[1,2,3,4,5,6];
  ctrl.entregableM=[];
  $scope.fechaActual=new Date();
  ctrl.id=0;

  ctrl.misCursosInfo = {
    "cicloId" : "85271594-c48c-4d69-b785-c365277c91e6",
    "rolUsuarioId" : "a9637db6-f44c-4f24-907b-5e61b649431d"
  };

  ctrl.misCursosLista = [];
  ctrl.cargarMisCursos = function () {
    alumnoMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
      ctrl.misCursosLista = misCursosListaData;
      ctrl.tablaMisCursos = new NgTableParams({}, {dataset: ctrl.misCursosLista});
    });
  };

  ctrl.verCurso = function (curso){
    $state.go('alumnoCurso', {cursoCicloId: curso.cursoCicloId, nombreCurso: curso.nombreCurso, codigoCurso: curso.codigoCurso,
      creditos: curso.creditos, cantidadAlumnos: curso.cantidadAlumnos, horario: curso.horario});
  }

  ctrl.regresarAlumno = function (){
    $state.go('inicioAlumnos');
  }

  ctrl.init = function () {
    ctrl.cargarMisCursos();
  }

  ctrl.init();
}]);
