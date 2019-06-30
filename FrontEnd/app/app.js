//Obtener variables de ambiente

var ambiente = {};

//Importar las variables si estas estan definidas

if (window) {
  Object.assign(ambiente, window.__env);
}

//funcion empleada en login
function onLoadFunction() {
  gapi.client.setApiKey(ambiente.llaveApiLogin);
  gapi.client.load('plus', 'v1', function () {

  });
}

var vHackersModule = angular.module('vHackersModule', ['ui.bootstrap', 'ngTable','ui.router','ui.router.stateHelper', 'localytics.directives', 'ngCookies', 'highcharts-ng']);

//Regitrar las variables de ambiente
vHackersModule.constant('variablesAmbiente', ambiente);
//Se ejecuta antes de que corra la aplicacion
vHackersModule.config(['$urlRouterProvider', 'stateHelperProvider',
function ($urlRouterProvider,stateHelperProvider) {
  $urlRouterProvider.otherwise("inicio/login");
  stateHelperProvider
  .state({
      name: 'inicio',
      abstract: true,
      url: '/inicio',
      templateUrl: 'index.html',
      children:[
        {
          name: 'raiz',
          url: '/raiz',
          templateUrl: 'SPA/raiz.html',
          children:[
            {
              name: 'principal',
              url: '/principal',
              templateUrl: 'SPA/Prototipo-Prometeo/vistaPrincipal.html'
            },
            //VISTAS DE EJEMPLO
            {
              name: 'ejemplos',
              url: '/ejemplos',
              templateUrl: 'SPA/Prototipo-Prometeo/Ejemplos/ejemplos.html',
              children:[
                {
                  name: 'seleccionEjemplo',
                  url: '/seleccionEjemplo',
                  templateUrl: 'SPA/Prototipo-Prometeo/Ejemplos/vistaEjemplos.html'
                },
                {
                  name: 'listaAlumnos',
                  url: '/listaAlumnos',
                  templateUrl: 'SPA/Prototipo-Prometeo/Ejemplos/vistaListarAlumnos.html'
                },
                {
                  name: 'tabla',
                  url: '/tabla',
                  templateUrl: 'SPA/Prototipo-Prometeo/Ejemplos/vistaTabla.html'
                },
              ]
            },
            //VISTAS DEL ADMINISTRADOR
            {
              name: 'administrador',
              url: '/administrador',
              templateUrl: 'SPA/Prototipo-Prometeo/Administrador/administrador.html',
              children:[
                {
                  name: 'inicioAdmin',
                  url: '/inicioAdmin',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/vistaPrincipalAdministrador.html'
                },
                {
                  name: 'crear-semestre',
                  url: '/crear-semestre',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-semestres/vistaCrearSemestre.html'
                },
                {
                  name: 'listar-semestres',
                  url: '/listar-semestres',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-semestres/vistaListarSemestres.html'
                },
                {
                  name: 'crear-especialidad',
                  url: '/crear-especialidad',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/vistaCrearEspecialidad.html'
                },
                {
                  name: 'modificar-especialidad',
                  url: '/modificar-especialidad/:codigo/:id/:nombre/:facultadId/:responsableId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/vistaModificarEspecialidad.html'
                },
                {
                  name: 'listar-especialidades',
                  url: '/listar-especialidades',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/vistaListarEspecialidades.html'
                },
                {
                  name: 'gestion-usuarios',
                  url: '/gestion-usuarios',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-Usuarios/gestionUsuarios.html'
                },
                {
                  name: 'creacion-cursos',
                  url: '/creacion-cursos/:id/:especialidadId/:codigo/:nombre/:fechaCreacion/:facultadId/:creditos',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/creacionCursos.html'
                },
                {
                  name: 'gestion-horarios',
                  url: '/gestion-horarios',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/Gestion-Horarios/gestionHorarios.html'
                },
                {
                  name: 'asignar-horarios',
                  url: '/asignar-horarios/:idCursoCiclo/:idCurso/:idSemestre/:nombreCurso/:codigoCurso',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/Gestion-Horarios/asignarHorario.html'
                },
                {
                  name: 'creacion-facultad',
                  url: '/creacion-facultad',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-Facultad/creacionFacultad.html'
                },
                {
                  name: 'asignar-asistentes',
                  url: '/asignar-asistentes/:idHorario/:nombre/:horario',
                  templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/Gestion-Horarios/asignarAsistentes.html'
                }
              ]
            },
            //VISTAS DEL PROFESOR
            {
              name: 'profesor',
              url: '/profesor',
              templateUrl: 'SPA/Prototipo-Prometeo/Profesor/profesor.html',
              children:[
                // {
                //   name: 'inicioProfes',
                //   url: '/profesorMisCursos/:rolUsuario',
                //   templateUrl: 'SPA/Prototipo-Prometeo/Templates/VistaMisCursos.html'
                // },
                {
                  name: 'profesorMisCursos',
                  url: '/profesorMisCursos/:rolUsuario',
                  templateUrl: 'SPA/Prototipo-Prometeo/Templates/VistaMisCursos.html'
                },
                {
                  name: 'calificacion',
                  url: '/calificacion/:avanceEntregableId/:herramientaCalificada',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/calificacionEntregable.html'
                },
                {
                  name: 'calificacionAspectos',
                  url: '/calificacionAspectos/:avanceEntregableId/:calificacionHerramientaEvaluacionId/:herramientaEvaluacionId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/Evaluacion-Aspecto/calificacionAspectos.html'
                },
                {
                  name: 'calificacionHerramienta',
                  url: '/calificacion/:avanceEntregableId/:herramientaCalificada/:calificacionHerramientaEvaluacionId/:puntajeHerramienta',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/calificacionEntregable.html'
                },
                {
                  name: 'curso',
                  url: '/curso/:cursoCicloId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Curso/vistaCurso.html'
                },
                {
                  name:'gestion-proyecto',
                  url: '/gestion-proyecto/:id/:nombre/:fechaCreacion/:fechaInicio/:fechaFin/:ponderacion/:descripcion/:visible/:registroHoras/:metodoTrabajo/:cursoCiclo_id',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Proyecto/vistaGestiónProyecto.html'
                },
                {
                  name: 'evaluacion-herramienta',
                  url: '/evaluacion-herramienta',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaCrearEntregable.html'
                },
                {
                  name: 'evaluacion-herramienta-gestionar',
                  url: '/evaluacion-herramienta-gestionar/:id/:cursoCicloId/:proyectoId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaGestiónEntregable.html'
                },
                {
                  name: 'evaluacion-herramienta-listar',
                  url: '/evaluacion-herramienta-listar/:cursoId/:proyectoId/:horarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaListarEntregables.html'
                },
                {
                  name: 'reutilizar-herramienta',
                  url: '/:id/reulizar-herramienta',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Reutilizar/vistaReutilizarHerramienta.html'
                },
                {
                  name: 'nueva-herramienta',
                  url: '/:id/nueva-herramienta/:cursoCicloId/:proyectoId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/herramientaEvaluacion.html'
                },
                {
                  name: 'nueva-rubrica',
                  url: '/nueva-rubrica/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/nuevaRubrica.html'
                },
                {
                  name: 'editar-rubrica',
                  url: '/editar-rubrica/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/nuevaRubrica.html'
                },
                {
                  name: 'nuevo-aspecto',
                  url: '/nuevo-aspecto/:id/:entregableId/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Aspecto/nuevoAspecto.html'
                },
                {
                  name: 'editar-aspecto',
                  url: '/editar-aspecto/:id/:entregableId/:cursoCicloId/:proyectoId/:estado/:idAspecto',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Rubrica/Aspecto/nuevoAspecto.html'
                },
                {
                  name: 'listar-alumnos',
                  url: '/listar-alumnos/:cursoNombre/:horarioNombre/:horarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Alumnos-Curso/listarAlumnosCurso.html'
                },
                {
                  name: 'grupos',
                  url: '/grupos/:cursoNombre/:horarioNombre/:horarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Alumnos-Curso/Grupos/vistaGrupos.html'
                },
                {
                  name: 'actualizarGrupo',
                  url: '/actualizarGrupo/:cursoNombre/:horarioId/:horarioNombre/:grupoId/:grupoNombre',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Alumnos-Curso/Grupos/vistaActualizarGrupo.html'
                },
                {
                  name: 'nueva-escala',
                  url: '/nueva-escala/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Escala/nuevaEscala.html'
                },
                {
                  name: 'editar-escala',
                  url: '/editar-escala/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/Escala/nuevaEscala.html'
                },
                {
                  name: 'nueva-lista-cotejo',
                  url: '/nueva-lista-cotejo/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/ListaCotejo/nuevaListaCotejo.html'
                },
                {
                  name: 'editar-lista-cotejo',
                  url: '/editar-lista-cotejo/:id/:entregableId/:nivelesCreados/:cursoCicloId/:proyectoId/:estado',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Herramienta-Evaluacion/ListaCotejo/nuevaListaCotejo.html'
                },
                {
                  name: 'avances-entregable',
                  url: '/avances-entregable/:id/:nombre/:metodo/:horarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/avancesEntregable.html'
                },
                {
                  name: 'avances-proyecto',
                  url: '/avances-proyecto/:id/:nombre/:metodo/:horarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Proyecto/avancesProyecto.html'
                },
                {
                  name: 'calificar-archivos',
                  url: '/calificar-archivos/:idEntregable/:idRolUsuario/:idGrupo',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/Evaluacion-Archivos/calificacionArchivos.html'
                },
                {
                  name: 'calificacionEscala',
                  url: '/calificacionEscala/:avanceEntregableId/:calificacionHerramientaEvaluacionId/:herramientaEvaluacionId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/Evaluacion-Escala/calificacionEscala.html'
                },
                {
                  name: 'calificacionListaCotejo',
                  url: '/calificacionListaCotejo/:avanceEntregableId/:calificacionHerramientaEvaluacionId/:herramientaEvaluacionId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/Evaluacion-Lista/calificacionListaCotejo.html'
                }
              ]
            },
            //VISTAS DEL ALUMNO
            {
              name: 'alumno',
              url: '/alumno',
              templateUrl: 'SPA/Prototipo-Prometeo/Alumno/alumno.html',
              children:[
                // {
                //   name: 'inicioAlumnos',
                //   url: '/alumnoMisCursos/:rolUsuario',
                //   templateUrl: 'SPA/Prototipo-Prometeo/Templates/VistaMisCursos.html'
                // },
                {
                  name: 'alumnoCurso',
                  url: '/curso/:cursoCicloId/:nombreCurso/:codigoCurso/:creditos/:cantidadAlumnos/:horario',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Curso/vistaCurso.html'
                },
                {
                  name: 'alumnoMisCursos',
                  url: '/alumnoMisCursos/:rolUsuario',
                  templateUrl: 'SPA/Prototipo-Prometeo/Templates/VistaMisCursos.html'
                },
                {
                  name: 'alumnoCursos',
                  url: '/alumnoCursos/:cursoCicloId/:nombreCurso/:codigoCurso/:horario/:rolusuarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Curso/vistaCurso.html'
                },
                {
                  name:'gestion-proyecto-alumno',
                  url: '/gestion-proyecto-alumno/:id/:nombre/:fechaCreacion/:fechaInicio/:fechaFin/:ponderacion/:descripcion/:visible/:registroHoras/:metodoTrabajo/:cursoCiclo_id',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Proyecto/vistaGestiónProyecto.html'
                },
                {
                  name: 'listar-entregables-alumno',
                  url: '/listar-entregables-alumno/:proyectoId/:proyectoNombre/:rolusuarioId',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Entregable/vistaListarEntregables.html'
                },
                {
                  name: 'detalle-entregable',
                  url: '/detalle-entregable/:nombre/:id/:fechaEntrega/:fechaHabilitacion/:descripcion/:ponderacion/:cursoCicloId/:proyectoId/:nombreCurso/:codigoCurso/:horario/:idRolUsuario/:estadoEntregable',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Entregable/detalleEntregable.html'
                },
                {
                  name: 'detalle-herramientas',
                  url: '/detalle-herramientas/:id',
                  templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Entregable/vistaGestiónHerramientas.html'
                },
              ]
            }
          ]
        },
        //LOGIN
        {
          name: 'login',
          url: '/login',
          templateUrl: 'SPA/google-API/login.html'
        }
      ]
    }, { keepOriginalNames: true });
}]);

