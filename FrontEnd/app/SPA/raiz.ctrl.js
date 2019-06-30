angular.module('vHackersModule').controller('raizCtrl', ['$scope', '$state' , '$stateParams', '$uibModal', '$cookies', 'raizService',

function($scope, $state, $stateParams, $uibModa, $cookies, raizService){
  var ctrl = this;

  ctrl.idUsuario = $cookies.get('usuarioID');
  ctrl.logOut = function () {
    var token = gapi.auth.getToken();
    if (token) {
      var accessToken = gapi.auth.getToken().access_token;
      if (accessToken) {
        raizService.logOut(accessToken).then(function (respuesta) {
          gapi.auth.setToken(null);
          gapi.auth.signOut();
          $state.go('login');
        });
      }
      else {
        $state.go('login');
      }
    }
    else {
      $state.go('login');
    }

  };
  ctrl.init = function () {
    if (!ctrl.usuario) {
      raizService.obtenerUsuarioLogin(ctrl.idUsuario).then(function (usuario){
        ctrl.usuario = usuario;
        var inicioSesion = $cookies.get('inicioSesion');
        if (inicioSesion && inicioSesion !== 'false') {
          $cookies.put('inicioSesion', false);
          var descripcionRol = ctrl.usuario.roles[0].descripcion;
          var state = '';
          var rolUsuario = '';
          switch (descripcionRol) {
            case 'Administrador':
              state = 'inicioAdmin';
              break;
            case 'Alumno':
              state = 'alumnoMisCursos';
              rolUsuario = 'A';
              break;
            case 'Profesor':
              state = 'profesorMisCursos';
              rolUsuario = 'P';
              break;
            case 'Asistente de Docencia':
              state = 'profesorMisCursos';
              rolUsuario = 'P';
              break;
            default:
              state = 'principal';
          }
          if (rolUsuario == '') {
            $state.go(state);
          } else {
            $state.go(state,{rolUsuario: rolUsuario});
          }

        }
      });
    }
  };

  ctrl.init();
}]);
