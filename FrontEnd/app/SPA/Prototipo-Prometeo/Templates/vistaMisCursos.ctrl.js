angular.module('vHackersModule').controller('misCursosCtrl', ['$scope', '$state', '$stateParams', '$cookies', '$uibModal', 'vistaMisCursosService', 'NgTableParams',
function($scope, $state, $stateParams, $cookies, $uibModal, vistaMisCursosService, NgTableParams){
  var ctrl = this;

  ctrl.listaMisCursos = [];
  ctrl.opcionesReporteCursos = {};


  ctrl.cargarMisCursos = function (ciclo) {
    if(ctrl.rolUsuario=='P'){

      ctrl.misCursosInfo = {
        "cicloId" : ciclo,
        "rolUsuarioId" : ctrl.rolUsuarioId
      };

      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        console.log(misCursosListaData);
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }else {

      ctrl.misCursosInfoAlumno = {
        "cicloId" : ciclo,
        "rolUsuarioId" : ctrl.rolUsuarioId
      };

      console.log(ctrl.misCursosInfoAlumno);

      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfoAlumno).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
      });
    }
  };

  ctrl.verCurso = function (miCurso){
    if(ctrl.rolUsuario=='P'){
      $state.go('curso', {cursoCicloId: miCurso.cursoCicloId});
    }else {
      $state.go('alumnoCursos', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso, horario: miCurso.horario, rolusuarioId: ctrl.rolUsuarioId}); //Aca podemos enviar el RolUsuarioId tambien
    }
  }


  ctrl.vistaPrincipalProfesor = function (){
    $state.go('inicioProfes');
  }

  ctrl.init = function () {
    ctrl.idUsuario = $cookies.get('usuarioID');
    ctrl.rolUsuario = $stateParams.rolUsuario;

    var descripcionRol;
    if(ctrl.rolUsuario=='P'){
      descripcionRol = "Profesor";
    }else {
      descripcionRol = "Alumno";
    }

    vistaMisCursosService.obtenerRolUsuario(ctrl.idUsuario, descripcionRol).then(function(rolUsuario){
      ctrl.rolUsuarioId=rolUsuario;
      vistaMisCursosService.cicloActual().then(function(ciclo){
        ctrl.cicloActual=ciclo;
        ctrl.cargarMisCursos(ctrl.cicloActual);
      });
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