// vHackersModule.config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//     .when('/inicio', {
//       templateUrl: 'SPA/Prototipo-Prometeo/vistaPrincipal.html'
//     })
//     .when('/listaAlumnos', {
//       templateUrl: 'SPA/Prototipo-Prometeo/vistaListarAlumnos.html'
//     })
//     .when('/tabla' , {
//       templateUrl: 'SPA/Prototipo-Prometeo/vistaTabla.html'
//     })
//     .when('/gestion-usuarios' , {
//       templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-usuarios/gestionUsuarios.html'
//     })
//     .when('/calificacion', {
//       templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/calificacionEntregable.html'
//     })
//       .when('/Profesor' , {
//         templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaInicio.html'
//       })
//       .when('/Profesor/Curso' , {
//         templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaCurso.html'
//       })
//       .when('/Profesor/GestionProyecto' , {
//         templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaGestiónProyecto.html'
//       })
//       .when('/entregable' , {
//           templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaCrearEntregable.html'
//     })
//     .when('/Profesor' , {
//       templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaInicio.html'
//     })
//     .when('/Profesor/Curso' , {
//       templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaCurso.html'
//     })
//     .when('/Profesor/GestionProyecto' , {
//       templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaGestiónProyecto.html'
//     })
//     .when('/entregable' , {
//         templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaCrearEntregable.html'
//     })
//     .otherwise({
//       redirectTo: '/inicio'
//     })
// }]);
//Se ejecuta mientras corre la aplicacion
// vHackersModule.run(function () {
//
// });
// vHackersModule.controller('HackersCtrl', ['$scope', '$http', function($scope, $http){
//   var ctrl = this;
//   ctrl.mensaje = "Hola Mundo";
//   ctrl.amigos = [];
//   ctrl.mensajeNuevo = "Go V-Hackers";
//   ctrl.probar = function () {
//     $http({
//         method: 'GET',
//         url: 'data/Hackers.json'
//      }).then(function (response) {
//       ctrl.amigos = response.data;
//     }, function (error) {
//
//     });
//   };
// }]);
