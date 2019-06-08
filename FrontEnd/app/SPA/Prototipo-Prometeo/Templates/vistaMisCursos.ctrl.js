angular.module('vHackersModule').controller('misCursosCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaMisCursosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, vistaMisCursosService, NgTableParams){
  var ctrl = this;

  ctrl.listaMisCursos = [];
//a23b0031-64f6-4ce0-8b03-5f577d16d06c	343a3ea8-a0c8-4a73-9f81-6df07737b673
  ctrl.misCursosInfo = {
    "cicloId" : "85271594-c48c-4d69-b785-c365277c91e6",
    "rolUsuarioId" : "a23b0031-64f6-4ce0-8b03-5f577d16d06c"
  };

  ctrl.misCursosInfoAlumno = {
    "cicloId" : "85271594-c48c-4d69-b785-c365277c91e6", //Falta agregar un cicloId por alumno
    "rolUsuarioId" : "cfb6b116-e7c9-43b6-9ad8-ff073bd954d7"
  };


  ctrl.cargarMisCursos = function () {
    if($stateParams.rolUsuario=='P'){
      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        console.log(misCursosListaData);
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }else {
      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfoAlumno).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }
  };

  ctrl.verCurso = function (miCurso){
    if($stateParams.rolUsuario=='P'){
      $state.go('curso', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso,
      creditos: miCurso.creditos, cantidadAlumnos: miCurso.cantidadAlumnos, horario: miCurso.horario, idHorario: miCurso.idHorario});
    }else {
      $state.go('alumnoCursos', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso, horario: miCurso.horario}); //Aca podemos enviar el RolUsuarioId tambien
    }
  }


  ctrl.vistaPrincipalProfesor = function (){
    $state.go('inicioProfes');
  }

  ctrl.init = function () {
    ctrl.cargarMisCursos();
  }

  ctrl.init();
}]);
