//Obtener variables de ambiente

var ambiente = {};

//Importar las variables si estas estan definidas

if (window) {
  Object.assign(ambiente, window.__env);
}

var vHackersModule = angular.module('vHackersModule', ['ui.bootstrap', 'ngTable','ui.router','ui.router.stateHelper', 'localytics.directives']);

//Regitrar las variables de ambiente
vHackersModule.constant('variablesAmbiente', ambiente);
//Se ejecuta antes de que corra la aplicacion
vHackersModule.config(['$urlRouterProvider', 'stateHelperProvider',
function ($urlRouterProvider,stateHelperProvider) {
  $urlRouterProvider.otherwise("inicio/principal");
  stateHelperProvider
  .state({
      name: 'inicio',
      abstract: true,
      url: '/inicio',
      templateUrl: 'index.html',
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
          templateUrl: 'index.html',
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
          templateUrl: 'index.html',
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
              name: 'crear-especialidad',
              url: '/crear-especialidad',
              templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-especialidades/vistaCrearEspecialidad.html'
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
              url: '/creacion-cursos',
              templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/creacionCursos.html'
            },
            {
              name: 'gestion-horarios',
              url: '/gestion-horarios',
              templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/Gestion-Horarios/gestionHorarios.html'
            },
            {
              name: 'modificacion-cursos',
              url: '/modificacion-cursos/:id/:especialidadId/:codigo/:nombre/:fechaCreacion/:facultadId/:creditos',
              templateUrl: 'SPA/Prototipo-Prometeo/Administrador/Gestion-CursosHorarios/modificacionCursos.html'
            }
          ]
        },
        //VISTAS DEL PROFESOR
        {
          name: 'profesor',
          url: '/profesor',
          templateUrl: 'index.html',
          children:[
            {
              name: 'inicioProfes',
              url: '/inicioProfes',
              templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaPrincipalProfesor.html'
            },
            {
              name: 'calificacion',
              url: '/calificacion',
              templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/calificacionEntregable.html'
            },
            {
              name: 'curso',
              url: '/curso',
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
              name: 'evaluacion-herramienta-modificar',
              url: '/evaluacion-herramienta-modificar/:nombre/:id/:fechaEntrega/:fechaHabilitacion/:descripcion',
              templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaModificarEntregable.html'
            },
            {
              name: 'evaluacion-herramienta-listar',
              url: '/evaluacion-herramienta-listar',
              templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaListarEntregables.html'
            }
          ]
        },
        //VISTAS DEL ALUMNO
        {
          name: 'alumno',
          url: '/alumno',
          templateUrl: 'index.html',
          children:[
            {
              name: 'inicioAlumnos',
              url: '/inicioAlumnos',
              templateUrl: 'SPA/Prototipo-Prometeo/Alumno/vistaPrincipalAlumno.html'
            },
            {
              name: 'cargar-archivos',
              url: '/cargar-archivos',
              templateUrl: 'SPA/Prototipo-Prometeo/Alumno/Gestion-Entregable/vistaCargarArchivos.html'
            }
          ]
        },
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
