angular.module('vHackersModule').controller('misCursosCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaMisCursosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, vistaMisCursosService, NgTableParams){
  var ctrl = this;
  ctrl.listaMisCursosHC = [
    { "cursoCicloId": "1241241251252151",
      "nombreCurso": "Ingeniería de Software",
      "codigoCurso": "INF245",
      "creditos": 4.5,
      "cantidadAlumnos": 40,
      "horario": "H801"
    },
    { "cursoCicloId": "1241241251252151",
      "nombreCurso": "Redes de Computación",
      "codigoCurso": "INF288",
      "creditos": 4,
      "cantidadAlumnos": 45,
      "horario": "H501"
    }
  ];

  ctrl.listaMisCursos = [];

  ctrl.misCursosInfo = {
    "cicloId" : "85271594-c48c-4d69-b785-c365277c91e6",
    "rolUsuarioId" : "a9637db6-f44c-4f24-907b-5e61b649431d"
  };

  ctrl.cargarMisCursos = function () {
    vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
      ctrl.listaMisCursos = misCursosListaData;
      ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
    });
  };

  ctrl.verCurso = function (miCurso){
    $state.go('curso', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso,
      creditos: miCurso.creditos, cantidadAlumnos: miCurso.cantidadAlumnos, horario: miCurso.horario});
  }

  ctrl.vistaPrincipalProfesor = function (){
    $state.go('inicioProfes');
  }

  ctrl.init = function () {
    ctrl.cargarMisCursos();
  }

  ctrl.init();
}]);
