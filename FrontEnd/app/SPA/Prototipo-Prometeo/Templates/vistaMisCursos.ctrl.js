angular.module('vHackersModule').controller('misCursosCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaMisCursosService', 'NgTableParams',
function($scope, $state, $stateParams, $uibModal, vistaMisCursosService, NgTableParams){
  var ctrl = this;

  ctrl.listaMisCursos = [];
  ctrl.opcionesReporteCursos = {};


  ctrl.cargarMisCursos = function (ciclo) {
    if($stateParams.rolUsuario=='P'){

      ctrl.misCursosInfo = {
        "cicloId" : ciclo,
        "rolUsuarioId" : "a23b0031-64f6-4ce0-8b03-5f577d16d06c"
      };

      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        console.log(misCursosListaData);
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }else {

      ctrl.misCursosInfoAlumno = {
        "cicloId" : ciclo,
        "rolUsuarioId" : "505b1b8c-aed2-49c8-9724-3879469afb02"
      };

      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfoAlumno).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }
  };

  ctrl.verCurso = function (miCurso){
    if($stateParams.rolUsuario=='P'){
      $state.go('curso', {cursoCicloId: miCurso.cursoCicloId});
    }else {
      $state.go('alumnoCursos', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso, horario: miCurso.horario, rolusuarioId: ctrl.rolUsuarioId}); //Aca podemos enviar el RolUsuarioId tambien
    }
  }


  ctrl.vistaPrincipalProfesor = function (){
    $state.go('inicioProfes');
  }

  ctrl.init = function () {
    ctrl.rolUsuarioId="505b1b8c-aed2-49c8-9724-3879469afb02";
    vistaMisCursosService.cicloActual().then(function(ciclo){
      ctrl.cicloActual=ciclo;
      ctrl.cargarMisCursos(ctrl.cicloActual);
    });


    ctrl.opcionesReporteCursos = {
      title: {
        text: 'Historial de promedio de notas en el año'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },

      yAxis: {
        allowDecimals: true,
        title: {
            text: 'Promedio ponderado'
        }
      },
      series: [{
        name: 'promedio ponderado por mes',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    };
  }

  ctrl.init();
}]);
