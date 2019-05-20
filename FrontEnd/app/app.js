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
        {
          name: 'ejemplos',
          abstract: true,
          url: '/ejemplos',
          templateUrl: 'index.html',
          children:[
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
        {
          name: 'calificacion',
          url: '/calificacion',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Evaluacion-Retroalimentacion/calificacionEntregable.html'
        },
        {
          name: 'profesor',
          url: '/profesor',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/vistaInicio.html'
        },
        {
          name: 'curso',
          url: '/curso',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Curso/vistaCurso.html'
        },
        {
          name:'gestion-proyecto',
          url: '/gestion-proyecto/:id/:nombre/:fechaCreacion/:fechaInicio/:fechaFin/:ponderacion',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Proyecto/vistaGestiónProyecto.html'
        },
        {
            name: 'evaluacion-herramienta',
            url: '/evaluacion-herramienta',
            templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaCrearEntregable.html'
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
          name: 'evaluacion-herramienta-modificar',
          url: '/evaluacion-herramienta-modificar/:nombre/:id/:fechaEntrega',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaModificarEntregable.html'
        },
        {
          name: 'evaluacion-herramienta-listar',
          url: '/evaluacion-herramienta-listar',
          templateUrl: 'SPA/Prototipo-Prometeo/Profesor/Gestion-Entregable/vistaListarEntregables.html'
        },
        {
          name: 'administrador',
          url: '/administrador',
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
