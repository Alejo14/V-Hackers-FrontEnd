angular.module('vHackersModule').controller('misCursosCtrl', ['$scope', '$state', '$stateParams', '$uibModal', 'vistaMisCursosService', 'NgTableParams', '$cookies',
function($scope, $state, $stateParams, $uibModal, vistaMisCursosService, NgTableParams, $cookies){
  var ctrl = this;

  ctrl.listaMisCursos = [];
  ctrl.opcionesReporteCursos = {};
  ctrl.cursosReporte = [];
  ctrl.opcionesReporteCursos2 = {};
  ctrl.mensajeError = "No hay cursos disponibles";

  ctrl.cargarMisCursos = function (ciclo) {
    if(ctrl.rolUsuario=='P'){

      ctrl.misCursosInfo = {
        "cicloId" : ciclo,
        "rolUsuarioId" : ctrl.rolUsuarioId
      };
      console.log(ctrl.misCursosInfo);
      vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
        console.log(misCursosListaData);
      });
      ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
    } else if(ctrl.rolUsuario=='J'){

        ctrl.misCursosInfo = {
          "cicloId" : ciclo,
          "rolUsuarioId" : ctrl.rolUsuarioId
        };
        console.log(ctrl.misCursosInfo);
        vistaMisCursosService.listarMisCursos(ctrl.misCursosInfo).then(function (misCursosListaData) {
          ctrl.listaMisCursos = misCursosListaData;
          console.log(misCursosListaData);
        });
        ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});

    }else {

      ctrl.misCursosInfoAlumno = {
        "cicloId" : ciclo,
        "rolUsuarioId" : ctrl.rolUsuarioId
      };
      console.log("ALUMNO");
      console.log(ctrl.misCursosInfoAlumno);

      vistaMisCursosService.listarMisCursosAlumno(ctrl.misCursosInfoAlumno).then(function (misCursosListaData) {
        ctrl.listaMisCursos = misCursosListaData;
      });
      ctrl.tablaMisCursos = new NgTableParams({}, { dataset: ctrl.listaMisCursos});
    }
  };

  ctrl.verCurso = function (miCurso){
    if(ctrl.rolUsuario=='P'){
      $state.go('curso', {cursoCicloId: miCurso.cursoCicloId});
    }else if(ctrl.rolUsuario=='J'){
      $state.go('curso', {cursoCicloId: miCurso.cursoCicloId});
    }else {
      $state.go('alumnoCursos', {cursoCicloId: miCurso.cursoCicloId, nombreCurso: miCurso.nombreCurso, codigoCurso: miCurso.codigoCurso, horario: miCurso.horario, rolusuarioId: ctrl.rolUsuarioId}); //Aca podemos enviar el RolUsuarioId tambien
    }
  }


  ctrl.vistaPrincipalProfesor = function (){
    $state.go('inicioProfes');
  }

  ctrl.listarPromediosEntregablesCursoCiclo = function () {
    var usuario = {
      "idUsuario": $cookies.get('usuarioID'),
      "idRol": $cookies.get('rolActivoId')
    };
    vistaMisCursosService.listarPromediosEntregablesCursoCiclo(usuario).then(function (respuesta) {
      console.log(respuesta);
      var numCursos = respuesta.length;
      for (var i = 0; i < numCursos; i++) {
        var cursoReporteNuevo = {
          "name": respuesta[i].nombreCurso,
          "y": respuesta[i].promedio,
          "drilldown": respuesta[i].nombreCurso
        };
        ctrl.cursosReporte.push(cursoReporteNuevo);
      }
      ctrl.opcionesReporteCursos2 = {
        title: {
          text: 'Promedio de notas de cursos del ciclo actual'
        },

        xAxis: {
          type: 'category'
        },

        yAxis: {
          allowDecimals: true,
          title: {
              text: 'Promedio ponderado'
          }
        },
        options: {

        },
        lang: {
          drillUpText: 'Regresar',
          noData: 'No hay notas disponibles en el ciclo',
          viewFullscreen: 'Ver en pantalla completa',
          printChart: 'Imprimir',
          downloadPNG: 'Descargar PNG',
          downloadCSV: 'Descargar CSV',
          downloadJPEG: 'Descargar JPEG',
          downloadPDF: 'Descargar PDF',
          downloadSVG: 'Descargar SVG'
        },
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span>',
          pointFormat: '<b>Promedio ponderado: {point.y}</b> puntos<br/>'
        },
        plotOptions: {
          series: {
            events: {
              click: function (evento) {

              }
            },
            borderWidth: 0,
            dataLabels: {
              allowOverlap: true,
              color: '#ffffff',
              inside: true,
              enabled: true
            }
          }
        },
        chart: {
          type: 'column'
        },
        legend: {
          enabled: false
        },
        drilldown: {
          activeAxisLabelStyle: {
            textDecoration: 'none',
            color: '#333333'
          },
          activeDataLabelStyle: {
            textDecoration: 'none',
            color: '#333333'
          },
          drillUpButton: {
            relativeTo: 'plotBox',
            position: {
              align: 'left',
              verticalAlign: 'top',
              y: -10,
              x: 0
            }
          },
          series: []//Arreglo que debe ser mandado por el back
        },
        series: [
          {
            name: 'Cursos',
            colorByPoint: true,
            data: ctrl.cursosReporte
            // data: [
            //   {
            //     name: 'Ingeniería de Software',
            //     y: 15.6,
            //     drilldown: 'Ingeniería de Software'
            //   },
            //   {
            //     name: 'Aplicaciones de ciencias de la computación',
            //     y: 17.8,
            //     drilldown: 'Aplicaciones de ciencias de la computación'
            //   },
            //   {
            //     name: 'Programación de aplicativos móviles',
            //     y: 18.9,
            //     drilldown: 'Programación de aplicativos móviles'
            //   }
            // ]//Arreglo de BackEnd
          }
        ]
      };
    });
  }

  ctrl.init = function () {
    ctrl.idUsuario = $cookies.get('usuarioID');
    ctrl.rolUsuario = $stateParams.rolUsuario;

    ctrl.listarPromediosEntregablesCursoCiclo();
    var descripcionRol;
    if(ctrl.rolUsuario=='P'){
      descripcionRol = "Profesor";
    }else if(ctrl.rolUsuario=='J'){
      descripcionRol = "Asistente de Docencia";
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
